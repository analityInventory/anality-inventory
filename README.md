<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Nueva Venta</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <style>
        body { background-color: #f1f5f9; font-family: 'Inter', sans-serif; }
        .card-enter { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        /* Estilos para el scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
    </style>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="font-sans">

    <header class="bg-white shadow-md sticky top-0 z-10">
        <div class="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
            <h1 class="text-2xl font-bold text-slate-800">Crear Nueva Venta / Pedido</h1>
            <div>
                 <a href="index.html" class="text-slate-600 hover:text-blue-600 transition active:scale-90 mr-4" title="Volver a Pedidos">
                    <i class="ph ph-arrow-u-left-up text-3xl"></i>
                </a>
                <button id="logoutButton" class="text-slate-600 hover:text-red-600 transition active:scale-90" title="Cerrar Sesión">
                    <i class="ph ph-sign-out text-3xl"></i>
                </button>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">

        <div class="lg:col-span-3 bg-white p-5 rounded-xl shadow-lg">
            <div class="sticky top-[88px] bg-white pb-4 z-0">
                 <input type="search" id="product-search" placeholder="Buscar por nombre, marca o ID..." class="w-full text-lg px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div id="product-list" class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 h-[calc(100vh-220px)] overflow-y-auto pr-2">
                </div>
        </div>

        <div class="lg:col-span-2 space-y-6">
            <div class="bg-white p-5 rounded-xl shadow-lg">
                <h3 class="text-xl font-bold text-slate-800 mb-4 border-b pb-3">Productos Seleccionados</h3>
                <div id="cart-items" class="space-y-3 h-48 overflow-y-auto pr-2">
                    <p id="cart-empty-message" class="text-slate-500 text-center py-10">El carrito está vacío</p>
                </div>
            </div>
            
            <div class="bg-white p-5 rounded-xl shadow-lg">
                <h3 class="text-xl font-bold text-slate-800 mb-4 border-b pb-3">Datos del Cliente</h3>
                <div class="space-y-4">
                    <input id="customer-name" type="text" placeholder="Nombre del Cliente *" class="w-full px-3 py-2 border border-slate-300 rounded-lg">
                    <input id="customer-address" type="text" placeholder="Dirección (para delivery)" class="w-full px-3 py-2 border border-slate-300 rounded-lg">
                    <input id="customer-phone" type="tel" placeholder="Teléfono" class="w-full px-3 py-2 border border-slate-300 rounded-lg">
                </div>
            </div>
            
            <div class="bg-white p-5 rounded-xl shadow-lg">
                 <h3 class="text-xl font-bold text-slate-800 mb-4 border-b pb-3">Totales y Pago</h3>
                 <div class="space-y-3 text-lg">
                    <div class="flex justify-between items-center">
                        <span class="text-slate-600">Subtotal:</span>
                        <span id="subtotal-value" class="font-semibold text-slate-800">R$0.00</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-slate-600">Entrega:</span>
                        <input id="delivery-fee" type="number" value="0.00" min="0" step="0.50" class="w-24 font-semibold text-slate-800 border rounded-md text-right px-2">
                    </div>
                    <div class="flex justify-between items-center text-2xl border-t pt-3 mt-3">
                        <span class="font-bold text-slate-900">Total General:</span>
                        <span id="grand-total-value" class="font-bold text-blue-600">R$0.00</span>
                    </div>
                 </div>
                 <div class="grid grid-cols-2 gap-4 mt-6">
                    <div>
                        <label class="font-semibold text-slate-700">Pago</label>
                        <select id="payment-method" class="w-full mt-1 p-2 border rounded-lg">
                            <option>Efectivo</option>
                            <option>Tarjeta</option>
                            <option>PIX</option>
                        </select>
                    </div>
                    <div>
                        <label class="font-semibold text-slate-700">Entrega</label>
                         <select id="delivery-type" class="w-full mt-1 p-2 border rounded-lg">
                            <option value="tienda">Retira en Tienda</option>
                            <option value="delivery">Delivery (Pedido)</option>
                        </select>
                    </div>
                 </div>
                 <button id="finalize-button" class="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold text-xl py-4 rounded-lg transition active:scale-95 flex items-center justify-center gap-3">
                    <i class="ph-bold ph-check-circle text-2xl"></i>
                    Finalizar
                </button>
            </div>
        </div>

    </main>

    <template id="product-card-template">
        <div class="border rounded-lg p-3 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:border-blue-500 transition cursor-pointer card-enter">
            <div class="flex-grow">
                <h3 class="font-bold text-slate-800 leading-tight"></h3>
                <p class="text-xs text-slate-500 mb-1" data-brand></p>
            </div>
            <p class="text-lg font-semibold text-blue-600 my-2" data-price></p>
            <span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full" data-stock></span>
        </div>
    </template>

    <template id="cart-item-template">
        <div class="flex items-center gap-3 py-2 border-b">
            <div class="flex-grow">
                <p class="font-semibold text-slate-800"></p>
                <p class="text-sm text-slate-500" data-price></p>
            </div>
            <div class="flex items-center gap-2">
                <input type="number" min="1" value="1" class="w-14 text-center border rounded-md">
                <button data-action="remove" class="text-red-500 hover:text-red-700 p-1"><i class="ph ph-trash"></i></button>
            </div>
        </div>
    </template>

<script>
document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURACIÓN ---
    const API_BASE_URL = 'https://mi-primera-app.fly.dev'; // <-- ¡IMPORTANTE! Apunta a tu backend

    // --- ESTADO DE LA APLICACIÓN ---
    let allProducts = [];
    let cart = []; // Array de objetos: { id, name, price, costo, quantity, brand }

    // --- SELECTORES DE ELEMENTOS ---
    const productListContainer = document.getElementById('product-list');
    const searchInput = document.getElementById('product-search');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const subtotalValueEl = document.getElementById('subtotal-value');
    const deliveryFeeEl = document.getElementById('delivery-fee');
    const grandTotalValueEl = document.getElementById('grand-total-value');
    const deliveryTypeEl = document.getElementById('delivery-type');
    const finalizeButton = document.getElementById('finalize-button');
    const logoutButton = document.getElementById('logoutButton');

    // --- LÓGICA DE LA API ---
    function getAuthHeaders() {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        if (!token) {
            window.location.href = 'index.html'; // Redirige si no hay token
            return null;
        }
        return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    }

    async function fetchProducts() {
        const headers = getAuthHeaders();
        if (!headers) return;

        try {
            const response = await fetch(`${API_BASE_URL}/products?out_of_stock=false`, { headers });
            if (!response.ok) throw new Error('No se pudieron cargar los productos.');
            allProducts = await response.json();
            renderProducts(allProducts);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }
    
    // --- LÓGICA DE RENDERIZADO ---
    function renderProducts(productsToRender) {
        productListContainer.innerHTML = '';
        const template = document.getElementById('product-card-template');
        
        productsToRender.forEach(product => {
            const card = template.content.cloneNode(true).firstElementChild;
            card.querySelector('h3').textContent = product.name;
            card.querySelector('[data-brand]').textContent = product.brand || 'Sin Marca';
            card.querySelector('[data-price]').textContent = `R$${product.price.toFixed(2)}`;
            const stockEl = card.querySelector('[data-stock]');
            stockEl.textContent = `Stock: ${product.stock}`;
            if (product.stock < 5) {
                stockEl.classList.add('bg-yellow-100', 'text-yellow-800');
            }
            card.dataset.productId = product.id;
            productListContainer.appendChild(card);
        });
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.appendChild(cartEmptyMessage);
            cartEmptyMessage.hidden = false;
        } else {
            cartEmptyMessage.hidden = true;
            const template = document.getElementById('cart-item-template');
            cart.forEach(item => {
                const cartItemEl = template.content.cloneNode(true).firstElementChild;
                cartItemEl.querySelector('p').textContent = item.name;
                cartItemEl.querySelector('[data-price]').textContent = `R$${item.price.toFixed(2)}`;
                const quantityInput = cartItemEl.querySelector('input');
                quantityInput.value = item.quantity;
                quantityInput.max = item.stock; // El stock del producto original
                quantityInput.dataset.itemId = item.id;
                cartItemEl.querySelector('[data-action="remove"]').dataset.itemId = item.id;
                cartItemsContainer.appendChild(cartItemEl);
            });
        }
        updateTotals();
    }
    
    // --- LÓGICA DE NEGOCIO ---
    function addToCart(productId) {
        const product = allProducts.find(p => p.id === productId);
        if (!product) return;

        const existingCartItem = cart.find(item => item.id === productId);

        if (existingCartItem) {
            if (existingCartItem.quantity < product.stock) {
                existingCartItem.quantity++;
            } else {
                alert('No hay más stock disponible para este producto.');
            }
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        renderCart();
    }
    
    function updateCartItemQuantity(productId, newQuantity) {
        const cartItem = cart.find(item => item.id === productId);
        const product = allProducts.find(p => p.id === productId);
        if (!cartItem || !product) return;

        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else if (newQuantity > product.stock) {
            alert(`Stock máximo para ${product.name} es ${product.stock}.`);
            cartItem.quantity = product.stock;
            renderCart();
        } else {
            cartItem.quantity = newQuantity;
        }
        updateTotals();
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        renderCart();
    }

    function updateTotals() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryFee = parseFloat(deliveryFeeEl.value) || 0;
        const grandTotal = subtotal + deliveryFee;
        
        subtotalValueEl.textContent = `R$${subtotal.toFixed(2)}`;
        grandTotalValueEl.textContent = `R$${grandTotal.toFixed(2)}`;
    }

    async function finalizeSale() {
        const customerName = document.getElementById('customer-name').value.trim();
        if (cart.length === 0) {
            alert('El carrito está vacío.');
            return;
        }
        if (!customerName) {
            alert('El nombre del cliente es obligatorio.');
            return;
        }

        const isDelivery = deliveryTypeEl.value === 'delivery';
        const customerAddress = document.getElementById('customer-address').value.trim();
        if (isDelivery && !customerAddress) {
            alert('La dirección es obligatoria para los pedidos de delivery.');
            return;
        }

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryFee = parseFloat(deliveryFeeEl.value) || 0;
        
        const payload = {
            customer_name: customerName,
            customer_address: customerAddress,
            customer_phone: document.getElementById('customer-phone').value.trim(),
            total: subtotal + deliveryFee,
            payment_method: document.getElementById('payment-method').value,
            delivery_fee: deliveryFee,
            items: cart.map(item => ({
                id: item.id,
                quantity: item.quantity,
                price: item.price,
                costo: item.costo || 0
            }))
        };
        
        const headers = getAuthHeaders();
        if (!headers) return;
        
        finalizeButton.disabled = true;
        finalizeButton.innerHTML = '<i class="ph ph-spinner animate-spin"></i> Procesando...';

        try {
            // Se usa el endpoint de /orders que maneja la lógica de stock
            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: 'POST',
                headers,
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Ocurrió un error al crear el pedido.');
            }
            const result = await response.json();
            alert(`¡Éxito! Pedido #${result.order_id} creado correctamente.`);
            resetForm();

        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            finalizeButton.disabled = false;
            finalizeButton.innerHTML = '<i class="ph-bold ph-check-circle text-2xl"></i> Finalizar';
        }
    }

    function resetForm() {
        cart = [];
        document.getElementById('customer-name').value = '';
        document.getElementById('customer-address').value = '';
        document.getElementById('customer-phone').value = '';
        deliveryFeeEl.value = '0.00';
        renderCart();
        fetchProducts();
    }

    // --- EVENT LISTENERS ---
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = allProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            (p.brand && p.brand.toLowerCase().includes(searchTerm)) ||
            p.id.toString().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });
    
    productListContainer.addEventListener('click', (e) => {
        const card = e.target.closest('[data-product-id]');
        if (card) {
            addToCart(parseInt(card.dataset.productId));
        }
    });

    cartItemsContainer.addEventListener('change', (e) => {
        if (e.target.matches('input[type="number"]')) {
            const itemId = parseInt(e.target.dataset.itemId);
            const newQuantity = parseInt(e.target.value);
            updateCartItemQuantity(itemId, newQuantity);
        }
    });

    cartItemsContainer.addEventListener('click', (e) => {
        const button = e.target.closest('[data-action="remove"]');
        if (button) {
            removeFromCart(parseInt(button.dataset.itemId));
        }
    });
    
    deliveryFeeEl.addEventListener('input', updateTotals);
    deliveryTypeEl.addEventListener('change', (e) => {
        document.getElementById('customer-address').disabled = e.target.value !== 'delivery';
    });
    
    finalizeButton.addEventListener('click', finalizeSale);

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        window.location.href = 'index.html';
    });

    // --- INICIALIZACIÓN ---
    fetchProducts();
});
</script>
</body>
</html>
