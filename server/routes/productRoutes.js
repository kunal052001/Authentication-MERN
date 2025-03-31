const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    buyProduct,
    sellProduct
} = require("../controllers/productController");

// Protected routes - require authentication
router.use(authMiddleware);

router.post("/createproduct", createProduct);
router.get("/displayproduct", getProducts);
router.put("/updateproduct/:id", updateProduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.put("/buy/:id", buyProduct);
router.put("/sell/:id", sellProduct);

module.exports = router;