const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar todos los productos al cargar la página
    displayProducts(products);
    // Calcular y mostrar el precio total de los productos
    calculateTotalPrice();
    // Verificar y mostrar si todos los productos están disponibles
    checkAvailability();
    // Mostrar la lista de nombres de productos
    getProductNames();

    // Evento para filtrar productos por categoría
    document.getElementById('filter-category').addEventListener('click', () => {
        const category = document.getElementById('category-filter').value;
        // Filtrar productos según la categoría seleccionada
        const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
        // Mostrar los productos filtrados
        displayProducts(filteredProducts);
    });

    // Evento para buscar un producto por su nombre
    document.getElementById('search-product').addEventListener('click', () => {
        const productName = document.getElementById('search-name').value;
        // Buscar el producto por nombre (case-insensitive)
        const product = products.find(p => p.name === productName);
        // Mostrar el resultado de la búsqueda
        document.getElementById('search-result').textContent = product ? 
            `${product.name} - ${product.category} - $${product.price} - Stock: ${product.stock}` : 
            'Producto no encontrado';
    });
});

// Función para mostrar los productos en la lista
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} - ${product.category} - $${product.price} - Stock: ${product.stock}`;
        productList.appendChild(listItem);
    });
}

// Función para calcular y mostrar el precio total de todos los productos
function calculateTotalPrice() {
    const totalPrice = products.reduce((total, product) => total + product.price, 0);
    document.getElementById('total-price').textContent = `Precio Total: $${totalPrice}`;
}

// Función para verificar si todos los productos están disponibles (stock > 0)
function checkAvailability() {
    const allAvailable = products.every(product => product.stock > 0);
    document.getElementById('availability').textContent = `Todos los productos están disponibles: ${allAvailable}`;
}

// Función para mostrar una lista de los nombres de los productos
function getProductNames() {
    const productNames = products.map(product => `<li>${product.name}</li>`);
    document.getElementById('product-names').innerHTML = productNames;
}