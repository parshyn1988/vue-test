import { defineStore } from 'pinia';

const FETCH_URL = 'https://jsonplaceholder.typicode.com'

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
}

interface State {
    users: User[];
    todos: { [key: number]: Todo[] };
    loading: boolean;
}

export const useUserStore = defineStore('userStore', {
    state: (): State => ({
        users: [],
        todos: {},
        loading: false,
    }),

    actions: {
        async fetchUsers() {
            this.loading = true;
            try {
                const response = await fetch(`${FETCH_URL}/users`);
                this.users = await response.json();
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        async fetchTodos(userId: number) {
            this.loading = true;
            try {
                const response = await fetch(`${FETCH_URL}/todos?userId=${userId}`);
                this.todos[userId] = await response.json();
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
    },
});
