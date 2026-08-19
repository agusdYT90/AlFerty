// TestProducts.jsx
import React, { useState } from "react";
import {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct} from "../../Services/DB/Products.js";

export default function TestProducts() {
    const [output, setOutput] = useState("");

    const handleGetAll = async () => {
        const data = await getAllProducts();
        setOutput(JSON.stringify(data, null, 2));
    };

    const handleGetById = async () => {
        const data = await getProductById("123"); // prueba con un ID válido
        setOutput(JSON.stringify(data, null, 2));
    };

    const handleCreate = async () => {
        const nuevo = {
            id: "999",
            name: "Producto de prueba",
            price: 50,
            stock: 5,
            description: "Generado desde TestProducts.jsx"
        };
        const data = await createProduct(nuevo);
        setOutput(JSON.stringify(data, null, 2));
    };

    const handleUpdate = async () => {
        const actualizado = {
            name: "Producto actualizado",
            price: 75,
            stock: 8
        };
        const data = await updateProduct("999", actualizado);
        setOutput(JSON.stringify(data, null, 2));
    };

    const handleDelete = async () => {
        const data = await deleteProduct("999");
        setOutput(JSON.stringify(data, null, 2));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Prueba de funciones Products.js</h1>
            <button onClick={handleGetAll}>Obtener todos</button>
            <button onClick={handleGetById}>Obtener por ID</button>
            <button onClick={handleCreate}>Crear producto</button>
            <button onClick={handleUpdate}>Actualizar producto</button>
            <button onClick={handleDelete}>Eliminar producto</button>

            <h2>Resultado:</h2>
            <pre>{output}</pre>
        </div>
    );
}
