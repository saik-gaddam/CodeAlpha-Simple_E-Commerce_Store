const products = [
    { id: 1, name: "Premium Laptop", price: 82000, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300" },
    { id: 2, name: "Smartphone X", price: 45000, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300" },
    { id: 3, name: "Wireless Headphones", price: 12000, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" },
    { id: 4, name: "Smart Watch", price: 15000, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300" },
    { id: 5, name: "Gaming Mouse", price: 3500, img: "https://images.unsplash.com/photo-1527698266440-12104e498b76?w=300" },
    { id: 6, name: "4K Monitor", price: 28000, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300" }
];

let cart = [];

function updateUI() {
    // Render Products
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="product-price">₹${p.price.toLocaleString('en-IN')}</p>
                <div class="btn-group">
                    <button class="add-to-cart" onclick="addToCart(${p.id})">Add to Cart</button>
                    <button class="buy-now" onclick="buyNow(${p.id})">Buy Now</button>
                </div>
            </div>
        </div>
    `).join('');

    // Update Cart Count
    document.getElementById('cart-count').innerText = cart.length;

    // Render Cart Items
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = cart.map((item, index) => `
        <li class="cart-item">
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
                <div class="remove-btn" onclick="removeFromCart(${index})">Remove</div>
            </div>
        </li>
    `).join('');

    // Total Estimation
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('total-amount').innerText = `₹${total.toLocaleString('en-IN')}`;
}

window.addToCart = (id) => {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateUI();
};

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateUI();
};

window.toggleCart = () => {
    document.getElementById('cart-modal').classList.toggle('active');
};

window.buyNow = (id) => {
    const product = products.find(p => p.id === id);
    alert(`Proceeding to buy ${product.name} for ₹${product.price.toLocaleString('en-IN')}`);
};

window.processOrder = () => {
    if (cart.length === 0) return alert("Cart is empty!");
    alert("Order processed successfully!");
    cart = [];
    updateUI();
    toggleCart();
};

// Initial Render
updateUI();
