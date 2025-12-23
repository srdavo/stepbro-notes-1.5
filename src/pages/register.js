import { authService } from '../services/auth';
import { router } from '../router';

export async function renderRegister() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="auth-container">
            <div class="auth-card">
                <h1>Registro</h1>
                <form id="register-form">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit">Registrarse</button>
                </form>
                <p>¿Ya tienes cuenta? <a href="/login" data-link>Inicia sesión</a></p>
                <div id="error-message" class="error"></div>
                <div id="success-message" class="success"></div>
            </div>
        </div>
    `;

    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('error-message');
        const successDiv = document.getElementById('success-message');

        const result = await authService.register(email, password);
        
        if (result.ok) {
            successDiv.textContent = '¡Registro exitoso! Revisa tu email para confirmar.';
            errorDiv.textContent = '';
            setTimeout(() => router.navigate('/login'), 2000);
        } else {
            errorDiv.textContent = result.error;
            successDiv.textContent = '';
        }
    });
}