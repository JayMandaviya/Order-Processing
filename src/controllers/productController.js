const { validationResult } = require("express-validator");
const Product = require("../models/productModel");

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.getProductByID(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const productId = await Product.createProduct(req.body);
    res.status(201).json({ id: productId, ...req.body });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    await Product.updateProduct(req.params.id, req.body);
    res.json({ message: "Product Updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.deleteProduct(req.params.id);
    res.json({ message: "Product Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
