class Store {
    constructor() {
        this.state = {
            user: null,
            notes: [],
            isLoading: false
        };
        this.listeners = {};
    }

    getState(key) {
        return this.state[key];
    }

    setState(key, value) {
        this.state[key] = value;
        this.notify(key, value);
    }

    subscribe(key, callback) {
        if (!this.listeners[key]){
            this.listeners[key] = [];
        }
        this.listeners[key].push(callback);

        return () => {
            this.listeners[key] = this.listeners[key].filter(cb => cb !== callback);
        };
    }

    notify(key, value) {
        if (this.listeners[key]) {
            this.listeners[key].forEach(callback => callback(value));
        }
    }
}

export const store = new Store();