// UI Module - Rendering and UI interactions
const UI = {
    currentCategory: 'all',
    
    renderProducts: function(products, category) {
        const container = document.getElementById('productsContainer');
        if(!container) return;
        
        this.currentCategory = category;
        let filtered = category === 'all' ? products : products.filter(p => p.category === category);
        
        if(filtered.length === 0) {
            container.innerHTML = `<div class="empty-state"><i class="fas fa-utensils"></i><p>${Lang.t('no_products')}</p></div>`;
            return;
        }
        
        container.innerHTML = filtered.map(product => {
            const name = Lang.getProductName(product);
            const desc = Lang.getProductDesc(product);
            
            return `
                <div class="product-card" data-product-id="${product.id}">
                    <div class="product-image">
                        ${product.icon}
                    </div>
                    <div class="product-info">
                        <div class="product-name">${name}</div>
                        <div class="product-desc">${desc}</div>
                        <div class="product-price">${product.price.toLocaleString()} so'm</div>
                    </div>
                    <button class="add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> ${Lang.t('add_to_cart')}
                    </button>
                </div>
            `;
        }).join('');
        
        // Add event listeners to add-to-cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = parseInt(btn.dataset.id);
                const product = products.find(p => p.id === productId);
                if(product && window.App) {
                    App.addToCart(product);
                }
            });
        });
    },
    
    getCurrentCategory: function() {
        return this.currentCategory;
    },
    
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#34C759' : '#FF3B30'};
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            z-index: 1000;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            white-space: nowrap;
        `;
        notification.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    },
    
    updateStats: function(orders) {
        const totalOrders = document.getElementById('totalOrders');
        const totalRevenue = document.getElementById('totalRevenue');
        const pendingOrders = document.getElementById('pendingOrders');
        
        if(totalOrders) totalOrders.textContent = orders.length;
        if(totalRevenue) {
            const revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
            totalRevenue.textContent = revenue.toLocaleString();
        }
        if(pendingOrders) {
            const pending = orders.filter(o => o.status !== 'ready').length;
            pendingOrders.textContent = pending;
        }
    }
};

window.UI = UI;