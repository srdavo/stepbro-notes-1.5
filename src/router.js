// src/router.js
import { LoginPage } from '@features/auth/pages/LoginPage.js';
import { RegisterPage } from '@features/auth/pages/RegisterPage.js';
import { NotesPage } from '@features/notes/pages/NotesPage.js';
import { TodoPage } from '@features/todo/pages/TodoPage.js';

import { authService } from '@core/auth.js';

class Router {
    constructor() {
        this.routes = [
            { path: '/', component: LoginPage, public: true },
            { path: '/login', component: LoginPage, public: true },
            { path: '/register', component: RegisterPage, public: true },
            { path: '/notes', component: NotesPage, protected: true },
            { path: '/todo', component: TodoPage, protected: true },
        ];
    }

    init() {
        window.addEventListener('popstate', () => this.handleRoute());
        
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigate(e.target.getAttribute('href'));
            }
        });

        this.handleRoute();
    }

    navigate(path) {
        window.history.pushState(null, null, path);
        this.handleRoute();
    }

    async handleRoute() {
        const path = window.location.pathname;
        const route = this.routes.find(r => r.path === path) || this.routes[0];
        
        
        if (route.protected) {
            const isAuthenticated = await authService.checkAuth();
            if (!isAuthenticated) {
                this.navigate('/login');
                return;
            }
        }
        
        if (route.public && !route.protected) {
            const isAuthenticated = await authService.checkAuth();
            if (isAuthenticated && (path === '/login' || path === '/register' || path === '/')) {
                this.navigate('/notes');
                return;
            }
        }

        await route.component();
    }
}

export const router = new Router();