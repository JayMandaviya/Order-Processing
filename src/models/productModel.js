const db = require("../config/db");

const Product = {
  getAllProducts: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM products", (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  },

  getProductByID: (productId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM products WHERE id = ?",
        [productId],
        (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          if (results.length === 0) {
            reject({ message: "Product not found" });
            return;
          }
          resolve(results[0]);
        }
      );
    });
  },

  createProduct: (productData) => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO products SET ?", productData, (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.insertId);
      });
    });
  },

  updateProduct: (productId, productData) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE products SET ? WHERE id = ?",
        [productData, productId],
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

  deleteProduct: (productId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM products WHERE id = ?",
        [productId],
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

module.exports = Product;
