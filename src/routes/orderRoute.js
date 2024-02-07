const express = require("express");
const router = express.Router();
const orderCOntroller = require("../controllers/orderController");
const authRoutes = require("./authRoute");
const { check } = require("express-validator");
const authenticationUser = require("../middleware/authMiddleware");

router.use(authRoutes);

const validateOrder = [
  check("productIds").notEmpty().withMessage("ProductIds is required"),
  check("state").notEmpty().withMessage("Rate is required"),
];

router.get("/order", authenticationUser, orderCOntroller.getAllOrders);
router.get("/order/:id", authenticationUser, orderCOntroller.getOrderById);
router.post(
  "/order",
  authenticationUser,
  validateOrder,
  orderCOntroller.createOrder
);
router.put(
  "/order/:id",
  authenticationUser,
  validateOrder,
  orderCOntroller.updateOrder
);
router.delete("/order/:id", authenticationUser, orderCOntroller.deleteOrder);

module.exports = router;
