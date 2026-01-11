import type { Handle } from "@remix-run/component";
import { EcommerceApp } from "../../EcommerceApp";

export function Cart(this: Handle) {
	const ctx = this.context.get(EcommerceApp);
	let isOpen = false;

	const update = () => this.update();

	this.on(ctx, {
		"cart.added": update,
		"cart.removed": update,
		"cart.updated": update,
	});

	return () => {
		const cartItems = ctx.cart;
		const cartTotal = ctx.cartTotal;
		const itemCount = ctx.cartItemCount;

		return (
			<div
				css={{
					position: "fixed",
					top: "20px",
					right: "20px",
					zIndex: "1000",
				}}
			>
				<button
					css={{
						position: "relative",
						padding: "16px",
						background: "#d1fae5",
						color: "#065f46",
						border: "none",
						borderRadius: "50%",
						width: "64px",
						height: "64px",
						fontSize: "24px",
						cursor: "pointer",
						boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
						transition: "all 0.2s",
						"&:hover": {
							background: "#a7f3d0",
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
					🛒
					{itemCount > 0 && (
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
							{itemCount}
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
								Shopping Cart
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
							{cartItems.length === 0 ? (
								<div
									css={{
										textAlign: "center",
										padding: "40px 20px",
										color: "#6b7280",
									}}
								>
									<div css={{ fontSize: "48px", marginBottom: "12px" }}>🛍️</div>
									<p css={{ margin: "0", fontSize: "16px" }}>
										Your cart is empty
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
									{cartItems.map((item) => (
										<div
											key={item.product.id}
											css={{
												display: "flex",
												gap: "12px",
												padding: "12px",
												background: "#f9fafb",
												borderRadius: "6px",
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
													src={item.product.image}
													alt={item.product.name}
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
													{item.product.name}
												</div>
												<div
													css={{
														fontSize: "14px",
														color: "#059669",
														fontWeight: "600",
													}}
												>
													${item.product.price.toFixed(2)}
												</div>

												<div
													css={{
														display: "flex",
														alignItems: "center",
														gap: "8px",
														marginTop: "8px",
													}}
												>
													<button
														css={{
															width: "24px",
															height: "24px",
															background: "#ffffff",
															border: "1px solid #e5e7eb",
															borderRadius: "4px",
															cursor: "pointer",
															fontSize: "14px",
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
															"&:hover": {
																background: "#f3f4f6",
															},
														}}
														on={{
															click: () =>
																ctx.updateCartQuantity(
																	item.product.id,
																	item.quantity - 1,
																),
														}}
													>
														−
													</button>
													<span
														css={{
															fontSize: "14px",
															fontWeight: "600",
															minWidth: "20px",
															textAlign: "center",
														}}
													>
														{item.quantity}
													</span>
													<button
														css={{
															width: "24px",
															height: "24px",
															background: "#ffffff",
															border: "1px solid #e5e7eb",
															borderRadius: "4px",
															cursor: "pointer",
															fontSize: "14px",
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
															"&:hover": {
																background: "#f3f4f6",
															},
														}}
														on={{
															click: () =>
																ctx.updateCartQuantity(
																	item.product.id,
																	item.quantity + 1,
																),
														}}
													>
														+
													</button>
													<button
														css={{
															marginLeft: "auto",
															background: "none",
															border: "none",
															color: "#dc2626",
															cursor: "pointer",
															fontSize: "12px",
															fontWeight: "600",
															"&:hover": {
																textDecoration: "underline",
															},
														}}
														on={{
															click: () => ctx.removeFromCart(item.product.id),
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

						{cartItems.length > 0 && (
							<div
								css={{
									padding: "20px",
									borderTop: "1px solid #e5e7eb",
								}}
							>
								<div
									css={{
										display: "flex",
										justifyContent: "space-between",
										marginBottom: "16px",
									}}
								>
									<span
										css={{
											fontSize: "18px",
											fontWeight: "600",
											color: "#1f2937",
										}}
									>
										Total:
									</span>
									<span
										css={{
											fontSize: "24px",
											fontWeight: "700",
											color: "#059669",
										}}
									>
										${cartTotal.toFixed(2)}
									</span>
								</div>
								<button
									css={{
										width: "100%",
										padding: "14px",
										background: "#059669",
										color: "#ffffff",
										border: "none",
										borderRadius: "6px",
										fontSize: "16px",
										fontWeight: "600",
										cursor: "pointer",
										transition: "background 0.2s",
										"&:hover": {
											background: "#047857",
										},
									}}
									on={{
										click: () => {
											alert(
												`Checkout complete! Total: $${cartTotal.toFixed(2)}`,
											);
										},
									}}
								>
									Checkout
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		);
	};
}
