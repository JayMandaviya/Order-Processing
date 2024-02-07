const db = require("../config/db");

const Order = {
  getAllOrders: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM orders", (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  },

  getOrderByID: (orderId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM orders WHERE id = ?",
        [orderId],
        (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          if (results.length === 0) {
            reject({ message: "Order not found" });
            return;
          }
          resolve(results[0]);
        }
      );
    });
  },

  createOrder: (productIds, state, totalAmount, taxAmount, discountAmount) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO orders SET productIds = ?, state = ?, totalAmount = ?, taxAMount = ?, discountAmount = ?",
        productIds,
        state,
        totalAmount,
        taxAmount,
        discountAmount,
        (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(results.insertId);
        }
      );
    });
  },

  updateOrder: (orderId, orderData) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE orders SET ? WHERE id = ?",
        [orderData, orderId],
        (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        }
      );
    });
  },

  deleteOrder: (orderId) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM orders WHERE id = ?", [orderId], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  },
};

module.exports = Order;
