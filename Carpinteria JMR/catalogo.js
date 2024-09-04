import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBofV75tElxXDfjAfOP74MNPjAEJqvcTIE",
    authDomain: "catalgocarpinteria.firebaseapp.com",
    projectId: "catalgocarpinteria",
    storageBucket: "catalgocarpinteria.appspot.com",
    messagingSenderId: "382600614317",
    appId: "1:382600614317:web:3e0341352f85fc74bb1124",
    measurementId: "G-QL7JSZJ8TK"
};

// Función para cargar productos y renderizarlos
async function loadAndRenderProducts() {
    try {
        // Obtén los productos de Firebase
        const querySnapshot = await getDocs(collection(db, 'productos'));
        products = []; // Limpiar la lista de productos

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            products.push({
                id: doc.id, // Guarda el ID del documento
                name: data.nombre,
                price: data.precio,
                image: data.imageUrl || 'https://via.placeholder.com/150' // Imagen por defecto si no hay URL
            });
        });

        // Renderiza los productos en el catálogo
        renderProducts(products);
    } catch (e) {
        console.error('Error al cargar los productos: ', e);
    }
}

// Función para renderizar los productos
function renderProducts(productsList) {
    const catalog = document.getElementById('catalog');
    catalog.innerHTML = ''; // Limpiar catálogo

    productsList.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // Formateo del precio
        const formattedPrice = new Intl.NumberFormat('es-GT', {
            style: 'currency',
            currency: 'GTQ'
        }).format(product.price);

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: auto; max-width: 150px; max-height: 100px;">
            <h3>${product.name}</h3>
            <p>Precio: ${formattedPrice}</p>
            <button onclick="deleteProduct('${product.id}')">Me interesa</button>
        `;

        catalog.appendChild(productCard);
    });
}

// Función para filtrar productos
function filterProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchInput)
    );
    renderProducts(filteredProducts);
}

// Evento para la búsqueda
document.getElementById('searchInput').addEventListener('input', filterProducts);

// Inicializar carga y renderizado de productos
loadAndRenderProducts();