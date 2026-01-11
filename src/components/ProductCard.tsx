import type { Handle } from "@remix-run/component";
import { App } from "../App";
import type { Product } from "../types/types";

type Props = {
	product: Product;
	onAddToCart: (product: Product) => void;
	onViewDetails: (product: Product) => void;
};

export function ProductCard(this: Handle, props: Props) {
	const ctx = this.context.get(App);

	this.on(ctx, {
		"wishlist.added": () => this.update(),
		"wishlist.removed": () => this.update(),
	});

	return () => {
		const isInWishlist = ctx.isInWishlist(props.product.id);

		return (
			<div
				css={{
					background: "#ffffff",
					borderRadius: "8px",
					padding: "20px",
					border: "1px solid #e5e7eb",
					transition: "transform 0.2s, box-shadow 0.2s",
					cursor: "pointer",
					display: "flex",
					flexDirection: "column",
					"&:hover": {
						transform: "translateY(-4px)",
						boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
					},
				}}
			>
				<div
					css={{
						position: "relative",
						marginBottom: "16px",
						borderRadius: "8px",
						overflow: "hidden",
						height: "200px",
						cursor: "pointer",
					}}
					on={{
						click: () => props.onViewDetails(props.product),
					}}
				>
					<img
						src={props.product.image}
						alt={props.product.name}
						css={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>					
					<button
						css={{
							position: "absolute",
							top: "12px",
							right: "12px",
							width: "40px",
							height: "40px",
							background: isInWishlist
								? "rgba(239, 68, 68, 0.95)"
								: "rgba(255, 255, 255, 0.95)",
							border: "none",
							borderRadius: "50%",
							cursor: "pointer",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "20px",
							transition: "all 0.2s",
							boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
							"&:hover": {
								transform: "scale(1.15)",
								boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
							},
						}}
						on={{
							click: (e) => {
								e.stopPropagation();
								ctx.toggleWishlist(props.product);
							},
						}}
					>
						{isInWishlist ? "❤️" : "🤍"}
					</button>
				</div>				
				<div
					css={{ flex: "1" }}
					on={{
						click: () => props.onViewDetails(props.product),
					}}
				>
					<h3
						css={{
							margin: "0 0 8px 0",
							fontSize: "18px",
							fontWeight: "600",
							color: "#1f2937",
						}}
					>
						{props.product.name}
					</h3>					
					<p
						css={{
							margin: "0 0 12px 0",
							fontSize: "14px",
							color: "#6b7280",
							lineHeight: "1.5",
							overflow: "hidden",
							textOverflow: "ellipsis",
							display: "-webkit-box",
							WebkitLineClamp: "2",
							WebkitBoxOrient: "vertical",
						}}
					>
						{props.product.description}
					</p>					
					<div
						css={{
							fontSize: "24px",
							fontWeight: "700",
							color: "#059669",
							marginBottom: "16px",
						}}
					>
						${props.product.price.toFixed(2)}
					</div>
				</div>

				{!props.product.inStock ? (
					<div
						css={{
							padding: "12px",
							background: "#fee2e2",
							color: "#991b1b",
							borderRadius: "6px",
							fontSize: "14px",
							fontWeight: "600",
							textAlign: "center",
						}}
					>
						Out of Stock
					</div>
				) : (
					<button
						css={{
							padding: "12px 24px",
							background: "#059669",
							color: "#ffffff",
							border: "none",
							borderRadius: "6px",
							fontSize: "14px",
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
							click: () => props.onAddToCart(props.product),
						}}
					>
						Add to Cart
					</button>
				)}
			</div>
		);
	};
}
