document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.parentElement.querySelector('h3').textContent;
        alert(`Añadido al carrito: ${productName}`);
    });
});
let cart = [];
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

document.querySelector('.cart-icon').addEventListener('click', () => {
    cartModal.style.display = 'block';
});

document.querySelector('.close').addEventListener('click', () => {
    cartModal.style.display = 'none';
});

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const product = {
            name: productCard.querySelector('h3').textContent,
            price: parseFloat(productCard.querySelector('.price').textContent.replace('$', '')),
            quantity: 1
        };
        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }
        
        updateCart();
    });
});

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = "cart-item";
        itemElement.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

checkoutBtn.addEventListener('click', () => {
    alert(`Compra realizada! Total: $${cartTotal.textContent}`);
    cart = [];
    updateCart();
    cartModal.style.display = 'none';
});
const contactModal = document.getElementById('contact-modal');
const closeContactBtn = document.querySelector('.close-contact');
const contactLink = document.querySelector('nav ul li a[href="#contacto"]');
document.querySelectorAll('nav ul li a').forEach(link => {
    if (link.textContent === 'Contacto') {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            contactModal.style.display = 'block';
        });
    }
});
closeContactBtn.addEventListener('click', () => {
    contactModal.style.display = 'none';
});
window.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.style.display = 'none';
    }
});
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    alert(`¡Gracias, ${name}! Hemos recibido tu mensaje. Te contactaremos al correo: ${email}`);
    contactModal.style.display = 'none';
    e.target.reset(); 
});