import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Store.css';

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
    type: null, // 'buy' or 'sell'
    amount: 0
  });

  useEffect(() => {
    setProducts(initialProducts || []);
  }, [initialProducts]);

  const handleStockAction = (id, type) => {
    setStockAction({
      id,
      type,
      amount: 0
    });
    setEditingId(null); // Ensure edit mode is closed
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
      const response = await axios.put(`http://localhost:5000/${endpoint}/${id}`, { 
        quantity: amount 
      });
      
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
    setStockAction({ id: null, type: null, amount: 0 }); // Ensure stock action is closed
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/updateproduct/${id}`, editForm);
      const updatedProducts = products.map(product => 
        product._id === id ? response.data : product
      );
      setProducts(updatedProducts);
      setEditingId(null);
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteproduct/${id}`);
      const filteredProducts = products.filter(product => product._id !== id);
      setProducts(filteredProducts);
    } catch (err) {
      console.error("Error deleting product:", err);
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
                  />
                  <input
                    type="number"
                    name="price"
                    value={editForm.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                  />
                  <input
                    type="number"
                    name="quantity"
                    value={editForm.quantity}
                    onChange={handleInputChange}
                    placeholder="Quantity"
                  />
                  <div className="edit-buttons">
                    <button onClick={() => handleUpdate(product._id)} className="save-btn">Save</button>
                    <button onClick={() => setEditingId(null)} className="cancel-btn">Cancel</button>
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
                      <button onClick={() => handleEdit(product)} className="update-btn">Edit</button>
                      <button onClick={() => handleDelete(product._id)} className="delete-btn">Delete</button>
                    </div>
                  </div>
                  <div className="product-details">
                    <p className="product-price">Price: ${product.price}</p>
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