import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Store.css';
import AuthContext from '../context/AuthContext';

function Store({ products: initialProducts }) {
    const [products, setProducts] = useState(initialProducts || []);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        name: "",
        price: "",
        quantity: ""
    });
    const [stockAction, setStockAction] = useState({
        id: null,
        type: null,
        amount: 0
    });
    const { user } = useContext(AuthContext);

    useEffect(() => {
        setProducts(initialProducts || []);
    }, [initialProducts]);

    const handleStockAction = (id, type) => {
        setStockAction({
            id,
            type,
            amount: 0
        });
        setEditingId(null);
    };

    const handleStockAmountChange = (e) => {
        setStockAction(prev => ({
            ...prev,
            amount: Number(e.target.value)
        }));
    };

    const handleConfirmStockAction = async () => {
        const { id, type, amount } = stockAction;
        if (amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        try {
            const endpoint = type === 'buy' ? 'buy' : 'sell';
            const response = await axios.put(
                `http://localhost:5000/api/products/${endpoint}/${id}`, 
                { quantity: amount },
                { withCredentials: true }
            );
            
            setProducts(products.map(p => (p._id === id ? response.data : p)));
            setStockAction({ id: null, type: null, amount: 0 });
        } catch (err) {
            console.error(`Error ${type}ing stock:`, err);
            alert(err.response?.data?.message || `Error ${type}ing stock`);
        }
    };

    const handleCancelStockAction = () => {
        setStockAction({ id: null, type: null, amount: 0 });
    };

    const handleEdit = (product) => {
        setEditingId(product._id);
        setEditForm({
            name: product.name,
            price: product.price,
            quantity: product.quantity
        });
        setStockAction({ id: null, type: null, amount: 0 });
    };

    const handleUpdate = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/products/updateproduct/${id}`, 
                editForm,
                { withCredentials: true }
            );
            const updatedProducts = products.map(product => 
                product._id === id ? response.data : product
            );
            setProducts(updatedProducts);
            setEditingId(null);
        } catch (err) {
            console.error("Error updating product:", err);
            alert(err.response?.data?.message || "Failed to update product");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }
        
        try {
            await axios.delete(
                `http://localhost:5000/api/products/deleteproduct/${id}`,
                { withCredentials: true }
            );
            const filteredProducts = products.filter(product => product._id !== id);
            setProducts(filteredProducts);
        } catch (err) {
            console.error("Error deleting product:", err);
            alert("Failed to delete product");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="store-container">
            <h1>Store Inventory</h1>
            <div className="product-grid">
                {products.length === 0 ? (
                    <p className="no-products">No products available</p>
                ) : (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            {editingId === product._id ? (
                                <div className="edit-form">
                                    <input
                                        type="text"
                                        name="name"
                                        value={editForm.name}
                                        onChange={handleInputChange}
                                        placeholder="Product Name"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        value={editForm.price}
                                        onChange={handleInputChange}
                                        placeholder="Price"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={editForm.quantity}
                                        onChange={handleInputChange}
                                        placeholder="Quantity"
                                        min="0"
                                        required
                                    />
                                    <div className="edit-buttons">
                                        <button onClick={() => handleUpdate(product._id)} className="save-btn">
                                            Save
                                        </button>
                                        <button onClick={() => setEditingId(null)} className="cancel-btn">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : stockAction.id === product._id ? (
                                <div className="stock-action-form">
                                    <h3>{stockAction.type === 'buy' ? 'Buy Stock' : 'Sell Stock'}</h3>
                                    <input
                                        type="number"
                                        value={stockAction.amount}
                                        onChange={handleStockAmountChange}
                                        placeholder="Amount"
                                        min="1"
                                        className="stock-input"
                                        required
                                    />
                                    <div className="stock-action-buttons">
                                        <button 
                                            onClick={handleConfirmStockAction}
                                            className={stockAction.type === 'buy' ? 'buy-btn' : 'sell-btn'}
                                        >
                                            Confirm {stockAction.type === 'buy' ? 'Buy' : 'Sell'}
                                        </button>
                                        <button 
                                            onClick={handleCancelStockAction}
                                            className="cancel-btn"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="product-header">
                                        <h3 className="product-name">{product.name}</h3>
                                        <div className="product-actions">
                                            <button onClick={() => handleEdit(product)} className="update-btn">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(product._id)} className="delete-btn">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    <div className="product-details">
                                        <p className="product-price">Price: ${product.price.toFixed(2)}</p>
                                        <p className="product-quantity">Quantity: {product.quantity}</p>
                                    </div>
                                    <div className="stock-controls">
                                        <div className="stock-actions">
                                            <button 
                                                onClick={() => handleStockAction(product._id, 'buy')} 
                                                className="buy-btn"
                                            >
                                                Buy Stock
                                            </button>
                                            <button 
                                                onClick={() => handleStockAction(product._id, 'sell')} 
                                                className="sell-btn"
                                            >
                                                Sell Stock
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Store;