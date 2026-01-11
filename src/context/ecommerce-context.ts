import { TypedEventTarget } from "@remix-run/interaction";
import { fetchProducts } from "../api/fake-products-api";
import {
	EcommerceEvent,
	type EcommerceEventMap,
} from "../events/ecommerce-event-map";
import type { CartItem, Product } from "../types/types";

export class EcommerceContext extends TypedEventTarget<EcommerceEventMap> {
	#products: Product[] = [];
	#isLoadingProducts = false;
	#productsError: Error | null = null;

	#cart: CartItem[] = [];
	#selectedProduct: Product | null = null;

	#wishlist: Set<string> = new Set();

	get products() {
		return this.#products;
	}

	get cart() {
		return this.#cart;
	}

	get selectedProduct() {
		return this.#selectedProduct;
	}

	get cartTotal() {
		return this.#cart.reduce(
			(sum, item) => sum + item.product.price * item.quantity,
			0,
		);
	}

	get cartItemCount() {
		return this.#cart.reduce((sum, item) => sum + item.quantity, 0);
	}

	get isLoadingProducts() {
		return this.#isLoadingProducts;
	}

	get productsError() {
		return this.#productsError;
	}

	get wishlist() {
		return this.#products.filter((p) => this.#wishlist.has(p.id));
	}

	get wishlistIds() {
		return Array.from(this.#wishlist);
	}

	public async loadProducts(signal?: AbortSignal) {
		if (this.#isLoadingProducts) return;

		this.#isLoadingProducts = true;
		this.#productsError = null;
		this.dispatchEvent(new EcommerceEvent("products.loading"));

		try {
			const products = await fetchProducts(1500, signal);

			if (signal?.aborted) return;

			this.#products = products;
			this.#isLoadingProducts = false;
			this.dispatchEvent(new EcommerceEvent("products.loaded"));
		} catch (error) {
			if (error instanceof Error && error.message === "Request aborted") {
				return;
			}

			this.#isLoadingProducts = false;
			this.#productsError = error as Error;
			this.dispatchEvent(new EcommerceEvent("products.error"));
		}
	}

	public addToCart(product: Product) {
		const existingItem = this.#cart.find(
			(item) => item.product.id === product.id,
		);

		if (existingItem) {
			existingItem.quantity++;
		} else {
			this.#cart.push({ product, quantity: 1 });
		}

		this.dispatchEvent(new EcommerceEvent("cart.added"));
	}

	public removeFromCart(productId: string) {
		const item = this.#cart.find((item) => item.product.id === productId);
		this.#cart = this.#cart.filter((item) => item.product.id !== productId);

		if (item) {
			this.dispatchEvent(new EcommerceEvent("cart.removed"));
		}
	}

	public updateCartQuantity(productId: string, quantity: number) {
		const item = this.#cart.find((item) => item.product.id === productId);

		if (item) {
			if (quantity <= 0) {
				this.removeFromCart(productId);
			} else {
				item.quantity = quantity;
				this.dispatchEvent(new EcommerceEvent("cart.updated"));
			}
		}
	}

	public selectProduct(product: Product | null) {
		this.#selectedProduct = product;
		this.dispatchEvent(new EcommerceEvent("product.selected"));
	}

	public isInWishlist(productId: string): boolean {
		return this.#wishlist.has(productId);
	}

	public addToWishlist(product: Product) {
		if (this.#wishlist.has(product.id)) {
			return;
		}

		this.#wishlist.add(product.id);
		this.#syncWishlistToStorage();
		this.dispatchEvent(new EcommerceEvent("wishlist.added"));
	}

	public removeFromWishlist(productId: string) {
		if (!this.#wishlist.has(productId)) {
			return;
		}

		const product = this.#products.find((p) => p.id === productId);
		this.#wishlist.delete(productId);
		this.#syncWishlistToStorage();

		if (product) {
			this.dispatchEvent(new EcommerceEvent("wishlist.removed"));
		}
	}

	public toggleWishlist(product: Product) {
		if (this.#wishlist.has(product.id)) {
			this.removeFromWishlist(product.id);
		} else {
			this.addToWishlist(product);
		}
	}

	public initWishlistSync() {
		try {
			const stored = localStorage.getItem("ecommerce.wishlist");
			if (stored) {
				const ids = JSON.parse(stored) as string[];
				this.#wishlist = new Set(ids);
			}
		} catch {}

		window.addEventListener("storage", (event) => {
			if (event.key === "ecommerce.wishlist" && event.newValue) {
				try {
					const ids = JSON.parse(event.newValue) as string[];
					this.#wishlist = new Set(ids);
					this.dispatchEvent(new EcommerceEvent("wishlist.synced"));
				} catch {}
			}
		});
	}

	#syncWishlistToStorage() {
		try {
			const wishlistArray = Array.from(this.#wishlist);
			const wishlistJson = JSON.stringify(wishlistArray);

			localStorage.setItem("ecommerce.wishlist", wishlistJson);

			window.dispatchEvent(
				new StorageEvent("storage", {
					key: "ecommerce.wishlist",
					newValue: wishlistJson,
				}),
			);
		} catch {}
	}
}
