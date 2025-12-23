// src/shared/layouts/AppLayout.js
import { Navbar } from '../components/Navbar.js';
import { authService } from '../../core/auth.js';

export function AppLayout({ activeSection, content }) {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="app-layout">
            ${Navbar({ activeSection })}
            <main class="app-content">
                ${content}
            </main>
        </div>
    `;
    
    // Event listeners
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            authService.logout();
        });
    }
}