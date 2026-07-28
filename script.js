const products = [
    { id: 1, name: "Laptop", price: 999, img: "https://via.placeholder.com/150" },
    { id: 2, name: "Phone", price: 499, img: "https://via.placeholder.com/150" },
];

let cart = [];

function renderProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>$${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    document.getElementById('cart-count').innerText = cart.length;
    alert(`${product.name} added to cart!`);
}

function processOrder() {
    if (cart.length === 0) return alert("Cart is empty");
    alert("Order processed successfully!");
    cart = [];
    document.getElementById('cart-count').innerText = 0;
}

renderProducts();
