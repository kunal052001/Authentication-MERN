import React from 'react'


function Store({product}) {
  return (
    <div>
      displayproduct.
             <ul> {product.map(val,index)=>(
                <li key={index}>{val} </li>
              )}
              </ul>
</div>
  )
}

export default Store
// import React, { useState, useEffect } from "react";

// function Store({ products, updateProduct, deleteProduct }) {
//   const [editingId, setEditingId] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [editPrice, setEditPrice] = useState("");
//   const [editQuantity, setEditQuantity] = useState("");

//   useEffect(() => {
//     console.log("Products in Store:", products);
//   }, [products]);

//   const handleEdit = (product) => {
//     setEditingId(product._id);
//     setEditName(product.name);
//     setEditQuantity(product.quantity);
//     setEditPrice(product.price);
//   };

//   const handleUpdate = (id) => {
//     updateProduct(id, { name: editName, price: editPrice, quantity: editQuantity });
//     setEditingId(null);
//   };

//   return (
//     <div className="store-container">
//       <h1>Store</h1>
//       <ul>
//         {products.length === 0 ? (
//           <p>No products available</p>
//         ) : (
//           products.map((product) => (
//             <li key={product._id}>
//               {editingId === product._id ? (
//                 <>
//                   <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Edit Product Name" />
//                   <input type="text" value={editQuantity} onChange={(e) => setEditQuantity(e.target.value)} placeholder="Edit Quantity" />
//                   <input type="text" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} placeholder="Edit Price" />
//                   <button onClick={() => handleUpdate(product._id)}>Save</button>
//                   <button onClick={() => setEditingId(null)}>Cancel</button>
//                 </>
//               ) : (
//                 <>
//                   <div className="card-list">
//                     <div>{product.name}</div>
//                     <span>
//                       <button onClick={() => deleteProduct(product._id)}>DELETE</button>
//                       <button onClick={() => handleEdit(product)}>UPDATE</button>
//                     </span>
//                   </div>
//                   <div>
//                     <div>Price: {product.price}</div>
//                     <div>
//                       <button>BUY STOCK</button>
//                       <button>SELL STOCK</button>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// }

// export default Store;
