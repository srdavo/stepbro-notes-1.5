// src/features/auth/pages/LoginPage.js
import { authService } from '../../../core/auth.js';
import { AuthLayout } from '../../../shared/layouts/AuthLayout.js';
import { router } from '../../../router.js';

export async function LoginPage() {
    const content = `
        <div class="auth-card">
            <h1>Iniciar Sesión</h1>
            <form id="login-form">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required autocomplete="email">
                </div>
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password" required autocomplete="current-password">
                </div>
                <button type="submit" class="btn-primary">Iniciar Sesión</button>
            </form>
            <p class="auth-link">
                ¿No tienes cuenta? <a href="/register" data-link>Regístrate aquí</a>
            </p>
            <div id="error-message" class="error"></div>
        </div>
    `;
    
    AuthLayout({ content });
    
    // Event listeners
    const form = document.getElementById('login-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('error-message');
        
        const result = await authService.login(email, password);
        
        if (result.ok) {
            router.navigate('/notes');
        } else {
            errorDiv.textContent = result.error || 'Error al iniciar sesión';
        }
    });
}