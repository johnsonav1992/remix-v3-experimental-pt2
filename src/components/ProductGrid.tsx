import type { Handle } from "@remix-run/component";
import { App } from "../App";
import { ProductCard } from "./ProductCard";

const categories = [
	{ id: "all", name: "All Products", icon: "🛒" },
	{ id: "produce", name: "Produce", icon: "🥬" },
	{ id: "protein", name: "Protein", icon: "🫘" },
	{ id: "grains", name: "Grains", icon: "🌾" },
	{ id: "snacks", name: "Snacks", icon: "🍫" },
	{ id: "beverages", name: "Beverages", icon: "🥤" },
];

export function ProductGrid(this: Handle) {
	const ctx = this.context.get(App);

	let selectedCategory = "all";

	this.on(ctx, {
		"products.loading": () => this.update(),
		"products.loaded": () => this.update(),
		"products.error": () => this.update(),
	});

	const getFilteredProducts = () => {
		if (selectedCategory === "all") {
			return ctx.products;
		}
		return ctx.products.filter((p) => p.category === selectedCategory);
	};

	const setCategory = (category: string) => {
		selectedCategory = category;
		this.update();
	};

	return () => {
		const products = getFilteredProducts();
		const isLoading = ctx.isLoadingProducts;
		const error = ctx.productsError;

		return (
			<div>
				<div
					css={{
						marginBottom: "32px",
						display: "flex",
						gap: "12px",
						flexWrap: "wrap",
					}}
				>
					{categories.map((category) => (
						<button
							key={category.id}
							css={{
								padding: "10px 20px",
								background:
									selectedCategory === category.id ? "#059669" : "#f3f4f6",
								color: selectedCategory === category.id ? "#ffffff" : "#374151",
								border: "1px solid",
								borderColor:
									selectedCategory === category.id ? "#059669" : "#e5e7eb",
								borderRadius: "6px",
								fontSize: "14px",
								fontWeight: "600",
								cursor: "pointer",
								transition: "all 0.2s",
								display: "flex",
								alignItems: "center",
								gap: "8px",
								opacity: isLoading ? "0.5" : "1",
								pointerEvents: isLoading ? "none" : "auto",
								"&:hover": {
									background:
										selectedCategory === category.id ? "#047857" : "#e5e7eb",
								},
							}}
							on={{
								click: () => setCategory(category.id),
							}}
						>
							<span css={{ fontSize: "18px" }}>{category.icon}</span>
							{category.name}
						</button>
					))}
				</div>
				{isLoading && (
					<div
						css={{
							textAlign: "center",
							padding: "80px 20px",
							color: "#059669",
						}}
					>
						<div
							css={{
								width: "64px",
								height: "64px",
								margin: "0 auto 24px",
								border: "6px solid #d1fae5",
								borderTopColor: "#059669",
								borderRadius: "50%",
								animation: "spin 1s linear infinite",
								"@keyframes spin": {
									"0%": { transform: "rotate(0deg)" },
									"100%": { transform: "rotate(360deg)" },
								},
							}}
						/>
						<p
							css={{ fontSize: "20px", fontWeight: "600", margin: "0 0 8px 0" }}
						>
							Loading Products...
						</p>
						<p css={{ fontSize: "14px", color: "#6b7280", margin: "0" }}>
							Fetching fresh produce from our API
						</p>
					</div>
				)}
				{!isLoading && error && (
					<div
						css={{
							textAlign: "center",
							padding: "60px 20px",
							color: "#dc2626",
						}}
					>
						<div css={{ fontSize: "64px", marginBottom: "16px" }}>⚠️</div>
						<p
							css={{ fontSize: "20px", fontWeight: "600", margin: "0 0 8px 0" }}
						>
							Failed to Load Products
						</p>
						<p
							css={{ fontSize: "14px", color: "#6b7280", margin: "0 0 16px 0" }}
						>
							{error.message}
						</p>
						<button
							css={{
								padding: "12px 24px",
								background: "#dc2626",
								color: "#ffffff",
								border: "none",
								borderRadius: "6px",
								fontSize: "14px",
								fontWeight: "600",
								cursor: "pointer",
								transition: "background 0.2s",
								"&:hover": {
									background: "#b91c1c",
								},
							}}
							on={{
								click: () => ctx.loadProducts(),
							}}
						>
							Retry
						</button>
					</div>
				)}
				{!isLoading && !error && products.length === 0 && (
					<div
						css={{
							textAlign: "center",
							padding: "60px 20px",
							color: "#6b7280",
						}}
					>
						<div css={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
						<p css={{ fontSize: "18px", fontWeight: "600", margin: "0" }}>
							No products found
						</p>
					</div>
				)}
				{!isLoading && !error && products.length > 0 && (
					<div
						css={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
							gap: "24px",
							alignItems: "stretch",
						}}
					>
						{products.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								onAddToCart={(p) => ctx.addToCart(p)}
								onViewDetails={(p) => ctx.selectProduct(p)}
							/>
						))}
					</div>
				)}
			</div>
		);
	};
}
