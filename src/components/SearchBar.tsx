import type { Handle } from "@remix-run/component";
import { App } from "../App";

export function SearchBar(this: Handle) {
	const ctx = this.context.get(App);
	let isSearching = false;
	let showResults = false;

	this.on(ctx, {
		"search.started": () => {
			isSearching = true;
			showResults = true;
			this.update();
		},
		"search.completed": () => {
			isSearching = false;
			this.update();
		},
		"search.cancelled": () => {
			isSearching = false;
			showResults = false;
			this.update();
		},
	});

	return () => {
		const query = ctx.searchQuery;
		const results = ctx.searchResults;

		return (
			<div
				css={{
					position: "relative",
					maxWidth: "600px",
					margin: "0 auto 32px",
				}}
			>
				<div css={{ position: "relative" }}>
					<input
						type="text"
						value={query}
						placeholder="Search products... (with auto-cancellation)"
						css={{
							width: "100%",
							padding: "14px 48px 14px 48px",
							fontSize: "16px",
							border: "2px solid #e5e7eb",
							borderRadius: "8px",
							outline: "none",
							transition: "all 0.2s",
							"&:focus": {
								borderColor: "#3b82f6",
								boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
							},
						}}
						on={{
							async input(event, signal) {
								const value = event.currentTarget.value;
								await ctx.search(value, signal);
							},
							focus: () => {
								if (query) {
									showResults = true;
									this.update();
								}
							},
						}}
					/>					
					<span
						css={{
							position: "absolute",
							left: "16px",
							top: "50%",
							transform: "translateY(-50%)",
							fontSize: "20px",
							color: "#6b7280",
						}}
					>
						🔍
					</span>

					{query && (
						<button
							css={{
								position: "absolute",
								right: "12px",
								top: "50%",
								transform: "translateY(-50%)",
								background: "none",
								border: "none",
								fontSize: "20px",
								cursor: "pointer",
								padding: "4px",
								color: "#6b7280",
								"&:hover": {
									color: "#1f2937",
								},
							}}
							on={{
								click: () => {
									ctx.clearSearch();
									showResults = false;
									this.update();
								},
							}}
						>
							✕
						</button>
					)}

					{isSearching && (
						<div
							css={{
								position: "absolute",
								right: "48px",
								top: "50%",
								transform: "translateY(-50%)",
								width: "20px",
								height: "20px",
								border: "3px solid #e5e7eb",
								borderTopColor: "#3b82f6",
								borderRadius: "50%",
								animation: "spin 0.6s linear infinite",
								"@keyframes spin": {
									"0%": { transform: "translateY(-50%) rotate(0deg)" },
									"100%": { transform: "translateY(-50%) rotate(360deg)" },
								},
							}}
						/>
					)}
				</div>

				{showResults && query && (
					<div
						css={{
							position: "absolute",
							top: "calc(100% + 8px)",
							left: "0",
							right: "0",
							background: "#ffffff",
							borderRadius: "8px",
							boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
							border: "1px solid #e5e7eb",
							maxHeight: "400px",
							overflowY: "auto",
							zIndex: "1001",
						}}
					>
						<div
							css={{
								padding: "12px 16px",
								borderBottom: "1px solid #e5e7eb",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								background: "#f9fafb",
							}}
						>
							<span
								css={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}
							>
								{results.length === 0
									? "No results found"
									: `${results.length} result${results.length !== 1 ? "s" : ""}`}
							</span>
							<button
								css={{
									background: "none",
									border: "none",
									fontSize: "12px",
									color: "#6b7280",
									cursor: "pointer",
									fontWeight: "600",
									"&:hover": {
										color: "#1f2937",
										textDecoration: "underline",
									},
								}}
								on={{
									click: () => {
										showResults = false;
										this.update();
									},
								}}
							>
								Close
							</button>
						</div>

						{results.length > 0 && (
							<div css={{ padding: "8px" }}>
								{results.map((product) => (
									<div
										key={product.id}
										css={{
											display: "flex",
											gap: "12px",
											padding: "12px",
											borderRadius: "6px",
											cursor: "pointer",
											transition: "background 0.15s",
											"&:hover": {
												background: "#f3f4f6",
											},
										}}
										on={{
											click: () => {
												ctx.selectProduct(product);
												showResults = false;
												this.update();
											},
										}}
									>
										<div
											css={{
												width: "48px",
												height: "48px",
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
													marginBottom: "2px",
												}}
											>
												{product.name}
											</div>
											<div
												css={{
													fontSize: "12px",
													color: "#6b7280",
													marginBottom: "4px",
												}}
											>
												{product.description.substring(0, 60)}...
											</div>
											<div
												css={{
													fontSize: "14px",
													color: "#059669",
													fontWeight: "600",
												}}
											>
												${product.price.toFixed(2)}
											</div>
										</div>										
										<button
											css={{
												alignSelf: "center",
												padding: "6px 12px",
												background: "#059669",
												color: "#ffffff",
												border: "none",
												borderRadius: "6px",
												fontSize: "12px",
												fontWeight: "600",
												cursor: "pointer",
												whiteSpace: "nowrap",
												"&:hover": {
													background: "#047857",
												},
											}}
											on={{
												click: (e) => {
													e.stopPropagation();
													ctx.addToCart(product);
												},
											}}
										>
											Add to Cart
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		);
	};
}
