const { validationResult } = require("express-validator");
const Tax = require("../models/taxModel");

// exports.handleValidationErrors = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };

exports.getAllTax = async (req, res) => {
  try {
    const tax = await Tax.getAllTax();
    res.json(tax);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTaxById = async (req, res) => {
  try {
    const tax = await Tax.getTaxByID(req.params.id);
    res.json(tax);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.createTax = async (req, res) => {
  try {
    const taxId = await Tax.createTax(req.body);
    res.status(201).json({ id: taxId, ...req.body });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTax = async (req, res) => {
  try {
    await Tax.updateTax(req.params.id, req.body);
    res.json({ message: "Tax Updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTax = async (req, res) => {
  try {
    await Tax.deleteTax(req.params.id);
    res.json({ message: "Tax Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
