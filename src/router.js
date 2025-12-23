import { renderLogin } from './pages/login';
import { renderRegister } from './pages/register';
import { renderDashboard } from './pages/dashboard';
import { authService } from './services/auth';

class Router {
    constructor() {
        this.routes = {
            '/': renderLogin,
            '/login': renderLogin,
            '/register': renderRegister,
            '/dashboard': renderDashboard,
        };
    }

    init() {
        // Handle navigation
        window.addEventListener('popstate', () => this.handleRoute());
    
        // Intercept link clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigate(e.target.getAttribute('href'));
            }
        });

        // Initial route handling
        this.handleRoute();
    }

    navigate(path){
        window.history.pushState(null, null, path);
        this.handleRoute();
    }

    async handleRoute() {
        const path = window.location.pathname;
        const render = this.routes[path] || this.routes['/'];

        if(path === '/dashboard') {
            const isAuthenticated = await authService.checkAuth();
            if (!isAuthenticated) {
                this.navigate('/login');
                return;
            }
        }

        await render();
    }
}

export const router = new Router(); // Singleton instance