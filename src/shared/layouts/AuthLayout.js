// src/shared/layouts/AuthLayout.js
export function AuthLayout({ content }) {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="auth-layout">
            <div class="auth-container">
                ${content}
            </div>
        </div>
    `;
}