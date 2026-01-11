import { TypedEventTarget } from "@remix-run/interaction";

type EcommerceEventMap = {
	"cart.added": EcommerceEvent;
	"cart.removed": EcommerceEvent;
	"cart.updated": EcommerceEvent;
	"product.selected": EcommerceEvent;
	"filter.changed": Event;
};

class EcommerceEvent extends Event {
	product?: Product;
	cartItem?: CartItem;

	constructor(
		type: keyof EcommerceEventMap,
		data?: { product?: Product; cartItem?: CartItem },
	) {
		super(type);
		this.product = data?.product;
		this.cartItem = data?.cartItem;
	}
}

export type Product = {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	category: string;
	inStock: boolean;
};

export type CartItem = {
	product: Product;
	quantity: number;
};

export class EcommerceContext extends TypedEventTarget<EcommerceEventMap> {
	#products: Product[] = [
		{
			id: "1",
			name: "Organic Avocados",
			description:
				"Creamy, ripe avocados perfect for toast, salads, or guacamole. Rich in healthy fats.",
			price: 4.99,
			image:
				"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop&q=80",
			category: "produce",
			inStock: true,
		},
		{
			id: "2",
			name: "Rainbow Carrots",
			description:
				"A colorful mix of purple, orange, and yellow carrots. Sweet and crunchy.",
			price: 3.49,
			image:
				"https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400&h=300&fit=crop&q=80",
			category: "produce",
			inStock: true,
		},
		{
			id: "3",
			name: "Fresh Strawberries",
			description:
				"Sweet, juicy strawberries. Perfect for snacking or smoothies.",
			price: 5.99,
			image:
				"https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop&q=80",
			category: "produce",
			inStock: true,
		},
		{
			id: "4",
			name: "Baby Spinach",
			description:
				"Tender baby spinach leaves. Great for salads, smoothies, and cooking.",
			price: 3.99,
			image:
				"https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop&q=80",
			category: "produce",
			inStock: true,
		},
		{
			id: "5",
			name: "Organic Tofu",
			description:
				"Extra firm organic tofu. High in protein and perfect for stir-fries.",
			price: 4.49,
			image:
				"https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=400&h=300&fit=crop&q=80",
			category: "protein",
			inStock: true,
		},
		{
			id: "6",
			name: "Black Bean Burgers",
			description:
				"Delicious plant-based burger patties made with black beans and spices.",
			price: 7.99,
			image:
				"https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop&q=80",
			category: "protein",
			inStock: true,
		},
		{
			id: "7",
			name: "Chickpeas",
			description:
				"Canned organic chickpeas. Perfect for hummus, curries, and salads.",
			price: 2.49,
			image:
				"https://images.unsplash.com/photo-1589876876512-4f23c7c50c8e?w=400&h=300&fit=crop&q=80",
			category: "protein",
			inStock: true,
		},
		{
			id: "8",
			name: "Tempeh",
			description:
				"Fermented soy tempeh. Nutty flavor and great protein source.",
			price: 5.49,
			image:
				"https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&h=300&fit=crop&q=80",
			category: "protein",
			inStock: false,
		},
		{
			id: "9",
			name: "Whole Grain Bread",
			description:
				"Freshly baked whole grain bread. No animal products, 100% plant-based.",
			price: 4.99,
			image:
				"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&q=80",
			category: "grains",
			inStock: true,
		},
		{
			id: "10",
			name: "Quinoa",
			description:
				"Organic tri-color quinoa. Complete protein and gluten-free.",
			price: 6.99,
			image:
				"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop&q=80",
			category: "grains",
			inStock: true,
		},
		{
			id: "11",
			name: "Brown Rice",
			description: "Long grain brown rice. Nutty flavor and high in fiber.",
			price: 5.49,
			image:
				"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop&q=80",
			category: "grains",
			inStock: true,
		},
		{
			id: "12",
			name: "Almond Butter",
			description:
				"Creamy almond butter made from roasted almonds. No added sugar.",
			price: 8.99,
			image:
				"https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=300&fit=crop&q=80",
			category: "snacks",
			inStock: true,
		},
		{
			id: "13",
			name: "Dark Chocolate Bar",
			description:
				"70% cacao dark chocolate. Dairy-free and rich in antioxidants.",
			price: 3.99,
			image:
				"https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=300&fit=crop&q=80",
			category: "snacks",
			inStock: true,
		},
		{
			id: "14",
			name: "Hummus Variety Pack",
			description:
				"Three flavors: Classic, Roasted Red Pepper, and Garlic. Made fresh daily.",
			price: 6.49,
			image:
				"https://images.unsplash.com/photo-1571986563387-9d1b39fe3d98?w=400&h=300&fit=crop&q=80",
			category: "snacks",
			inStock: true,
		},
		{
			id: "15",
			name: "Oat Milk",
			description:
				"Creamy oat milk. Perfect for coffee, cereal, or drinking straight.",
			price: 4.99,
			image:
				"https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=300&fit=crop&q=80",
			category: "beverages",
			inStock: true,
		},
		{
			id: "16",
			name: "Green Smoothie",
			description:
				"Pre-made green smoothie with spinach, banana, and mango. Ready to drink.",
			price: 5.99,
			image:
				"https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=300&fit=crop&q=80",
			category: "beverages",
			inStock: true,
		},
	];

	#cart: CartItem[] = [];
	#selectedProduct: Product | null = null;
	#selectedCategory: string = "all";

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

	public addToCart(product: Product) {
		const existingItem = this.#cart.find(
			(item) => item.product.id === product.id,
		);

		if (existingItem) {
			existingItem.quantity++;
		} else {
			this.#cart.push({ product, quantity: 1 });
		}

		this.dispatchEvent(new EcommerceEvent("cart.added", { product }));
	}

	public removeFromCart(productId: string) {
		const item = this.#cart.find((item) => item.product.id === productId);
		this.#cart = this.#cart.filter((item) => item.product.id !== productId);

		if (item) {
			this.dispatchEvent(
				new EcommerceEvent("cart.removed", { cartItem: item }),
			);
		}
	}

	public updateCartQuantity(productId: string, quantity: number) {
		const item = this.#cart.find((item) => item.product.id === productId);

		if (item) {
			if (quantity <= 0) {
				this.removeFromCart(productId);
			} else {
				item.quantity = quantity;
				this.dispatchEvent(
					new EcommerceEvent("cart.updated", { cartItem: item }),
				);
			}
		}
	}

	public selectProduct(product: Product | null) {
		this.#selectedProduct = product;
		this.dispatchEvent(
			new EcommerceEvent("product.selected", product ? { product } : undefined),
		);
	}

	public setCategory(category: string) {
		this.#selectedCategory = category;
		this.dispatchEvent(new Event("filter.changed"));
	}
}
