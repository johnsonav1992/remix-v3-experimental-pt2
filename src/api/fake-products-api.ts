import type { Product } from "../types/types";

const PRODUCTS_DB: Product[] = [
	{
		id: "1",
		name: "Organic Avocados",
		description:
			"Creamy, ripe avocados perfect for toast, salads, or guacamole. Rich in healthy fats.",
		price: 4.99,
		image:
			"https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&w=2150&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
			"https://images.unsplash.com/photo-1580716685595-98bd80bf3c01?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
			"https://images.unsplash.com/photo-1722635940350-d1b2e5129379?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
			"https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=400&h=300&fit=crop&q=80",
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
			"https://images.unsplash.com/photo-1644432757699-bb5a01e8fb0e?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		category: "protein",
		inStock: true,
	},
	{
		id: "8",
		name: "Tempeh",
		description: "Fermented soy tempeh. Nutty flavor and great protein source.",
		price: 5.49,
		image:
			"https://plus.unsplash.com/premium_photo-1664647788800-cf64e0aa931f?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
			"https://images.unsplash.com/photo-1626423642268-24cc183cbacb?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		category: "grains",
		inStock: true,
	},
	{
		id: "10",
		name: "Quinoa",
		description: "Organic tri-color quinoa. Complete protein and gluten-free.",
		price: 6.99,
		image:
			"https://images.unsplash.com/photo-1586201375799-47cd24c3f595?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		category: "grains",
		inStock: true,
	},
	{
		id: "11",
		name: "Brown Rice",
		description: "Long grain brown rice. Nutty flavor and high in fiber.",
		price: 5.49,
		image:
			"https://plus.unsplash.com/premium_photo-1726072357584-b613d4134334?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
			"https://images.unsplash.com/photo-1615110250484-e8c3b151b957?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
			"https://plus.unsplash.com/premium_photo-1670426501227-450cb0d92a16?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
			"https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?q=80&w=2304&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
			"https://plus.unsplash.com/premium_photo-1664647903517-70bb8213c743?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
			"https://plus.unsplash.com/premium_photo-1700084621249-b22c621ac4e9?q=80&w=1321&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		category: "beverages",
		inStock: true,
	},
];

export async function fetchProducts(
	delay = 1500,
	signal?: AbortSignal,
): Promise<Product[]> {
	await new Promise<void>((resolve, reject) => {
		const timeout = setTimeout(resolve, delay);

		signal?.addEventListener("abort", () => {
			clearTimeout(timeout);
			reject(new Error("Request aborted"));
		});
	});

	if (signal?.aborted) {
		throw new Error("Request aborted");
	}

	if (Math.random() < 0.1) {
		throw new Error("Network error: Failed to fetch products");
	}

	return JSON.parse(JSON.stringify(PRODUCTS_DB)) as Product[];
}

export async function fetchProductById(
	id: string,
	delay = 500,
	signal?: AbortSignal,
): Promise<Product | null> {
	await new Promise<void>((resolve, reject) => {
		const timeout = setTimeout(resolve, delay);

		signal?.addEventListener("abort", () => {
			clearTimeout(timeout);
			reject(new Error("Request aborted"));
		});
	});

	if (signal?.aborted) {
		throw new Error("Request aborted");
	}

	const product = PRODUCTS_DB.find((p) => p.id === id);
	return product ? JSON.parse(JSON.stringify(product)) : null;
}

export async function updateProductPrice(
	id: string,
	newPrice: number,
	signal?: AbortSignal,
): Promise<Product | null> {
	await new Promise<void>((resolve, reject) => {
		const timeout = setTimeout(resolve, 300);

		signal?.addEventListener("abort", () => {
			clearTimeout(timeout);
			reject(new Error("Request aborted"));
		});
	});

	if (signal?.aborted) {
		throw new Error("Request aborted");
	}

	const product = PRODUCTS_DB.find((p) => p.id === id);
	if (product) {
		product.price = newPrice;
		return JSON.parse(JSON.stringify(product));
	}

	return null;
}
