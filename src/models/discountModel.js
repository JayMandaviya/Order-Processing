const db = require("../config/db");

const Discount = {
  getAllDiscount: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM discount", (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  },

  getDiscountByID: (discountId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM discount WHERE id = ?",
        [discountId],
        (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          if (results.length === 0) {
            reject({ message: "Discount not found" });
            return;
          }
          resolve(results[0]);
        }
      );
    });
  },

  createDiscount: (discountData) => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO discount SET ?", discountData, (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.insertId);
      });
    });
  },

  updateDiscount: (discountId, discountData) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE discount SET ? WHERE id = ?",
        [discountData, discountId],
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

  deleteDiscount: (discountId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM discount WHERE id = ?",
        [discountId],
        (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(results);
        }
      );
    });
  },
};

module.exports = Discount;
