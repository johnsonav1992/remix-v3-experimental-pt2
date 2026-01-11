/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
import type { Handle } from "@remix-run/component";
import { App } from "../../App";

export default function TodoList(this: Handle) {
	const ctx = this.context.get(App);

	this.on(ctx, {
		change: () => {
			this.update();
		},
	});

	return () => {
		console.log("List render");
		return (
			<ul>
				{ctx.todos.map((todo) => (
					<li key={todo.id}>
						<input
							type="checkbox"
							checked={todo.completed}
							on={{ change: () => ctx.toggleTodo(todo.id) }}
						/>
						{todo.title}
						<button on={{ click: () => ctx.deleteTodo(todo.id) }}>
							Delete
						</button>
					</li>
				))}
			</ul>
		);
	};
}
