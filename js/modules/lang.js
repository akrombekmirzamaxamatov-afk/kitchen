// Language Module - Multi-language support
const Lang = {
    currentLang: 'uz',
    translations: {},
    
    init: async function(lang) {
        this.currentLang = lang;
        await this.loadTranslations(lang);
        this.updatePageTexts();
    },
    
    loadTranslations: async function(lang) {
        try {
            const response = await fetch(`../assets/lang/${lang}.json`);
            if(!response.ok) {
                // Fallback to uz if file not found
                const fallback = await fetch(`../assets/lang/uz.json`);
                this.translations = await fallback.json();
            } else {
                this.translations = await response.json();
            }
        } catch(error) {
            console.error('Translation load error:', error);
            // Default fallback
            this.translations = {
                app_name: "QR-Restoran",
                add_to_cart: "Savatga",
                cart_empty: "Savat bo'sh",
                place_order: "Buyurtma berish",
                total: "Jami",
                no_products: "Mahsulotlar mavjud emas"
            };
        }
    },
    
    updatePageTexts: function() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if(this.translations[key]) {
                if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = this.translations[key];
                } else {
                    el.textContent = this.translations[key];
                }
            }
        });
    },
    
    t: function(key) {
        return this.translations[key] || key;
    },
    
    getProductName: function(product) {
        switch(this.currentLang) {
            case 'ru': return product.nameRu || product.name;
            case 'en': return product.nameEn || product.name;
            default: return product.name;
        }
    },
    
    getProductDesc: function(product) {
        switch(this.currentLang) {
            case 'ru': return product.descRu || product.desc;
            case 'en': return product.descEn || product.desc;
            default: return product.desc;
        }
    }
};

window.Lang = Lang;