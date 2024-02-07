const {
  calculateTotalAmount,
  calculateTaxAmount,
  calculateDiscountAmount,
} = require("../controllers/orderController");

describe("Order price calculations", () => {
  test("calculateTotalAmount", () => {
    const products = [
      { basePrice: 10, quantity: 2 },
      { basePrice: 20, quantity: 3 },
    ];
    const totalAmount = calculateTotalAmount(products);
    expect(totalAmount).toBe(80);
  });

  test("calculateTotalAmount", () => {
    const state = "gujarat";
    const totalAmount = 80;
    const taxAmount = calculateTaxAmount(state, totalAmount);
    expect(totalAmount).toBe(8);
  });

  test("calculateTotalAmount", () => {
    const totalAmount = 80;
    const discountAmount = calculateDiscountAmount(totalAmount);
    expect(totalAmount).toBe(8);
  });
});
