// src/features/auth/pages/RegisterPage.js
import { authService } from '../../../core/auth.js';
import { AuthLayout } from '../../../shared/layouts/AuthLayout.js';
import { router } from '../../../router.js';

export async function RegisterPage() {
    const content = `
        <div class="auth-card">
            <h1>Crear Cuenta</h1>
            <form id="register-form">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required autocomplete="email">
                </div>
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password" required autocomplete="new-password">
                </div>
                <button type="submit" class="btn-primary">Registrarse</button>
            </form>
            <p class="auth-link">
                ¿Ya tienes cuenta? <a href="/login" data-link>Inicia sesión</a>
            </p>
            <div id="error-message" class="error"></div>
            <div id="success-message" class="success"></div>
        </div>
    `;
    
    AuthLayout({ content });
    
    // Event listeners
    const form = document.getElementById('register-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('error-message');
        const successDiv = document.getElementById('success-message');
        
        const result = await authService.register(email, password);
        
        if (result.ok) {
            successDiv.textContent = '¡Registro exitoso! Revisa tu email para confirmar tu cuenta.';
            errorDiv.textContent = '';
            setTimeout(() => router.navigate('/login'), 3000);
        } else {
            errorDiv.textContent = result.error || 'Error al registrarse';
            successDiv.textContent = '';
        }
    });
}