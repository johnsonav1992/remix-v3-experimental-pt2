import type { Handle } from "@remix-run/component";
import { EcommerceApp } from "../../EcommerceApp";

export function ProductDetail(this: Handle) {
	const ctx = this.context.get(EcommerceApp);

	this.on(ctx, {
		"product.selected": () => this.update(),
	});

	this.on(document, {
		keydown: (event) => {
			if (event.key === "Escape" && ctx.selectedProduct) {
				ctx.selectProduct(null);
			}
		},
	});

	return () => {
		const product = ctx.selectedProduct;

		if (!product) {
			return null;
		}

		return (
			<div
				css={{
					position: "fixed",
					top: "0",
					left: "0",
					right: "0",
					bottom: "0",
					background: "rgba(0, 0, 0, 0.5)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					zIndex: "1000",
					padding: "20px",
				}}
				on={{
					click: (event) => {
						if (event.target === event.currentTarget) {
							ctx.selectProduct(null);
						}
					},
				}}
			>
				<div
					css={{
						background: "#ffffff",
						borderRadius: "12px",
						maxWidth: "600px",
						width: "100%",
						maxHeight: "90vh",
						overflowY: "auto",
						boxShadow: "0 20px 25px rgba(0, 0, 0, 0.15)",
					}}
				>
										<div
						css={{
							padding: "24px",
							borderBottom: "1px solid #e5e7eb",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<h2
							css={{
								margin: "0",
								fontSize: "24px",
								fontWeight: "600",
								color: "#1f2937",
							}}
						>
							Product Details
						</h2>
						<button
							css={{
								background: "none",
								border: "none",
								fontSize: "28px",
								cursor: "pointer",
								padding: "0",
								color: "#6b7280",
								lineHeight: "1",
								"&:hover": {
									color: "#1f2937",
								},
							}}
							on={{
								click: () => ctx.selectProduct(null),
							}}
						>
							✕
						</button>
					</div>

										<div css={{ padding: "32px" }}>
												<div
							css={{
								marginBottom: "24px",
								borderRadius: "12px",
								overflow: "hidden",
								maxHeight: "400px",
							}}
						>
							<img
								src={product.image}
								alt={product.name}
								css={{
									width: "100%",
									height: "auto",
									objectFit: "cover",
								}}
							/>
						</div>

												<div css={{ marginBottom: "24px" }}>
							<h3
								css={{
									margin: "0 0 12px 0",
									fontSize: "28px",
									fontWeight: "700",
									color: "#1f2937",
								}}
							>
								{product.name}
							</h3>

							<div
								css={{
									fontSize: "32px",
									fontWeight: "700",
									color: "#059669",
									marginBottom: "16px",
								}}
							>
								${product.price.toFixed(2)}
							</div>

														<div
								css={{
									display: "inline-block",
									padding: "6px 12px",
									borderRadius: "6px",
									fontSize: "14px",
									fontWeight: "600",
									background: product.inStock ? "#d1fae5" : "#fee2e2",
									color: product.inStock ? "#065f46" : "#991b1b",
									marginBottom: "20px",
								}}
							>
								{product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
							</div>

														<div
								css={{
									fontSize: "16px",
									lineHeight: "1.6",
									color: "#4b5563",
									marginBottom: "24px",
								}}
							>
								{product.description}
							</div>

														<div
								css={{
									background: "#f9fafb",
									padding: "20px",
									borderRadius: "8px",
									marginBottom: "24px",
								}}
							>
								<h4
									css={{
										margin: "0 0 12px 0",
										fontSize: "16px",
										fontWeight: "600",
										color: "#1f2937",
									}}
								>
									Product Information
								</h4>
								<div
									css={{
										display: "flex",
										flexDirection: "column",
										gap: "8px",
										fontSize: "14px",
										color: "#6b7280",
									}}
								>
									<div css={{ display: "flex", justifyContent: "space-between" }}>
										<span>Category:</span>
										<span
											css={{ fontWeight: "600", color: "#374151", textTransform: "capitalize" }}
										>
											{product.category}
										</span>
									</div>
									<div css={{ display: "flex", justifyContent: "space-between" }}>
										<span>Product ID:</span>
										<span css={{ fontWeight: "600", color: "#374151" }}>
											{product.id}
										</span>
									</div>
									<div css={{ display: "flex", justifyContent: "space-between" }}>
										<span>Vegan Certified:</span>
										<span css={{ fontWeight: "600", color: "#059669" }}>
											✓ Yes
										</span>
									</div>
								</div>
							</div>
						</div>

												<div css={{ display: "flex", gap: "12px" }}>
							{product.inStock ? (
								<button
									css={{
										flex: "1",
										padding: "16px 24px",
										background: "#059669",
										color: "#ffffff",
										border: "none",
										borderRadius: "8px",
										fontSize: "16px",
										fontWeight: "600",
										cursor: "pointer",
										transition: "background 0.2s",
										"&:hover": {
											background: "#047857",
										},
										"&:active": {
											transform: "scale(0.98)",
										},
									}}
									on={{
										click: () => {
											ctx.addToCart(product);
											ctx.selectProduct(null);
										},
									}}
								>
									Add to Cart
								</button>
							) : (
								<button
									disabled
									css={{
										flex: "1",
										padding: "16px 24px",
										background: "#e5e7eb",
										color: "#9ca3af",
										border: "none",
										borderRadius: "8px",
										fontSize: "16px",
										fontWeight: "600",
										cursor: "not-allowed",
									}}
								>
									Out of Stock
								</button>
							)}

							<button
								css={{
									padding: "16px 24px",
									background: "#f3f4f6",
									color: "#374151",
									border: "1px solid #e5e7eb",
									borderRadius: "8px",
									fontSize: "16px",
									fontWeight: "600",
									cursor: "pointer",
									transition: "all 0.2s",
									"&:hover": {
										background: "#e5e7eb",
									},
								}}
								on={{
									click: () => ctx.selectProduct(null),
								}}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	};
}
