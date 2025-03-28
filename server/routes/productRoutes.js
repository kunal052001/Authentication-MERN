const express = require("express");
const router = express.Router();
const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    buyProduct,
    sellProduct
} = require("../controllers/productController");

// Maintaining the exact endpoints your frontend uses
router.post("/createproduct", createProduct);
router.get("/displayproduct", getProducts);
router.put("/updateproduct/:id", updateProduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.put("/buy/:id", buyProduct);
router.put("/sell/:id", sellProduct);

module.exports = router;