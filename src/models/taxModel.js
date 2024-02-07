const db = require("../config/db");

const Tax = {
  getAllTax: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM tax", (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  },

  getTaxByID: (taxId) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM tax WHERE id = ?", [taxId], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        if (results.length === 0) {
          reject({ message: "Tax not found" });
          return;
        }
        resolve(results[0]);
      });
    });
  },

  createTax: (taxData) => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO tax SET ?", taxData, (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.insertId);
      });
    });
  },

  updateTax: (taxId, taxData) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE tax SET ? WHERE id = ?",
        [taxData, taxId],
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

  deleteTax: (taxId) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM tax WHERE id = ?", [taxId], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  },
};

module.exports = Tax;
