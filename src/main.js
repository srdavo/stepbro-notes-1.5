import './styles/main.css';
import { router } from './router.js';

document.addEventListener("DOMContentLoaded", () => {
    router.init();
})
// Not using commonJS because this is front end source code