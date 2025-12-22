const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Configuration
const app = express();
const PORT = process.env.PORT || 3000;

// Template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
	res.render('index', {title:'Home'});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});