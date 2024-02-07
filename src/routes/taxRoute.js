const express = require("express");
const router = express.Router();
const taxController = require("../controllers/taxController");
const authRoutes = require("./authRoute");
const { check } = require("express-validator");
const authenticationUser = require("../middleware/authMiddleware");

router.use(authRoutes);

const validateTax = [
  check("state").notEmpty().withMessage("State is required"),
  check("rate")
    .notEmpty()
    .withMessage("Rate is required")
    .isNumeric()
    .withMessage("Rate must be a number"),
];

router.get("/tax", authenticationUser, taxController.getAllTax);
router.get("/tax/:id", authenticationUser, taxController.getTaxById);
router.post("/tax", authenticationUser, validateTax, taxController.createTax);
router.put(
  "/tax/:id",
  authenticationUser,
  validateTax,
  taxController.updateTax
);
router.delete("/tax/:id", authenticationUser, taxController.deleteTax);

module.exports = router;
