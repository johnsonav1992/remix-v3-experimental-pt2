import type { Handle } from "@remix-run/component";
import TodoList from "./components/TodoList/TodoList";
import { AppContext } from "./context/context";

export function App(this: Handle<AppContext>) {
	const ctx = new AppContext();

	this.context.set(ctx);

	return (
		<>
			<h1>Todo List</h1>
			<input
				type="text"
				placeholder="New todo"
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
			<TodoList />
		</>
	);
}
