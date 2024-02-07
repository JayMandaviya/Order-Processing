const { validationResult } = require("express-validator");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Tax = require("../models/taxModel");
const Discount = require("../models/discountModel");

function calculateTotalAmount(products) {
  let totalAmount = 0;
  products.forEach((product) => {
    const subtotal = product.basePrice * product.quantity;
    totalAmount += subtotal;
  });
  return totalAmount;
}

function calculateTaxAmount(state, totalAmount) {
  const taxRule = Tax.findOne({ state: state });
  if (taxRule) {
    return (totalAmount * taxRule.rate) / 100;
  } else {
    return 0;
  }
}

function calculateDiscountAmount(totalAmount) {
  let discountAmount = 0;
  const discountRule = Discount.find();
  for (const rule of discountRule) {
    if (totalAmount >= rule.minTotalAmount) {
      if (rule.type === "perentage") {
        discountAmount += (totalAmount * rule.value) / 100;
      } else if (rule.type === "flat") {
        discountAmount += rule.value;
      }
    }
  }
}

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.getOrderByID(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { productIds, state } = req.body;

    const totalAmount = calculateTotalAmount(productIds);
    const taxAmount = calculateTaxAmount(state, totalAmount);
    const discountAmount = calculateDiscountAmount(totalAmount);

    const orderId = await Order.createOrder(
      productIds,
      state,
      totalAmount,
      taxAmount,
      discountAmount
    );

    res.status(201).json({ id: orderId, ...req.body });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    await Order.updateOrder(req.params.id, req.body);
    res.json({ message: "Order Updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.deleteOrder(req.params.id);
    res.json({ message: "Order Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
