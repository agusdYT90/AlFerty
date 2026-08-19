import { API_URL } from "./Config.js";

const API_ENDPOINT = `${API_URL}/products`;

// Obtener todos los productos
export async function getAllProducts() {
    const res = await fetch(API_ENDPOINT);
    return await res.json();
}

// Obtener producto por ID
export async function getProductById(id) {
    const res = await fetch(`${API_ENDPOINT}/${id}`);
    return await res.json();
}

// Crear producto
export async function createProduct(product) {
    const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });
    return await res.json();
}

// Actualizar producto
export async function updateProduct(id, product) {
    const res = await fetch(`${API_ENDPOINT}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });
    return await res.json();
}

// Eliminar producto
export async function deleteProduct(id) {
    const res = await fetch(`${API_ENDPOINT}/${id}`, {
        method: "DELETE"
    });
    return await res.json();
}
