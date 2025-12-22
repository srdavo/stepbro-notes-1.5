const fs = require('fs');
const path = require('path');
const express = require('express');

// (Before of all:) Check the enviroment configuration for avoid errors
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    console.error('[!] You need to configure the project with a .env file.');
    process.exit(1);
}

const { authController, authMiddleware } = require('./controllers/auth.controller'); // Now you can import the auth controller with the supabase .env config.

// Configuration
const app = express();
const PORT = process.env.PORT || 3000;

// Template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes: views
app.get('/', (req, res) => {
	res.render('index', {title:'Home'});
});

app.get('/verification', authMiddleware, (req, res) => {
    res.json({
        ok: true,
        message: "You're logged!",
        user: req.user
    });
});

// Routes: API auth
app.post('/api/auth/login', authController.login);
app.post('/api/auth/register', authController.register);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});