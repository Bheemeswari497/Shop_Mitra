// ShopMitra Pro - Multi-Platform E-commerce Aggregator with Professional Product Images
class ShopMitraProApp {
    constructor() {
        this.productsData = [];
        this.productGroups = {};
        this.users = [];
        this.currentUser = null;
        this.currentSearch = '';
        this.currentView = 'comparison';
        this.currentFilters = {
            category: '',
            priceMax: 150000,
            sortBy: 'best-deal',
            platforms: ['Flipkart', 'Amazon', 'Croma', 'Myntra', 'Vijay Sales', 'Samsung Store', 'AJIO', 'Meesho', 'Nykaa Fashion']
        };
        this.cart = [];
        this.suggestionTerms = [];
        this.currentImageIndex = 0;
        this.currentImageGallery = [];
        
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.setupEventListeners();
            this.renderInitialContent();
            this.setupSearchSuggestions();
            console.log('ShopMitra Pro initialized with', Object.keys(this.productGroups).length, 'product groups');
        } catch (error) {
            console.error('Failed to initialize ShopMitra Pro:', error);
        }
    }

    async loadData() {
        // Load the professional product data with REAL high-quality images
        const data = {"products": [{"id": "1a", "name": "Apple iPhone 16 128GB", "category": "Electronics", "price": 79999.0, "original_price": 89999.0, "platform": "Flipkart", "rating": 4.6, "reviews_count": 15234, "brand": "Apple", "description": "Latest iPhone 16 with A18 Bionic chip, advanced camera system, and 128GB storage", "image_url": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-model-unselect-gallery-1-202409_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1723849953017", "fallback_image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop&crop=center", "availability": "In Stock", "shipping": "Free", "delivery_days": "2-3 days", "special_offers": ["No Cost EMI", "Exchange Offer"], "tags": ["smartphone", "apple", "iphone", "128gb", "latest"], "product_group": "iphone_16_128gb"}, {"id": "1b", "name": "Apple iPhone 16 128GB", "category": "Electronics", "price": 81999.0, "original_price": 89999.0, "platform": "Amazon", "rating": 4.5, "reviews_count": 12890, "brand": "Apple", "description": "Latest iPhone 16 with A18 Bionic chip, advanced camera system, and 128GB storage", "image_url": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-model-unselect-gallery-1-202409_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1723849953017", "fallback_image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop&crop=center", "availability": "In Stock", "shipping": "Free", "delivery_days": "1-2 days", "special_offers": ["Amazon Prime", "1-Year Warranty"], "tags": ["smartphone", "apple", "iphone", "128gb", "latest"], "product_group": "iphone_16_128gb"}, {"id": "1c", "name": "Apple iPhone 16 128GB", "category": "Electronics", "price": 83999.0, "original_price": 89999.0, "platform": "Croma", "rating": 4.4, "reviews_count": 8765, "brand": "Apple", "description": "Latest iPhone 16 with A18 Bionic chip, advanced camera system, and 128GB storage", "image_url": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-model-unselect-gallery-1-202409_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1723849953017", "fallback_image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop&crop=center", "availability": "In Stock", "shipping": "₹99", "delivery_days": "3-5 days", "special_offers": ["Store Pickup", "Extended Warranty"], "tags": ["smartphone", "apple", "iphone", "128gb", "latest"], "product_group": "iphone_16_128gb"}, {"id": "1d", "name": "Apple iPhone 16 128GB", "category": "Electronics", "price": 82499.0, "original_price": 89999.0, "platform": "Vijay Sales", "rating": 4.3, "reviews_count": 6543, "brand": "Apple", "description": "Latest iPhone 16 with A18 Bionic chip, advanced camera system, and 128GB storage", "image_url": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-model-unselect-gallery-1-202409_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1723849953017", "fallback_image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop&crop=center", "availability": "In Stock", "shipping": "₹150", "delivery_days": "2-4 days", "special_offers": ["Store Credit", "Trade-in Bonus"], "tags": ["smartphone", "apple", "iphone", "128gb", "latest"], "product_group": "iphone_16_128gb"}, {"id": "2a", "name": "Samsung Galaxy S24 Ultra 256GB", "category": "Electronics", "price": 124999.0, "original_price": 129999.0, "platform": "Amazon", "rating": 4.4, "reviews_count": 8967, "brand": "Samsung", "description": "Samsung Galaxy S24 Ultra with S Pen, 256GB storage, and AI-powered camera", "image_url": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop&crop=center", "fallback_image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop&crop=center", "availability": "In Stock", "shipping": "Free", "delivery_days": "1-2 days", "special_offers": ["Amazon Prime", "S Pen Included"], "tags": ["smartphone", "samsung", "galaxy", "256gb", "s-pen"], "product_group": "galaxy_s24_ultra_256gb"}, {"id": "2b", "name": "Samsung Galaxy S24 Ultra 256GB", "category": "Electronics", "price": 122999.0, "original_price": 129999.0, "platform": "Flipkart", "rating": 4.5, "reviews_count": 11234, "brand": "Samsung", "description": "Samsung Galaxy S24 Ultra with S Pen, 256GB storage, and AI-powered camera", "image_url": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop&crop=center", "fallback_image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop&crop=center", "availability": "In Stock", "shipping": "Free", "delivery_days": "2-3 days", "special_offers": ["No Cost EMI", "Exchange Bonus"], "tags": ["smartphone", "samsung", "galaxy", "256gb", "s-pen"], "product_group": "galaxy_s24_ultra_256gb"}, {"id": "2c", "name": "Samsung Galaxy S24 Ultra 256GB", "category": "Electronics", "price": 126999.0, "original_price": 129999.0, "platform": "Samsung Store", "rating": 4.6, "reviews_count": 7890, "brand": "Samsung", "description": "Samsung Galaxy S24 Ultra with S Pen, 256GB storage, and AI-powered camera", "image_url": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop&crop=center", "fallback_image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop&crop=center", "availability": "In Stock", "shipping": "Free", "delivery_days": "1-3 days", "special_offers": ["Official Warranty", "Samsung Care+"], "tags": ["smartphone", "samsung", "galaxy", "256gb", "s-pen"], "product_group": "galaxy_s24_ultra_256gb"}, {"id": "3a", "name": "boAt Airdopes 141 Bluetooth Earbuds", "category": "Electronics", "price": 1299.0, "original_price": 2499.0, "platform": "Flipkart", "rating": 4.2, "reviews_count": 45678, "brand": "boAt", "description": "42H playback, Beast Mode for gaming, IPX4 water resistant earbuds", "image_url": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop&crop=center", "fallback_image": "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop&crop=center", "availability": "In Stock", "shipping": "Free", "delivery_days": "2-4 days", "special_offers": ["No Cost EMI", "1 Year Warranty"], "tags": ["earbuds", "bluetooth", "boat", "gaming", "waterproof"], "product_group": "boat_airdopes_141"}, {"id": "3b", "name": "boAt Airdopes 141 Bluetooth Earbuds", "category": "Electronics", "price": 1399.0, "original_price": 2499.0, "platform": "Amazon", "rating": 4.1, "reviews_count": 38967, "brand": "boAt", "description": "42H playback, Beast Mode for gaming, IPX4 water resistant earbuds", "image_url": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop&crop=center", "fallback_image": "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop&crop=center", "availability": "In Stock", "shipping": "Free", "delivery_days": "1-2 days", "special_offers": ["Amazon Prime", "Fast Delivery"], "tags": ["earbuds", "bluetooth", "boat", "gaming", "waterproof"], "product_group": "boat_airdopes_141"}, {"id": "3c", "name": "boAt Airdopes 141 Bluetooth Earbuds", "category": "Electronics", "price": 1449.0, "original_price": 2499.0, "platform": "Myntra", "rating": 4.0, "reviews_count": 23456, "brand": "boAt", "description": "42H playback, Beast Mode for gaming, IPX4 water resistant earbuds", "image_url": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop&crop=center", "fallback_image": "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop&crop=center", "availability": "In Stock", "shipping": "Free", "delivery_days": "3-5 days", "special_offers": ["Try & Buy", "Easy Returns"], "tags": ["earbuds", "bluetooth", "boat", "gaming", "waterproof"], "product_group": "boat_airdopes_141"}, {"id": "4a", "name": "Fire-Boltt Phoenix Pro Smartwatch", "category": "Electronics", "price": 1799.0, "original_price": 7999.0, "platform": "Amazon", "rating": 4.1, "reviews_count": 23456, "brand": "Fire-Boltt", "description": "1.39 inch display, Bluetooth calling, 120+ sports modes, SpO2 monitoring", "image_url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center", "fallback_image": "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop&crop=center", "availability": "In Stock", "shipping": "Free", "delivery_days": "1-2 days", "special_offers": ["Amazon Prime", "1 Year Warranty"], "tags": ["smartwatch", "bluetooth-calling", "fitness", "spo2"], "product_group": "fireboltt_phoenix_pro"}, {"id": "4b", "name": "Fire-Boltt Phoenix Pro Smartwatch", "category": "Electronics", "price": 1699.0, "original_price": 7999.0, "platform": "Flipkart", "rating": 4.2, "reviews_count": 28901, "brand": "Fire-Boltt", "description": "1.39 inch display, Bluetooth calling, 120+ sports modes, SpO2 monitoring", "image_url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center", "fallback_image": "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop&crop=center", "availability": "In Stock", "shipping": "Free", "delivery_days": "2-3 days", "special_offers": ["No Cost EMI", "Flipkart Assured"], "tags": ["smartwatch", "bluetooth-calling", "fitness", "spo2"], "product_group": "fireboltt_phoenix_pro"}, {"id": "4c", "name": "Fire-Boltt Phoenix Pro Smartwatch", "category": "Electronics", "price": 1899.0, "original_price": 7999.0, "platform": "Meesho", "rating": 3.9, "reviews_count": 15678, "brand": "Fire-Boltt", "description": "1.39 inch display, Bluetooth calling, 120+ sports modes, SpO2 monitoring", "image_url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center", "fallback_image": "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop&crop=center", "availability": "In Stock", "shipping": "₹50", "delivery_days": "4-6 days", "special_offers": ["Lowest Price", "COD Available"], "tags": ["smartwatch", "bluetooth-calling", "fitness", "spo2"], "product_group": "fireboltt_phoenix_pro"}, {"id": "5a", "name": "ZARA Floral Print Maxi Dress", "category": "Clothing", "price": 2999.0, "original_price": 4999.0, "platform": "Myntra", "rating": 4.3, "reviews_count": 1567, "brand": "ZARA", "description": "Floral print maxi dress with A-line silhouette, perfect for summer", "image_url": "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop&crop=center", "fallback_image": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop&crop=center", "availability": "In Stock", "shipping": "Free", "delivery_days": "2-3 days", "special_offers": ["Try & Buy", "Easy Returns"], "tags": ["dress", "floral", "maxi", "summer", "a-line"], "product_group": "zara_floral_maxi_dress"}, {"id": "5b", "name": "ZARA Floral Print Maxi Dress", "category": "Clothing", "price": 3199.0, "original_price": 4999.0, "platform": "AJIO", "rating": 4.4, "reviews_count": 1234, "brand": "ZARA", "description": "Floral print maxi dress with A-line silhouette, perfect for summer", "image_url": "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop&crop=center", "fallback_image": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop&crop=center", "availability": "In Stock", "shipping": "Free", "delivery_days": "2-4 days", "special_offers": ["AJIO Premium", "Style Guarantee"], "tags": ["dress", "floral", "maxi", "summer", "a-line"], "product_group": "zara_floral_maxi_dress"}, {"id": "5c", "name": "ZARA Floral Print Maxi Dress", "category": "Clothing", "price": 3399.0, "original_price": 4999.0, "platform": "Nykaa Fashion", "rating": 4.2, "reviews_count": 987, "brand": "ZARA", "description": "Floral print maxi dress with A-line silhouette, perfect for summer", "image_url": "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop&crop=center", "fallback_image": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop&crop=center", "availability": "Limited Stock", "shipping": "₹99", "delivery_days": "3-5 days", "special_offers": ["Beauty Points", "Free Gift"], "tags": ["dress", "floral", "maxi", "summer", "a-line"], "product_group": "zara_floral_maxi_dress"}, {"id": "6a", "name": "Nike Dri-FIT Running T-Shirt", "category": "Clothing", "price": 1495.0, "original_price": 1995.0, "platform": "AJIO", "rating": 4.5, "reviews_count": 5678, "brand": "Nike", "description": "Moisture-wicking Dri-FIT fabric, perfect for workouts and running", "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center", "fallback_image": "https://images.unsplash.com/photo-1583743089695-4b827e7295e0?w=400&h=400&fit=crop&crop=center", "availability": "In Stock", "shipping": "Free", "delivery_days": "2-3 days", "special_offers": ["AJIO Premium", "Size Exchange"], "tags": ["nike", "running", "dri-fit", "workout", "moisture-wicking"], "product_group": "nike_dri_fit_tshirt"}, {"id": "6b", "name": "Nike Dri-FIT Running T-Shirt", "category": "Clothing", "price": 1599.0, "original_price": 1995.0, "platform": "Amazon", "rating": 4.4, "reviews_count": 6789, "brand": "Nike", "description": "Moisture-wicking Dri-FIT fabric, perfect for workouts and running", "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center", "fallback_image": "https://images.unsplash.com/photo-1583743089695-4b827e7295e0?w=400&h=400&fit=crop&crop=center", "availability": "In Stock", "shipping": "Free", "delivery_days": "1-2 days", "special_offers": ["Amazon Prime", "Nike Genuine"], "tags": ["nike", "running", "dri-fit", "workout", "moisture-wicking"], "product_group": "nike_dri_fit_tshirt"}, {"id": "6c", "name": "Nike Dri-FIT Running T-Shirt", "category": "Clothing", "price": 1649.0, "original_price": 1995.0, "platform": "Myntra", "rating": 4.3, "reviews_count": 4321, "brand": "Nike", "description": "Moisture-wicking Dri-FIT fabric, perfect for workouts and running", "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center", "fallback_image": "https://images.unsplash.com/photo-1583743089695-4b827e7295e0?w=400&h=400&fit=crop&crop=center", "availability": "In Stock", "shipping": "Free", "delivery_days": "2-4 days", "special_offers": ["Try & Buy", "Athletic Guarantee"], "tags": ["nike", "running", "dri-fit", "workout", "moisture-wicking"], "product_group": "nike_dri_fit_tshirt"}]};

        this.productsData = data.products;
        this.users = [
            {"user_id": "user1", "name": "Rahul Sharma", "preferences": ["Electronics", "Gaming", "Smartphones"], "location": "Mumbai"},
            {"user_id": "user2", "name": "Priya Patel", "preferences": ["Fashion", "Beauty", "Ethnic Wear"], "location": "Delhi"},
            {"user_id": "user3", "name": "Anjali Singh", "preferences": ["Fitness", "Health", "Sports"], "location": "Bangalore"},
            {"user_id": "user4", "name": "Vikram Gupta", "preferences": ["Men's Fashion", "Casual Wear"], "location": "Pune"}
        ];
        this.processProductGroups();
        this.calculateMetrics();
    }

    processProductGroups() {
        this.productGroups = {};
        
        // Group products by product_group
        this.productsData.forEach(product => {
            const groupKey = product.product_group;
            if (!this.productGroups[groupKey]) {
                this.productGroups[groupKey] = {
                    name: product.name,
                    brand: product.brand,
                    category: product.category,
                    description: product.description,
                    image_url: product.image_url,
                    image_gallery: [product.image_url, product.fallback_image || product.image_url],
                    platforms: [],
                    prices: [],
                    lowest_price: Infinity,
                    highest_price: 0,
                    best_deal: null,
                    fastest_delivery: null
                };
            }
            
            const group = this.productGroups[groupKey];
            group.platforms.push(product);
            group.prices.push(product.price);
            
            // Update lowest and highest prices
            if (product.price < group.lowest_price) {
                group.lowest_price = product.price;
                group.best_deal = product;
            }
            if (product.price > group.highest_price) {
                group.highest_price = product.price;
            }
            
            // Find fastest delivery
            const deliveryDays = this.getDeliveryDays(product.delivery_days);
            const currentFastestDays = group.fastest_delivery ? this.getDeliveryDays(group.fastest_delivery.delivery_days) : Infinity;
            if (deliveryDays < currentFastestDays) {
                group.fastest_delivery = product;
            }
        });
        
        // Calculate additional metrics for each group
        Object.values(this.productGroups).forEach(group => {
            group.savings = group.highest_price - group.lowest_price;
            group.savings_percent = group.highest_price > 0 ? Math.round((group.savings / group.highest_price) * 100) : 0;
            group.avg_rating = group.platforms.reduce((sum, p) => sum + p.rating, 0) / group.platforms.length;
            group.total_reviews = group.platforms.reduce((sum, p) => sum + p.reviews_count, 0);
        });
    }

    getDeliveryDays(deliveryStr) {
        const match = deliveryStr.match(/(\d+)/);
        return match ? parseInt(match[0]) : 7;
    }

    calculateMetrics() {
        this.productsData.forEach(product => {
            product.discountPercent = Math.round((1 - product.price / product.original_price) * 100);
            product.formattedPrice = this.formatCurrency(product.price);
            product.formattedOriginalPrice = this.formatCurrency(product.original_price);
        });
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.performSearch(e.target.value);
                }
            });
        }

        // Voice search
        const voiceBtn = document.getElementById('voiceSearchBtn');
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => this.handleVoiceSearch());
        }

        // User selector
        const userSelector = document.getElementById('userSelector');
        if (userSelector) {
            userSelector.addEventListener('change', (e) => this.selectUser(e.target.value));
        }

        // Filters
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => this.updateFilter('category', e.target.value));
        }

        const priceRange = document.getElementById('priceRange');
        if (priceRange) {
            priceRange.addEventListener('input', (e) => this.updatePriceFilter(e.target.value));
        }

        const sortBy = document.getElementById('sortBy');
        if (sortBy) {
            sortBy.addEventListener('change', (e) => this.updateFilter('sortBy', e.target.value));
        }

        // Platform checkboxes
        const platformCheckboxes = document.querySelectorAll('#platformCheckboxes input[type="checkbox"]');
        platformCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updatePlatformFilters());
        });

        // Image modal events
        const imageModalClose = document.getElementById('imageModalClose');
        const imageModalOverlay = document.getElementById('imageModalOverlay');
        if (imageModalClose) {
            imageModalClose.addEventListener('click', () => this.closeImageModal());
        }
        if (imageModalOverlay) {
            imageModalOverlay.addEventListener('click', () => this.closeImageModal());
        }

        const prevImageBtn = document.getElementById('prevImageBtn');
        const nextImageBtn = document.getElementById('nextImageBtn');
        if (prevImageBtn) {
            prevImageBtn.addEventListener('click', () => this.navigateImage(-1));
        }
        if (nextImageBtn) {
            nextImageBtn.addEventListener('click', () => this.navigateImage(1));
        }

        // Platform modal events
        const modalOverlay = document.querySelector('#platformModal .modal-overlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => this.closePlatformModal());
        }

        // Keyboard navigation for image modal
        document.addEventListener('keydown', (e) => {
            const imageModal = document.getElementById('imageModal');
            if (imageModal && !imageModal.classList.contains('hidden')) {
                if (e.key === 'ArrowLeft') {
                    this.navigateImage(-1);
                } else if (e.key === 'ArrowRight') {
                    this.navigateImage(1);
                } else if (e.key === 'Escape') {
                    this.closeImageModal();
                }
            }
        });

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.hideSuggestions();
            }
        });

        console.log('Event listeners set up successfully');
    }

    setupSearchSuggestions() {
        this.suggestionTerms = [
            'iPhone 16', 'Apple iPhone 16 128GB', 'Apple',
            'Samsung Galaxy S24 Ultra', 'Samsung', 'Galaxy S24',
            'boAt Airdopes 141', 'boAt', 'earbuds', 'bluetooth earbuds',
            'Fire-Boltt Phoenix Pro', 'Fire-Boltt', 'smartwatch',
            'ZARA Floral Print Maxi Dress', 'ZARA', 'maxi dress',
            'Nike Dri-FIT Running T-Shirt', 'Nike', 'running t-shirt',
            'smartphone', 'phone', 'earbuds', 'smartwatch', 'dress', 't-shirt'
        ].filter((term, index, self) => self.indexOf(term) === index);
    }

    handleSearch(query) {
        this.currentSearch = query;
        if (query.length >= 2) {
            this.showSuggestions(query);
        } else {
            this.hideSuggestions();
        }
    }

    showSuggestions(query) {
        const suggestionsContainer = document.getElementById('searchSuggestions');
        if (!suggestionsContainer) return;

        const matches = this.getSuggestionMatches(query);
        if (matches.length === 0) {
            this.hideSuggestions();
            return;
        }

        const suggestionsHTML = matches.map(suggestion => 
            `<div class="suggestion-item" data-suggestion="${suggestion}">
                🔍 ${suggestion}
            </div>`
        ).join('');

        suggestionsContainer.innerHTML = suggestionsHTML;
        suggestionsContainer.classList.add('active');

        suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const suggestion = item.getAttribute('data-suggestion');
                this.selectSuggestion(suggestion);
            });
        });
    }

    getSuggestionMatches(query) {
        const queryLower = query.toLowerCase();
        return this.suggestionTerms
            .filter(term => term.toLowerCase().includes(queryLower))
            .slice(0, 8);
    }

    selectSuggestion(suggestion) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = suggestion;
        }
        this.hideSuggestions();
        this.performSearch(suggestion);
    }

    hideSuggestions() {
        const suggestionsContainer = document.getElementById('searchSuggestions');
        if (suggestionsContainer) {
            suggestionsContainer.classList.remove('active');
        }
    }

    performSearch(query) {
        this.currentSearch = query;
        console.log('Performing search for:', query);
        this.showLoading();
        setTimeout(() => {
            this.renderProducts();
            this.hideLoading();
        }, 500);
    }

    selectUser(userId) {
        this.currentUser = this.users.find(u => u.user_id === userId);
        if (this.currentUser) {
            this.showToast(`Welcome ${this.currentUser.name}! Personalized recommendations activated.`, 'success');
        }
        this.renderProducts();
    }

    updateFilter(filterType, value) {
        this.currentFilters[filterType] = value;
        this.renderProducts();
    }

    updatePriceFilter(value) {
        this.currentFilters.priceMax = parseInt(value);
        const priceDisplay = document.getElementById('priceDisplay');
        if (priceDisplay) {
            priceDisplay.textContent = `₹0 - ${this.formatCurrency(value)}`;
        }
        this.renderProducts();
    }

    updatePlatformFilters() {
        const checkedPlatforms = Array.from(document.querySelectorAll('#platformCheckboxes input[type="checkbox"]:checked'))
            .map(cb => cb.value);
        this.currentFilters.platforms = checkedPlatforms;
        this.renderProducts();
    }

    applyFilters() {
        console.log('Applying filters...', this.currentFilters);
        this.showLoading();
        setTimeout(() => {
            this.renderProducts();
            this.hideLoading();
            this.showToast('Filters applied successfully!', 'success');
        }, 300);
    }

    resetFilters() {
        this.currentFilters = {
            category: '',
            priceMax: 150000,
            sortBy: 'best-deal',
            platforms: ['Flipkart', 'Amazon', 'Croma', 'Myntra', 'Vijay Sales', 'Samsung Store']
        };
        
        // Reset UI
        const categoryFilter = document.getElementById('categoryFilter');
        const priceRange = document.getElementById('priceRange');
        const sortBy = document.getElementById('sortBy');
        const priceDisplay = document.getElementById('priceDisplay');
        
        if (categoryFilter) categoryFilter.value = '';
        if (priceRange) priceRange.value = '150000';
        if (sortBy) sortBy.value = 'best-deal';
        if (priceDisplay) priceDisplay.textContent = '₹0 - ₹1,50,000';
        
        // Reset platform checkboxes
        document.querySelectorAll('#platformCheckboxes input[type="checkbox"]').forEach(cb => {
            cb.checked = true;
        });
        
        this.currentSearch = '';
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }
        
        this.renderProducts();
        this.showToast('All filters cleared!', 'info');
    }

    renderInitialContent() {
        this.renderProducts();
        this.renderSidebar();
    }

    getFilteredProductGroups() {
        let filtered = Object.values(this.productGroups);

        // Apply search filter with improved matching
        if (this.currentSearch && this.currentSearch.length >= 1) {
            const query = this.currentSearch.toLowerCase().trim();
            console.log('Filtering by query:', query);
            
            filtered = filtered.filter(group => {
                // Check name, brand, category, description
                const nameMatch = group.name.toLowerCase().includes(query);
                const brandMatch = group.brand.toLowerCase().includes(query);
                const categoryMatch = group.category.toLowerCase().includes(query);
                const descriptionMatch = group.description.toLowerCase().includes(query);
                
                // Check if any platform has matching tags
                const hasMatchingTags = group.platforms.some(platform => 
                    platform.tags && platform.tags.some(tag => 
                        tag.toLowerCase().includes(query)
                    )
                );
                
                const matches = nameMatch || brandMatch || categoryMatch || descriptionMatch || hasMatchingTags;
                console.log(`Product: ${group.name}, Query: ${query}, Matches: ${matches}`);
                return matches;
            });
            
            console.log('Filtered products:', filtered.length);
        }

        // Apply category filter
        if (this.currentFilters.category) {
            filtered = filtered.filter(group => group.category === this.currentFilters.category);
        }

        // Apply price filter
        filtered = filtered.filter(group => group.lowest_price <= this.currentFilters.priceMax);

        // Apply platform filter - only show groups that have at least one platform selected
        filtered = filtered.filter(group => 
            group.platforms.some(platform => 
                this.currentFilters.platforms.includes(platform.platform)
            )
        );

        // Apply sorting
        return this.sortProductGroups(filtered);
    }

    sortProductGroups(groups) {
        switch (this.currentFilters.sortBy) {
            case 'best-deal':
                return groups.sort((a, b) => b.savings_percent - a.savings_percent);
            case 'price-low':
                return groups.sort((a, b) => a.lowest_price - b.lowest_price);
            case 'fastest-delivery':
                return groups.sort((a, b) => 
                    this.getDeliveryDays(a.fastest_delivery?.delivery_days || '7 days') - 
                    this.getDeliveryDays(b.fastest_delivery?.delivery_days || '7 days')
                );
            case 'highest-rating':
                return groups.sort((a, b) => b.avg_rating - a.avg_rating);
            case 'max-savings':
                return groups.sort((a, b) => b.savings - a.savings);
            default:
                return groups;
        }
    }

    renderProducts() {
        const container = document.getElementById('productsContainer');
        const title = document.getElementById('productsTitle');
        const count = document.getElementById('resultsCount');
        
        if (!container) return;

        const filteredGroups = this.getFilteredProductGroups();
        console.log('Rendering products:', filteredGroups.length);
        
        if (filteredGroups.length === 0) {
            this.showEmptyState();
            return;
        }

        this.hideEmptyState();
        
        if (title) {
            title.textContent = this.currentSearch ? 
                `🔍 Multi-Platform Results for "${this.currentSearch}"` : 
                '🛍️ Professional Product Photography Showcase';
        }
        
        if (count) {
            count.textContent = `${filteredGroups.length} products • Multiple platforms compared`;
        }

        const productsHTML = filteredGroups.map(group => this.createProductComparisonCard(group)).join('');
        container.innerHTML = productsHTML;

        this.updateSavingsCalculator(filteredGroups);
    }

    createProductComparisonCard(group) {
        const bestDeal = group.best_deal;
        const fastestDelivery = group.fastest_delivery;
        
        // Filter platforms based on current filter selection
        const availablePlatforms = group.platforms.filter(platform => 
            this.currentFilters.platforms.includes(platform.platform)
        );

        return `
            <div class="product-comparison-card">
                <!-- Large Professional Product Image Section - 450x450px -->
                <div class="product-main-info">
                    <div class="product-main-image" onclick="window.app.openImageModal('${this.escapeHtml(group.name)}', '${this.escapeHtml(group.brand)}', ${JSON.stringify(group.image_gallery)}, '${group.lowest_price}', '${availablePlatforms.length}')">
                        ${this.createProductImage(group)}
                        <div class="zoom-indicator">🔍 Click to zoom</div>
                    </div>
                    <div class="product-details">
                        <p class="product-brand">${group.brand}</p>
                        <h3 class="product-name">${group.name}</h3>
                        <p class="product-description">${group.description}</p>
                        
                        ${group.savings > 0 ? `
                            <div class="best-deal-highlight">
                                🏆 Best Deal Available • Save up to ${this.formatCurrency(group.savings)}
                            </div>
                        ` : ''}
                        
                        <div class="savings-info">
                            <div class="savings-amount">💰 Save ${this.formatCurrency(group.savings)} vs highest price</div>
                            <div class="savings-vs">Price range: ${this.formatCurrency(group.lowest_price)} - ${this.formatCurrency(group.highest_price)} (${group.savings_percent}% difference)</div>
                        </div>
                        
                        ${this.createImageGalleryThumbnails(group)}
                    </div>
                </div>

                <!-- Platform Comparison Grid -->
                <div class="platform-comparison-grid">
                    <div class="comparison-header">
                        <h3>💰 Compare Across ${availablePlatforms.length} Platforms</h3>
                        <p class="comparison-subtitle">Same product, different platforms • Find the best deal for you</p>
                    </div>
                    
                    <div class="platforms-grid">
                        ${availablePlatforms.map(platform => this.createPlatformOption(platform, bestDeal, fastestDelivery)).join('')}
                    </div>
                    
                    ${availablePlatforms.length > 2 ? this.createQuickCompareTable(availablePlatforms) : ''}
                </div>
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    createProductImage(group) {
        if (group.image_url) {
            return `<img src="${group.image_url}" alt="${group.name}" loading="lazy" 
                         onerror="this.src='${group.image_gallery && group.image_gallery[1] ? group.image_gallery[1] : 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop&crop=center'}';" />`;
        } else {
            return `<div class="product-image-placeholder">
                        ${this.getProductIcon(group.category)}
                    </div>`;
        }
    }

    createImageGalleryThumbnails(group) {
        if (!group.image_gallery || group.image_gallery.length <= 1) {
            return '';
        }

        return `
            <div class="image-gallery-thumbnails">
                ${group.image_gallery.slice(0, 4).map((imageUrl, index) => `
                    <div class="image-thumbnail ${index === 0 ? 'active' : ''}" 
                         onclick="window.app.openImageModal('${this.escapeHtml(group.name)}', '${this.escapeHtml(group.brand)}', ${JSON.stringify(group.image_gallery)}, '${group.lowest_price}', '${group.platforms.length}', ${index})">
                        <img src="${imageUrl}" alt="${group.name} view ${index + 1}" />
                    </div>
                `).join('')}
                ${group.image_gallery.length > 4 ? `<div class="image-thumbnail-more">+${group.image_gallery.length - 4}</div>` : ''}
            </div>
        `;
    }

    getProductIcon(category) {
        const icons = {
            'Electronics': '📱',
            'Clothing': '👕'
        };
        return icons[category] || '📦';
    }

    createPlatformOption(platform, bestDeal, fastestDelivery) {
        const isBestPrice = platform.id === bestDeal?.id;
        const isFastestDelivery = platform.id === fastestDelivery?.id;
        const stars = '★'.repeat(Math.floor(platform.rating)) + '☆'.repeat(5 - Math.floor(platform.rating));
        const platformClass = platform.platform.toLowerCase().replace(/\s+/g, '-');

        return `
            <div class="platform-option ${isBestPrice ? 'best-deal' : ''}" 
                 onclick="window.app.selectPlatform('${platform.id}')">
                <div class="platform-name ${platformClass}">
                    ${this.getPlatformIcon(platform.platform)} ${platform.platform}
                    ${isBestPrice ? ' 🏆' : ''}
                    ${isFastestDelivery ? ' 🚚' : ''}
                </div>
                
                <div class="platform-price">${platform.formattedPrice}</div>
                
                <div class="platform-details">
                    <div class="detail-row">
                        <span class="detail-label">Delivery:</span>
                        <span class="detail-value ${isFastestDelivery ? 'fast' : ''}">${platform.delivery_days}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Shipping:</span>
                        <span class="detail-value ${platform.shipping === 'Free' ? 'free' : ''}">${platform.shipping}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Availability:</span>
                        <span class="detail-value">${platform.availability}</span>
                    </div>
                </div>
                
                <div class="platform-features">
                    ${platform.special_offers.map(offer => 
                        `<span class="feature-badge">${offer}</span>`
                    ).join('')}
                </div>
                
                <div class="platform-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-text">${platform.rating} (${platform.reviews_count.toLocaleString()})</span>
                </div>
                
                <div class="platform-actions">
                    <button class="btn btn--primary" onclick="event.stopPropagation(); window.app.addToCart('${platform.id}')">
                        🛒 Add to Cart
                    </button>
                    <button class="btn btn--outline" onclick="event.stopPropagation(); window.app.viewPlatformDetails('${platform.id}')">
                        👀 View Details
                    </button>
                </div>
            </div>
        `;
    }

    getPlatformIcon(platform) {
        const icons = {
            'Flipkart': '📦',
            'Amazon': '🟠',
            'Croma': '🔴',
            'Vijay Sales': '🟢',
            'Samsung Store': '🟣',
            'Myntra': '🌸',
            'AJIO': '⚫',
            'Meesho': '🟡',
            'Nykaa Fashion': '💄'
        };
        return icons[platform] || '🏪';
    }

    createQuickCompareTable(platforms) {
        return `
            <div class="quick-compare-section">
                <h4 class="quick-compare-title">📊 Quick Comparison Table</h4>
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Platform</th>
                            <th>Price</th>
                            <th>Delivery</th>
                            <th>Rating</th>
                            <th>Special Offers</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${platforms.map(platform => {
                            const isBest = platform.price === Math.min(...platforms.map(p => p.price));
                            return `
                                <tr class="${isBest ? 'best-value' : ''}">
                                    <td><strong>${platform.platform}</strong></td>
                                    <td><strong>${platform.formattedPrice}</strong></td>
                                    <td>${platform.delivery_days}</td>
                                    <td>${platform.rating}⭐</td>
                                    <td>${platform.special_offers.slice(0, 2).join(', ')}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Image Modal Functions
    openImageModal(productName, brand, imageGallery, bestPrice, platformCount, startIndex = 0) {
        this.currentImageGallery = Array.isArray(imageGallery) ? imageGallery : [imageGallery];
        this.currentImageIndex = startIndex;

        const modal = document.getElementById('imageModal');
        const modalMainImage = document.getElementById('modalMainImage');
        const modalProductName = document.getElementById('modalProductName');
        const modalProductBrand = document.getElementById('modalProductBrand');
        const modalBestPrice = document.getElementById('modalBestPrice');
        const modalPlatformCount = document.getElementById('modalPlatformCount');

        if (modal && modalMainImage) {
            modalMainImage.src = this.currentImageGallery[startIndex];
            modalMainImage.alt = `${productName} - Image ${startIndex + 1}`;
            
            if (modalProductName) modalProductName.textContent = productName;
            if (modalProductBrand) modalProductBrand.textContent = brand;
            if (modalBestPrice) modalBestPrice.textContent = `Best Price: ${this.formatCurrency(bestPrice)}`;
            if (modalPlatformCount) modalPlatformCount.textContent = `Available on ${platformCount} platforms`;

            this.updateImageThumbnails();
            
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            this.showToast('📸 Use arrow keys to navigate • ESC to close', 'info');
        }
    }

    updateImageThumbnails() {
        const thumbnailsContainer = document.getElementById('imageThumbnails');
        if (!thumbnailsContainer || !this.currentImageGallery) return;

        thumbnailsContainer.innerHTML = this.currentImageGallery.map((imageUrl, index) => `
            <div class="image-thumbnail ${index === this.currentImageIndex ? 'active' : ''}" 
                 onclick="window.app.switchToImage(${index})">
                <img src="${imageUrl}" alt="Image ${index + 1}" />
            </div>
        `).join('');
    }

    switchToImage(index) {
        if (index >= 0 && index < this.currentImageGallery.length) {
            this.currentImageIndex = index;
            const modalMainImage = document.getElementById('modalMainImage');
            if (modalMainImage) {
                modalMainImage.src = this.currentImageGallery[index];
                modalMainImage.alt = `Product Image ${index + 1}`;
            }
            this.updateImageThumbnails();
        }
    }

    navigateImage(direction) {
        if (!this.currentImageGallery || this.currentImageGallery.length <= 1) return;
        
        let newIndex = this.currentImageIndex + direction;
        if (newIndex < 0) newIndex = this.currentImageGallery.length - 1;
        if (newIndex >= this.currentImageGallery.length) newIndex = 0;
        
        this.switchToImage(newIndex);
    }

    closeImageModal() {
        const modal = document.getElementById('imageModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
        this.currentImageGallery = [];
        this.currentImageIndex = 0;
    }

    selectPlatform(productId) {
        const product = this.productsData.find(p => p.id === productId);
        if (!product) return;

        this.showToast(`Selected ${product.name} from ${product.platform} for ${product.formattedPrice}`, 'success');
        this.openPlatformModal(productId);
    }

    openPlatformModal(productId) {
        const product = this.productsData.find(p => p.id === productId);
        if (!product) return;

        const group = this.productGroups[product.product_group];
        const modal = document.getElementById('platformModal');
        const selectionGrid = document.getElementById('platformSelectionGrid');

        if (!modal || !selectionGrid) return;

        selectionGrid.innerHTML = group.platforms.map(platform => `
            <div class="platform-selection-item" onclick="window.app.goToPlatform('${platform.platform}', '${platform.id}')">
                <h4>${this.getPlatformIcon(platform.platform)} ${platform.platform}</h4>
                <p><strong>${platform.formattedPrice}</strong></p>
                <p>${platform.delivery_days}</p>
                <p>${platform.shipping} shipping</p>
            </div>
        `).join('');

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    goToPlatform(platform, productId) {
        this.showToast(`Redirecting to ${platform}...`, 'info');
        this.closePlatformModal();
        setTimeout(() => {
            this.showToast(`This would open ${platform} in a new tab`, 'success');
        }, 1000);
    }

    closePlatformModal() {
        const modal = document.getElementById('platformModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    addToCart(productId) {
        const product = this.productsData.find(p => p.id === productId);
        if (!product) return;

        this.cart.push(product);
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = this.cart.length;
        }
        
        this.showToast(`🛒 ${product.name} added to cart from ${product.platform}!`, 'success');
    }

    viewPlatformDetails(productId) {
        const product = this.productsData.find(p => p.id === productId);
        if (!product) return;

        this.showToast(`Viewing details for ${product.name} on ${product.platform}`, 'info');
    }

    renderSidebar() {
        this.updateSavingsCalculator();
    }

    updateSavingsCalculator(groups = null) {
        if (!groups) groups = this.getFilteredProductGroups();

        const totalProducts = document.getElementById('totalProducts');
        const avgSavings = document.getElementById('avgSavings');
        const bestPlatform = document.getElementById('bestPlatform');

        if (totalProducts) totalProducts.textContent = groups.length;
        
        if (avgSavings && groups.length > 0) {
            const totalSavings = groups.reduce((sum, group) => sum + group.savings, 0);
            const average = totalSavings / groups.length;
            avgSavings.textContent = this.formatCurrency(average);
        }

        if (bestPlatform && groups.length > 0) {
            const platformCounts = {};
            groups.forEach(group => {
                if (group.best_deal) {
                    platformCounts[group.best_deal.platform] = (platformCounts[group.best_deal.platform] || 0) + 1;
                }
            });
            const best = Object.keys(platformCounts).reduce((a, b) => 
                platformCounts[a] > platformCounts[b] ? a : b, Object.keys(platformCounts)[0]
            );
            bestPlatform.textContent = best || '-';
        }
    }

    handleVoiceSearch() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-IN';

            recognition.onstart = () => {
                this.showToast('🎤 Listening... Say "iPhone 16" or "Samsung Galaxy"', 'info');
            };

            recognition.onresult = (event) => {
                const query = event.results[0][0].transcript;
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.value = query;
                }
                this.performSearch(query);
                this.showToast(`🔍 Searching for: "${query}"`, 'success');
            };

            recognition.onerror = () => {
                this.showToast('❌ Voice recognition error. Please try again.', 'error');
            };

            recognition.start();
        } else {
            this.showToast('❌ Voice search not supported in your browser.', 'error');
        }
    }

    showLoading() {
        const loadingState = document.getElementById('loadingState');
        const container = document.getElementById('productsContainer');
        if (loadingState) loadingState.classList.remove('hidden');
        if (container) container.style.display = 'none';
    }

    hideLoading() {
        const loadingState = document.getElementById('loadingState');
        const container = document.getElementById('productsContainer');
        if (loadingState) loadingState.classList.add('hidden');
        if (container) container.style.display = 'block';
    }

    showEmptyState() {
        const emptyState = document.getElementById('emptyState');
        const container = document.getElementById('productsContainer');
        if (emptyState) emptyState.classList.remove('hidden');
        if (container) container.style.display = 'none';
    }

    hideEmptyState() {
        const emptyState = document.getElementById('emptyState');
        const container = document.getElementById('productsContainer');
        if (emptyState) emptyState.classList.add('hidden');
        if (container) container.style.display = 'block';
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<div style="font-weight: var(--font-weight-medium);">${message}</div>`;
        
        const toastContainer = document.getElementById('toastContainer');
        if (toastContainer) {
            toastContainer.appendChild(toast);
        }
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 4000);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing ShopMitra Pro...');
    window.app = new ShopMitraProApp();
});