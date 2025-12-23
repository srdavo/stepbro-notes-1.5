// src/shared/components/Navbar.js
export function Navbar({ activeSection = 'notes' }) {
    return `
        <nav class="navbar">

            <button class="navbar-button">
                <span class="label">stepbro Notes</span>
            </button>

            <button onclick="window.location='.'" class="navbar-button ${activeSection === 'notes' ? 'active' : ''}">
                <span class="material-symbols-rounded"> home </span>
                <span class="label">Inicio</span>
            </button>

            <button onclick="window.location='./todo'" class="navbar-button ${activeSection === 'todo' ? 'active' : ''}">
                <span class="material-symbols-rounded">apps</span>
                <span class="label">To-do</span>
            </button>

            <div class="simple-container grow-1"></div>

            <button id="logout-btn" class="navbar-button">

                <span class="label">Cerrar Sesión</span>
            </button>
            
            
        </nav>
    `;
}