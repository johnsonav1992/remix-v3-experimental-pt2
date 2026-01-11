/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
import type { Handle } from "@remix-run/component";
import { App } from "../../App";
import TodoItem from "../TodoItem/TodoItem";

export default function TodoList(this: Handle) {
	const ctx = this.context.get(App);

	const update = () => this.update();

	this.on(ctx, {
		change: update,
	});

	return () => {
		console.log("List render");

		if (ctx.todos.length === 0) {
			return (
				<div
					css={{
						textAlign: "center",
						padding: "60px 20px",
						color: "#6b7280",
						fontSize: "16px",
						fontWeight: "500",
						background: "#f9fafb",
						borderRadius: "6px",
						border: "1px dashed #d1d5db",
					}}
				>
					No tasks assigned yet.
					<br />
					<span css={{ fontSize: "14px", color: "#9ca3af" }}>
						Add your first task above to get started.
					</span>
				</div>
			);
		}

		return (
			<div
				css={{
					display: "flex",
					flexDirection: "column",
					gap: "8px",
				}}
			>
				{ctx.todos.map((todo) => (
					<TodoItem key={todo.id} todo={todo} />
				))}
			</div>
		);
	};
}
