/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
import type { Handle } from "@remix-run/component";
import { App } from "../../App";
import type { Todo } from "../../context/context";

export default function TodoItem(this: Handle, { todo }: { todo: Todo }) {
	const ctx = this.context.get(App);

	return (
		<div
			key={todo.id}
			css={{
				display: "flex",
				alignItems: "center",
				gap: "12px",
				padding: "16px",
				background: todo.completed ? "#f0f9ff" : "#ffffff",
				border: "1px solid #e5e7eb",
				borderRadius: "6px",
				transition: "all 0.15s ease-in-out",
				"&:hover": {
					borderColor: "#d1d5db",
					boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
				},
			}}
		>
			<label
				css={{
					display: "flex",
					alignItems: "center",
					gap: "12px",
					flex: 1,
					cursor: "pointer",
				}}
			>
				<input
					type="checkbox"
					checked={todo.completed}
					css={{
						width: "16px",
						height: "16px",
						accentColor: "#3b82f6",
						cursor: "pointer",
					}}
					on={{ change: () => ctx.toggleTodo(todo.id) }}
				/>
				<span
					css={{
						fontSize: "14px",
						fontWeight: "500",
						color: todo.completed ? "#6b7280" : "#111827",
						textDecoration: todo.completed ? "line-through" : "none",
						transition: "all 0.15s ease-in-out",
					}}
				>
					{todo.title}
				</span>
			</label>
			<button
				css={{
					padding: "6px 12px",
					background: "#ffffff",
					color: "#dc2626",
					border: "1px solid #fecaca",
					borderRadius: "4px",
					fontSize: "12px",
					fontWeight: "600",
					cursor: "pointer",
					transition: "all 0.15s ease-in-out",
					"&:hover": {
						background: "#fef2f2",
						borderColor: "#fca5a5",
					},
				}}
				on={{ click: () => ctx.deleteTodo(todo.id) }}
			>
				Remove
			</button>
		</div>
	);
}
