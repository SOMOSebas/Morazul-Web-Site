// Countdown timer functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set countdown end time (12 hours from now)
    const countdownEnd = new Date().getTime() + (12 * 60 * 60 * 1000);

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = countdownEnd - now;

        if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // Timer expired
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Disable flash deal buttons
            const flashButtons = document.querySelectorAll('.flash-btn');
            flashButtons.forEach(btn => {
                btn.textContent = 'Oferta Expirada';
                btn.disabled = true;
                btn.style.background = '#999';
            });
        }
    }

    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simple success message
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.textContent = '¡Suscrito!';
            button.style.background = '#28a745';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '#333';
                this.reset();
            }, 3000);

            console.log(`Email suscrito: ${email}`);
        });
    }

    // Add to cart for sale items
    const saleButtons = document.querySelectorAll('.product-card.sale .add-to-cart');
    saleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const salePrice = productCard.querySelector('.sale-price').textContent;
            
            // Enhanced notification for sale items
            this.textContent = '¡Oferta Agregada!';
            this.style.background = '#28a745';
            
            setTimeout(() => {
                if (this.classList.contains('flash-btn')) {
                    this.textContent = '¡Comprar Ahora!';
                    this.style.background = '#ff6b6b';
                } else {
                    this.textContent = 'Agregar al Carrito';
                    this.style.background = '#667eea';
                }
            }, 2000);

            console.log(`Oferta agregada: ${productName} por ${salePrice}`);
        });
    });
});