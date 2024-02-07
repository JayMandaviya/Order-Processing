const { validationResult } = require("express-validator");
const Discount = require("../models/discountModel");

exports.getAllDiscount = async (req, res) => {
  try {
    const discount = await Discount.getAllDiscount();
    res.json(discount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDiscountById = async (req, res) => {
  try {
    const discount = await Discount.getDiscountByID(req.params.id);
    res.json(discount);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.createDiscount = async (req, res) => {
  try {
    const discountId = await Discount.createDiscount(req.body);
    res.status(201).json({ id: discountId, ...req.body });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateDiscount = async (req, res) => {
  try {
    await Discount.updateDiscount(req.params.id, req.body);
    res.json({ message: "Discount Updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteDiscount = async (req, res) => {
  try {
    await Discount.deleteDiscount(req.params.id);
    res.json({ message: "Discount Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
