import type { Handle } from "@remix-run/component";
import { ProductCard } from "./ProductCard";
import { EcommerceApp } from "../../EcommerceApp";

const categories = [
	{ id: "all", name: "All Products", icon: "🛒" },
	{ id: "produce", name: "Produce", icon: "🥬" },
	{ id: "protein", name: "Protein", icon: "🫘" },
	{ id: "grains", name: "Grains", icon: "🌾" },
	{ id: "snacks", name: "Snacks", icon: "🍫" },
	{ id: "beverages", name: "Beverages", icon: "🥤" },
];

export function ProductGrid(this: Handle) {
	const ctx = this.context.get(EcommerceApp);

	this.on(ctx, {
		"filter.changed": () => this.update(),
	});

	return () => {
		const products = ctx.filteredProducts;
		const selectedCategory = ctx.selectedCategory;

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
								"&:hover": {
									background:
										selectedCategory === category.id ? "#047857" : "#e5e7eb",
								},
							}}
							on={{
								click: () => ctx.setCategory(category.id),
							}}
						>
							<span css={{ fontSize: "18px" }}>{category.icon}</span>
							{category.name}
						</button>
					))}
				</div>

				{products.length === 0 ? (
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
				) : (
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
