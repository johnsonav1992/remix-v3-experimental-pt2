import type { Handle } from "@remix-run/component";
import { EcommerceContext } from "./context/ecommerce-context";
import { ProductGrid } from "./components/ecommerce/ProductGrid";
import { Cart } from "./components/ecommerce/Cart";
import { ProductDetail } from "./components/ecommerce/ProductDetail";

export function EcommerceApp(this: Handle<EcommerceContext>) {
	const ctx = new EcommerceContext();
	this.context.set(ctx);

	return (
		<div
			css={{
				minHeight: "100vh",
				background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
				padding: "20px",
				fontFamily:
					'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
			}}
		>
			<header
				css={{
					maxWidth: "1400px",
					margin: "0 auto 40px auto",
					textAlign: "center",
				}}
			>
				<div
					css={{
						fontSize: "48px",
						marginBottom: "12px",
					}}
				>
					🌱
				</div>
				<h1
					css={{
						margin: "0 0 8px 0",
						fontSize: "3rem",
						fontWeight: "700",
						color: "#065f46",
						letterSpacing: "-0.025em",
					}}
				>
					GreenGrocer
				</h1>
				<p
					css={{
						margin: "0",
						fontSize: "18px",
						color: "#059669",
						fontWeight: "500",
					}}
				>
					Your one-stop shop for plant-based goodness
				</p>
			</header>

			<main
				css={{
					maxWidth: "1400px",
					margin: "0 auto",
					background: "#ffffff",
					borderRadius: "12px",
					padding: "40px",
					boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1)",
					border: "1px solid #d1fae5",
				}}
			>
				<ProductGrid />
			</main>

			<Cart />

			<ProductDetail />

			<footer
				css={{
					maxWidth: "1400px",
					margin: "40px auto 0 auto",
					textAlign: "center",
					color: "#059669",
					fontSize: "14px",
					fontWeight: "500",
				}}
			>
				<p css={{ margin: "0" }}>
					🌿 100% Plant-Based • Cruelty-Free • Sustainable 🌿
				</p>
			</footer>
		</div>
	);
}
