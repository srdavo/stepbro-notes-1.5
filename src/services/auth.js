const TOKEN_KEY = 'auth_token';

export const authService = {
    async login(email, password) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            if (data.ok) {
                // Guardar token
                localStorage.setItem(TOKEN_KEY, data.data.session.access_token);
                return { ok: true, data };
            }
            
            return { ok: false, error: data.error };
        } catch (error) {
            return { ok: false, error: error.message };
        }
    },

    async register(email, password) {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            return { ok: false, error: error.message };
        }
    },

    async checkAuth() {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return false;

        try {
            const response = await fetch('/verification', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.ok;
        } catch {
            return false;
        }
    },

    logout() {
        localStorage.removeItem(TOKEN_KEY);
        window.location.href = '/login';
    },

    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }
};