import { makeAutoObservable } from 'mobx';
import { createContext } from "react";

class Todo {
    title = '';
    checked = false;

    constructor(title) {
        makeAutoObservable(this);
        this.title = title;
    }
}

class TodoStore {
    todos = [];
    loading = true;

    constructor() {
        makeAutoObservable(this);
    }

    addTodo(title) {
        const newElement = new Todo(title);
    }

    toggleCompleted(id) {
        let element = this.todos.filter((todo) => todo.id === id);

        element[0].checked = !element[0].checked;
    }
}

export const todoStore = new TodoStore();
export const TodoStoreContext = createContext(todoStore);