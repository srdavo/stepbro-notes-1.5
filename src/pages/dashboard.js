import { authService } from '../services/auth';

export async function renderDashboard() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="dashboard-container">
            <header>
                <h1>Dashboard - StepBro Notes</h1>
                <button id="logout-btn">Cerrar Sesión</button>
            </header>
            <main>
                <p>¡Bienvenido! Estás autenticado correctamente.</p>
                <p>Aquí irán tus notas...</p>
            </main>
        </div>
    `;

    document.getElementById('logout-btn').addEventListener('click', () => {
        authService.logout();
    });
}