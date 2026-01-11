import type { Product } from "../types/types";

const PRODUCTS_DB: Product[] = [
	{
		id: "1",
		name: "Organic Avocados",
		description:
			"Creamy, ripe avocados perfect for toast, salads, or guacamole. Rich in healthy fats.",
		price: 4.99,
		image:
			"https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&h=300&fit=crop&q=80",
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
			"https://images.unsplash.com/photo-1590865101275-23671238eb40?w=400&h=300&fit=crop&q=80",
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
			"https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400&h=300&fit=crop&q=80",
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
			"https://images.unsplash.com/photo-1585914924626-45adac9e6b42?w=400&h=300&fit=crop&q=80",
		category: "protein",
		inStock: true,
	},
	{
		id: "8",
		name: "Tempeh",
		description: "Fermented soy tempeh. Nutty flavor and great protein source.",
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
			"https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400&h=300&fit=crop&q=80",
		category: "grains",
		inStock: true,
	},
	{
		id: "10",
		name: "Quinoa",
		description: "Organic tri-color quinoa. Complete protein and gluten-free.",
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
			"https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop&q=80",
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
			"https://images.unsplash.com/photo-1590080875515-8a3a8dc5635e?w=400&h=300&fit=crop&q=80",
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
			"https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=400&h=300&fit=crop&q=80",
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
			"https://images.unsplash.com/photo-1574071318508-1cdbcd80ad50?w=400&h=300&fit=crop&q=80",
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
			"https://images.unsplash.com/photo-1635334430263-128290f65e23?w=400&h=300&fit=crop&q=80",
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
			"https://images.unsplash.com/photo-1610970881699-44a55b8cf7ae?w=400&h=300&fit=crop&q=80",
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
