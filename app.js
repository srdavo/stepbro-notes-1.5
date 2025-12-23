const fs = require('fs');
const path = require('path');
const express = require('express');

// Check environment configuration
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    console.error('[!] You need to configure the project with a .env file.');
    process.exit(1);
}

const { authController, authMiddleware } = require('./controllers/auth.controller');

// Configuration
const app = express();
const PORT = process.env.PORT || 3000;

// Template engine (puedes mantenerlo si quieres)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes: API auth
app.post('/api/auth/login', authController.login);
app.post('/api/auth/register', authController.register);
app.get('/verification', authMiddleware, (req, res) => {
    res.json({
        ok: true,
        message: "You're logged!",
        user: req.user
    });
});

// SPA fallback - Sirve index.html para todas las demás rutas
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});