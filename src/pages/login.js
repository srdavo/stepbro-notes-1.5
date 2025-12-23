import { authService } from '../services/auth';
import { router } from '../router';
import { PrettyMagnetic } from 'pretty-magnetic';

export async function renderLogin() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="auth-container">
            <div class="auth-card">
                <h1>Login</h1>
                <form id="login-form">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit">Iniciar Sesión</button>
                </form>
                <p>¿No tienes cuenta? <a href="/register" data-link>Regístrate</a></p>
                <div id="error-message" class="error"></div>
            </div>
        </div>
    `;

    // Manejar submit
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('error-message');

        const result = await authService.login(email, password);
        
        if (result.ok) {
            router.navigate('/dashboard');
        } else {
            errorDiv.textContent = result.error;
        }
    });

    new PrettyMagnetic('[type="submit"]')
}