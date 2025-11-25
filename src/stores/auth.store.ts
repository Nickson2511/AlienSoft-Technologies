import { defineStore } from 'pinia';


interface User {
    id: string;
    name: string;
    email: string;
    // later i will add more fields accordingly to my user states
}

interface AuthState {
    token: string | null;
    user: User | null;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user') || 'null') as User | null
    }),
    getters: {
        isAuthenticated: (state) => !!state.token
    },
    actions: {
        login(token: string, user: User) {
            this.token = token;
            this.user = user;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
});
