import { TypedEventTarget } from "@remix-run/interaction";

type CtxEventMap = {
	"todo.added": CtxEvent;
	"todo.toggled": CtxEvent;
	"todo.deleted": CtxEvent;
	change: CtxEvent;
};

class CtxEvent extends Event {
	todo: Todo | undefined;

	constructor(type: keyof CtxEventMap, todo?: Todo) {
		super(type);
		this.todo = todo;
	}
}

type Todo = {
	id: string;
	title: string;
	completed: boolean;
};

export class AppContext extends TypedEventTarget<CtxEventMap> {
	#todos: Todo[] = [{ id: "1", title: "Learn Remix", completed: false }];

	get todos() {
		return this.#todos;
	}

	public addTodo(title: string) {
		const newTodo: Todo = {
			id: crypto.randomUUID(),
			title,
			completed: false,
		};

		this.#todos.push(newTodo);

		this.dispatchEvent(new CtxEvent("todo.added"));
		this.dispatchEvent(new CtxEvent("change", newTodo));
	}

	public toggleTodo(id: string) {
		const todo = this.#todos.find((t) => t.id === id);

		if (todo) {
			todo.completed = !todo.completed;

			this.dispatchEvent(new Event("todo.toggled"));
			this.dispatchEvent(new CtxEvent("change", todo));
		}
	}

	public deleteTodo(id: string) {
		const todoToDelete = this.#todos.find((t) => t.id === id);
		this.#todos = this.#todos.filter((t) => t.id !== id);

		this.dispatchEvent(new CtxEvent("todo.deleted"));
		this.dispatchEvent(new CtxEvent("change", todoToDelete));
	}
}
