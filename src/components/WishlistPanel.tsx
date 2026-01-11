import type { Handle } from "@remix-run/component";
import { App } from "../App";

export function WishlistPanel(this: Handle) {
	const ctx = this.context.get(App);
	let isOpen = false;

	const update = () => this.update();

	this.on(ctx, {
		"wishlist.added": update,
		"wishlist.removed": update,
		"wishlist.synced": () => this.update(),
		"products.loaded": update,
	});

	return () => {
		const wishlist = ctx.wishlist;

		return (
			<div
				css={{
					position: "fixed",
					top: "100px",
					right: "20px",
					zIndex: "999",
				}}
			>
				<button
					css={{
						position: "relative",
						padding: "16px",
						background: "#fef3c7",
						color: "#92400e",
						border: "none",
						borderRadius: "50%",
						width: "64px",
						height: "64px",
						fontSize: "24px",
						cursor: "pointer",
						boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
						transition: "all 0.2s",
						"&:hover": {
							background: "#fde68a",
							transform: "scale(1.05)",
						},
					}}
					on={{
						click: () => {
							isOpen = !isOpen;
							this.update();
						},
					}}
				>
					❤️
					{wishlist.length > 0 && (
						<span
							css={{
								position: "absolute",
								top: "-4px",
								right: "-4px",
								background: "#dc2626",
								color: "#ffffff",
								borderRadius: "50%",
								width: "24px",
								height: "24px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: "12px",
								fontWeight: "700",
								border: "2px solid #ffffff",
							}}
						>
							{wishlist.length}
						</span>
					)}
				</button>

				{isOpen && (
					<div
						css={{
							position: "absolute",
							top: "72px",
							right: "0",
							width: "400px",
							maxHeight: "600px",
							background: "#ffffff",
							borderRadius: "8px",
							boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
							border: "1px solid #e5e7eb",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<div
							css={{
								padding: "20px",
								borderBottom: "1px solid #e5e7eb",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<h2
								css={{
									margin: "0",
									fontSize: "20px",
									fontWeight: "600",
									color: "#1f2937",
								}}
							>
								Wishlist
							</h2>
							<button
								css={{
									background: "none",
									border: "none",
									fontSize: "24px",
									cursor: "pointer",
									padding: "0",
									color: "#6b7280",
									"&:hover": {
										color: "#1f2937",
									},
								}}
								on={{
									click: () => {
										isOpen = false;
										this.update();
									},
								}}
							>
								✕
							</button>
						</div>						
						<div
							css={{
								flex: "1",
								overflowY: "auto",
								padding: "20px",
							}}
						>
							{wishlist.length === 0 ? (
								<div
									css={{
										textAlign: "center",
										padding: "40px 20px",
										color: "#6b7280",
									}}
								>
									<div css={{ fontSize: "48px", marginBottom: "12px" }}>💝</div>
									<p css={{ margin: "0", fontSize: "16px" }}>
										Your wishlist is empty
									</p>
									<p
										css={{
											margin: "8px 0 0 0",
											fontSize: "12px",
											color: "#9ca3af",
										}}
									>
										Synced across all tabs
									</p>
								</div>
							) : (
								<div
									css={{
										display: "flex",
										flexDirection: "column",
										gap: "16px",
									}}
								>
									{wishlist.map((product) => (
										<div
											key={product.id}
											css={{
												display: "flex",
												gap: "12px",
												padding: "12px",
												background: "#fef3c7",
												borderRadius: "6px",
												border: "1px solid #fde68a",
											}}
										>
											<div
												css={{
													width: "60px",
													height: "60px",
													borderRadius: "6px",
													overflow: "hidden",
													flexShrink: "0",
												}}
											>
												<img
													src={product.image}
													alt={product.name}
													css={{
														width: "100%",
														height: "100%",
														objectFit: "cover",
													}}
												/>
											</div>											
											<div css={{ flex: "1" }}>
												<div
													css={{
														fontSize: "14px",
														fontWeight: "600",
														color: "#1f2937",
														marginBottom: "4px",
													}}
												>
													{product.name}
												</div>
												<div
													css={{
														fontSize: "14px",
														color: "#92400e",
														fontWeight: "600",
													}}
												>
													${product.price.toFixed(2)}
												</div>												
												<div
													css={{
														display: "flex",
														gap: "8px",
														marginTop: "8px",
													}}
												>
													<button
														css={{
															padding: "4px 12px",
															background: "#059669",
															color: "#ffffff",
															border: "none",
															borderRadius: "4px",
															fontSize: "12px",
															fontWeight: "600",
															cursor: "pointer",
															"&:hover": {
																background: "#047857",
															},
														}}
														on={{
															click: () => ctx.addToCart(product),
														}}
													>
														Add to Cart
													</button>
													<button
														css={{
															padding: "4px 12px",
															background: "none",
															border: "1px solid #dc2626",
															color: "#dc2626",
															borderRadius: "4px",
															fontSize: "12px",
															fontWeight: "600",
															cursor: "pointer",
															"&:hover": {
																background: "#fee2e2",
															},
														}}
														on={{
															click: () => ctx.removeFromWishlist(product.id),
														}}
													>
														Remove
													</button>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		);
	};
}
