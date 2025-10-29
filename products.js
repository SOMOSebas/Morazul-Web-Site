// Product filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const productCards = document.querySelectorAll('.product-card');

    function filterProducts() {
        const selectedCategory = categoryFilter.value;
        const selectedPrice = priceFilter.value;

        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardPrice = parseFloat(card.getAttribute('data-price'));
            
            let showCard = true;

            // Category filter
            if (selectedCategory && cardCategory !== selectedCategory) {
                showCard = false;
            }

            // Price filter
            if (selectedPrice) {
                if (selectedPrice === '0-50' && (cardPrice < 0 || cardPrice > 50)) {
                    showCard = false;
                } else if (selectedPrice === '50-100' && (cardPrice < 50 || cardPrice > 100)) {
                    showCard = false;
                } else if (selectedPrice === '100+' && cardPrice < 100) {
                    showCard = false;
                }
            }

            // Show or hide card
            if (showCard) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add event listeners
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Simple cart notification
            this.textContent = '¡Agregado!';
            this.style.background = '#28a745';
            
            setTimeout(() => {
                this.textContent = 'Agregar al Carrito';
                this.style.background = '#667eea';
            }, 2000);

            // Here you would typically add the product to a cart array or send to backend
            console.log(`Producto agregado: ${productName}`);
        });
    });
});

// Add fade in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);