// src/core/auth.js
import { api } from '@core/api.js';
import { store } from '@core/store.js';

const TOKEN_KEY = 'auth_token';

export const authService = {
    async login(email, password) {
        try {
            const data = await api.post('/auth/login', { email, password });
            
            if (data.ok) {
                const token = data.data.session.access_token;
                localStorage.setItem(TOKEN_KEY, token);
                store.setState('user', data.data.user);
                return { ok: true, data };
            }
            
            return { ok: false, error: data.error };
        } catch (error) {
            return { ok: false, error: error.message };
        }
    },

    async register(email, password) {
        try {
            const data = await api.post('/auth/register', { email, password });
            return data;
        } catch (error) {
            return { ok: false, error: error.message };
        }
    },

    async checkAuth() {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return false;

        try {
            const response = await fetch('/api/verification', {
                headers: { 'Authorization': `Bearer ${token}` }
            });


            if (response.ok) {
                const data = await response.json();
                store.setState('user', data.user);
                return true;
            }
            
            return false;
        } catch {
            return false;
        }
    },

    logout() {
        localStorage.removeItem(TOKEN_KEY);
        store.setState('user', null);
        window.location.href = '/login';
    },

    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }
};