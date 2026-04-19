// Storage Module - localStorage management
const Storage = {
    set(key, value) {
        try {
            localStorage.setItem(`qr_restoran_${key}`, JSON.stringify(value));
            return true;
        } catch(e) {
            console.error('Storage error:', e);
            return false;
        }
    },
    
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(`qr_restoran_${key}`);
            return item ? JSON.parse(item) : defaultValue;
        } catch(e) {
            console.error('Storage error:', e);
            return defaultValue;
        }
    },
    
    remove(key) {
        localStorage.removeItem(`qr_restoran_${key}`);
    },
    
    clear() {
        Object.keys(localStorage).forEach(key => {
            if(key.startsWith('qr_restoran_')) {
                localStorage.removeItem(key);
            }
        });
    },
    
    // Order specific methods
    saveOrder(order) {
        const orders = this.get('orders', []);
        order.id = Date.now().toString();
        order.date = new Date().toISOString();
        order.status = 'new';
        orders.unshift(order);
        this.set('orders', orders);
        return order.id;
    },
    
    getOrders() {
        return this.get('orders', []);
    },
    
    updateOrderStatus(orderId, status) {
        const orders = this.get('orders', []);
        const index = orders.findIndex(o => o.id === orderId);
        if(index !== -1) {
            orders[index].status = status;
            this.set('orders', orders);
            return true;
        }
        return false;
    },
    
    // Cart methods
    getCart() {
        return this.get('cart', []);
    },
    
    saveCart(cart) {
        this.set('cart', cart);
    },
    
    clearCart() {
        this.remove('cart');
    }
};

// Make storage global
window.Storage = Storage;