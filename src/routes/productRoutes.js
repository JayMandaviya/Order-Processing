const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authRoutes = require("./authRoute");
const { check } = require("express-validator");
const authenticationUser = require("../middleware/authMiddleware");

router.use(authRoutes);

const validateProduct = [
  check("name").notEmpty().withMessage("Name is required"),
  check("description").notEmpty().withMessage("Description is required"),
  check("basePrice")
    .notEmpty()
    .withMessage("Baseprice is required")
    .isNumeric()
    .withMessage("Base price must be a number"),
];

router.get("/products", authenticationUser, productController.getAllProducts);
router.get(
  "/products/:id",
  authenticationUser,
  productController.getProductById
);
router.post(
  "/products",
  authenticationUser,
  validateProduct,
  productController.createProduct
);
router.put(
  "/products/:id",
  authenticationUser,
  validateProduct,
  productController.updateProduct
);
router.delete(
  "/products/:id",
  authenticationUser,
  productController.deleteProduct
);

module.exports = router;
