import { TypedEventTarget } from "@remix-run/interaction";
import { fetchProducts } from "../api/fake-products-api";
import type { EcommerceEventMap } from "../events/ecommerce-event-map";
import type { CartItem, Product } from "../types/types";

export class EcommerceContext extends TypedEventTarget<EcommerceEventMap> {
	#products: Product[] = [];
	#isLoadingProducts = false;
	#productsError: Error | null = null;

	#cart: CartItem[] = [];
	#selectedProduct: Product | null = null;
	#selectedCategory: string = "all";

	#wishlist: Set<string> = new Set();
	#searchQuery: string = "";
	#searchResults: Product[] = [];
	#searchController: AbortController | null = null;

	get products() {
		return this.#products;
	}

	get cart() {
		return this.#cart;
	}

	get selectedProduct() {
		return this.#selectedProduct;
	}

	get selectedCategory() {
		return this.#selectedCategory;
	}

	get filteredProducts() {
		if (this.#selectedCategory === "all") {
			return this.#products;
		}

		return this.#products.filter((p) => p.category === this.#selectedCategory);
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

	get searchQuery() {
		return this.#searchQuery;
	}

	get searchResults() {
		return this.#searchResults;
	}

	public async loadProducts(signal?: AbortSignal) {
		if (this.#isLoadingProducts) return;

		this.#isLoadingProducts = true;
		this.#productsError = null;
		this.dispatchEvent(new Event("products.loading"));

		try {
			const products = await fetchProducts(1500, signal);

			if (signal?.aborted) return;

			this.#products = products;
			this.#isLoadingProducts = false;
			this.dispatchEvent(new Event("products.loaded"));

			console.log(`✅ Loaded ${products.length} products from API`);
		} catch (error) {
			if (error instanceof Error && error.message === "Request aborted") {
				return;
			}

			this.#isLoadingProducts = false;
			this.#productsError = error as Error;
			this.dispatchEvent(new Event("products.error"));

			console.error("❌ Failed to load products:", error);
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

		this.dispatchEvent(new Event("cart.added"));
	}

	public removeFromCart(productId: string) {
		const item = this.#cart.find((item) => item.product.id === productId);
		this.#cart = this.#cart.filter((item) => item.product.id !== productId);

		if (item) {
			this.dispatchEvent(new Event("cart.removed"));
		}
	}

	public updateCartQuantity(productId: string, quantity: number) {
		const item = this.#cart.find((item) => item.product.id === productId);

		if (item) {
			if (quantity <= 0) {
				this.removeFromCart(productId);
			} else {
				item.quantity = quantity;
				this.dispatchEvent(new Event("cart.updated"));
			}
		}
	}

	public selectProduct(product: Product | null) {
		this.#selectedProduct = product;
		this.dispatchEvent(new Event("product.selected"));
	}

	public setCategory(category: string) {
		this.#selectedCategory = category;
		this.dispatchEvent(new Event("filter.changed"));
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
		this.dispatchEvent(new Event("wishlist.added"));
	}

	public removeFromWishlist(productId: string) {
		if (!this.#wishlist.has(productId)) {
			return;
		}

		const product = this.#products.find((p) => p.id === productId);
		this.#wishlist.delete(productId);
		this.#syncWishlistToStorage();

		if (product) {
			this.dispatchEvent(new Event("wishlist.removed"));
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
		} catch (error) {
			console.error("Failed to load wishlist from storage:", error);
		}

		window.addEventListener("storage", (event) => {
			if (event.key === "ecommerce.wishlist" && event.newValue) {
				try {
					const ids = JSON.parse(event.newValue) as string[];
					this.#wishlist = new Set(ids);
					this.dispatchEvent(new Event("wishlist.synced"));
				} catch (error) {
					console.error("Failed to sync wishlist from storage:", error);
				}
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
		} catch (error) {
			console.error("Failed to sync wishlist to storage:", error);
		}
	}

	public async search(query: string, signal?: AbortSignal) {
		this.#searchQuery = query;

		if (this.#searchController) {
			this.#searchController.abort();
		}

		this.#searchController = new AbortController();
		const searchSignal = signal || this.#searchController.signal;

		this.dispatchEvent(new Event("search.started"));

		try {
			await new Promise<void>((resolve, reject) => {
				const timeout = setTimeout(resolve, 300);
				searchSignal.addEventListener("abort", () => {
					clearTimeout(timeout);
					reject(new Error("Search cancelled"));
				});
			});

			if (searchSignal.aborted) {
				this.dispatchEvent(new Event("search.cancelled"));
				return;
			}

			const results = this.#performSearch(query);
			this.#searchResults = results;

			this.dispatchEvent(new Event("search.completed"));
		} catch (error) {
			if (!searchSignal.aborted) {
				console.error("Search error:", error);
			}
		}
	}

	public clearSearch() {
		if (this.#searchController) {
			this.#searchController.abort();
		}

		this.#searchQuery = "";
		this.#searchResults = [];
		this.dispatchEvent(new Event("search.cancelled"));
	}

	#performSearch(query: string): Product[] {
		if (!query.trim()) {
			return [];
		}

		const lowerQuery = query.toLowerCase();

		return this.#products.filter((product) => {
			const matchesName = product.name.toLowerCase().includes(lowerQuery);
			const matchesDescription = product.description
				.toLowerCase()
				.includes(lowerQuery);
			const matchesCategory = product.category
				.toLowerCase()
				.includes(lowerQuery);

			return matchesName || matchesDescription || matchesCategory;
		});
	}
}
