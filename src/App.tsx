/** biome-ignore-all lint/a11y/noLabelWithoutControl: don't need it right now */
import type { Handle } from "@remix-run/component";
import TodoList from "./components/TodoList/TodoList";
import { AppContext } from "./context/context";

export function App(this: Handle<AppContext>) {
	const ctx = new AppContext();

	this.context.set(ctx);

	return (
		<div
			css={{
				minHeight: "100vh",
				background: "#f8fafc",
				padding: "40px 20px",
				fontFamily:
					'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
			}}
		>
			<div
				css={{
					maxWidth: "700px",
					margin: "0 auto",
					background: "#ffffff",
					borderRadius: "8px",
					padding: "40px",
					boxShadow:
						"0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1)",
					border: "1px solid #e5e7eb",
				}}
			>
				<div
					css={{
						borderBottom: "2px solid #f3f4f6",
						paddingBottom: "24px",
						marginBottom: "32px",
					}}
				>
					<h1
						css={{
							margin: "0",
							fontSize: "2rem",
							fontWeight: "600",
							color: "#1f2937",
							letterSpacing: "-0.025em",
						}}
					>
						Task Management
					</h1>
					<p
						css={{
							margin: "8px 0 0 0",
							color: "#6b7280",
							fontSize: "14px",
							fontWeight: "500",
						}}
					>
						Organize and track your daily tasks efficiently
					</p>
				</div>

				<div
					css={{
						marginBottom: "32px",
					}}
				>
					<label
						css={{
							display: "block",
							marginBottom: "8px",
							fontSize: "14px",
							fontWeight: "600",
							color: "#374151",
						}}
					>
						Add New Task
					</label>
					<input
						type="text"
						placeholder="Enter task description..."
						css={{
							width: "100%",
							padding: "12px 16px",
							border: "1px solid #d1d5db",
							borderRadius: "6px",
							fontSize: "14px",
							color: "#111827",
							background: "#ffffff",
							transition:
								"border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
							outline: "none",
							boxSizing: "border-box",
							"&:focus": {
								borderColor: "#3b82f6",
								boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
							},
							"&::placeholder": {
								color: "#9ca3af",
							},
						}}
						on={{
							keydown: (event) => {
								if (event.key === "Enter") {
									const input = event.target as HTMLInputElement;
									if (input.value.trim() !== "") {
										ctx.addTodo(input.value.trim());
										input.value = "";
									}
								}
							},
						}}
					/>
				</div>

				<TodoList />
			</div>
		</div>
	);
}
