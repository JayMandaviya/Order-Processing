const express = require("express");
const router = express.Router();
const discountController = require("../controllers/discountController");
const authRoutes = require("./authRoute");
const { check } = require("express-validator");
const authenticationUser = require("../middleware/authMiddleware");

router.use(authRoutes);

const validateDiscount = [
  check("type").notEmpty().withMessage("Type is required"),
  check("value")
    .notEmpty()
    .withMessage("Value is required")
    .isNumeric()
    .withMessage("Value must be a number"),
];

router.get("/discount", authenticationUser, discountController.getAllDiscount);
router.get(
  "/discount/:id",
  authenticationUser,
  discountController.getDiscountById
);
router.post(
  "/discount",
  authenticationUser,
  validateDiscount,
  discountController.createDiscount
);
router.put(
  "/discount/:id",
  authenticationUser,
  validateDiscount,
  discountController.updateDiscount
);
router.delete(
  "/discount/:id",
  authenticationUser,
  discountController.deleteDiscount
);

module.exports = router;
