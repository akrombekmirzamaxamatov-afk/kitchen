// Calculator Module - Financial calculations
const Calc = {
    calculateTotal: function(items) {
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    calculateDailyRevenue: function(orders) {
        const today = new Date().toDateString();
        const todayOrders = orders.filter(o => new Date(o.date).toDateString() === today);
        return todayOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    },
    
    calculateWeeklyRevenue: function(orders) {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weeklyOrders = orders.filter(o => new Date(o.date) >= weekAgo);
        return weeklyOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    },
    
    calculateMonthlyRevenue: function(orders) {
        const monthAgo = new Date();
        monthAgo.setDate(monthAgo.getDate() - 30);
        const monthlyOrders = orders.filter(o => new Date(o.date) >= monthAgo);
        return monthlyOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    },
    
    getTopSellingItems: function(orders, limit = 5) {
        const itemSales = {};
        
        orders.forEach(order => {
            order.items.forEach(item => {
                itemSales[item.name] = (itemSales[item.name] || 0) + item.quantity;
            });
        });
        
        return Object.entries(itemSales)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([name, quantity]) => ({ name, quantity }));
    },
    
    calculateAverageOrderValue: function(orders) {
        if(orders.length === 0) return 0;
        const total = orders.reduce((sum, o) => sum + o.totalAmount, 0);
        return Math.round(total / orders.length);
    },
    
    getStatusDistribution: function(orders) {
        return {
            new: orders.filter(o => o.status === 'new').length,
            cooking: orders.filter(o => o.status === 'cooking').length,
            ready: orders.filter(o => o.status === 'ready').length
        };
    }
};

window.Calc = Calc;