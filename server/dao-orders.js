'use strict';

const db = require('./db');
const dayjs = require("dayjs");
let generatedID = 0;

const filters = {
  'filter-past_orders': { label: 'Past orders', id: 'filter-past_orders', filterFn: () => true },
  'filter-bowls': { label: 'Bowls', id: 'filter-bowls', filterFn: order => order.bowls > 1 },
  'filter-proteins': { label: 'Proteins', id: 'filter-proteins', filterFn: order => order.proteins > 1 },
  'filter-ingredients': { label: 'Ingredients', id: 'filter-ingredients', filterFn: order => order.ingredients > 1 },
  'filter-prices': { label: 'Prices', id: 'filter-prices', filterFn: order => order.price > 10 },
};


exports.listFilters = () => {
  return filters;
}

// This function retrieves the whole list of orders from the database.
exports.listOrders = (user, filter) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM orders WHERE user=?';
    db.all(sql, [user], (err, rows) => {
      if (err) { reject(err); return; }

      const orders = rows.map((e) => {
        // WARN: the database returns only lowercase fields. So, to be compliant with the client-side, we convert "watchdate" to the camelCase version ("watchDate").
        const order = Object.assign({}, e, { watchDate: dayjs(e.watchdate) });  // adding camelcase "watchDate"
        delete order.watchdate;  // da cancellare probabilmente
        return order;
      });

      // WARN: if implemented as if(filters[filter]) returns true also for filter = 'constructor' but then .filterFn does not exists
      if (filters.hasOwnProperty(filter))
        resolve(orders.filter(filters[filter].filterFn));
      else resolve(orders);
    });
  });
};

exports.updateBowlAvailability = (a, b) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE bowls_details SET availability = ? WHERE id = ?';
    db.run(sql, [b, a], (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ status: 'success' });
    });
  });
};

exports.checkBowlAvailability = (bowlType) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT availability FROM bowls_details WHERE id=?';
    db.get(sql, [bowlType], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        resolve({ error: 'No bowls found for the specified type.' });
      } else {
        resolve({ status: 'success', availability: row.availability });
      }
    });
  });
};

exports.searchProteinsDetails = (detailsId) => {
  return new Promise((resolve, reject) => {
    //const sql = 'SELECT * FROM order_protein WHERE orderID = ?';
    const sql = 'SELECT proteinID FROM order_protein WHERE orderID = ?';
    db.all(sql, [detailsId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      if (!rows) {
        resolve({ error: 'No protein details found.' });
      } else {
        //const vectorP = rows.map(row => row.proteinId);
        resolve({ status: 'success', vectorP: rows.map(o => o.proteinID) });
      }
    });
  });
};

exports.searchIngredientsDetails = (detailsId) => {
  return new Promise((resolve, reject) => {
    //const sql = 'SELECT * FROM order_ingredient WHERE orderID = ?';
    const sql = 'SELECT ingredientID FROM order_ingredient WHERE orderID = ?';
    db.all(sql, [detailsId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      if (!rows) {
        resolve({ error: 'No ingredient details found.' });
      } else {
        //const vectorI = rows.map(row => row.ingredientID);
        resolve({ status: 'success', vectorI: rows.map(o => o.ingredientID) });
      }
    });
  });
};

// This function retrieves a film given its id and the associated user id.
exports.getOrder = (user, id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM orders WHERE id=? and user=?';
    db.get(sql, [id, user], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        resolve({ error: 'Order not found.' });
      } else {
        // WARN: database is case insensitive. Converting "watchDate" to camel case format
        const order = Object.assign({}, row, { watchDate: row.watchdate });  // da cancellare probabilmente
        delete order.watchdate;  // da cancellare probabilmente
        resolve(order);
      }
    });
  });
};


/**
 * This function adds a new film in the database.
 * The film id is added automatically by the DB, and it is returned as this.lastID.
 */
exports.insertOrderProtein = (order, proteinId) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO order_protein (orderID, proteinID) VALUES (?, ?)`;
    proteinId.forEach(element => {
      db.run(sql, [order, element], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve({ status: 'success' });
      });
    });
  });
};

exports.insertOrderIngredient = (order, ingredientId) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO order_ingredient (orderID, ingredientID) VALUES (?, ?)`;
    ingredientId.forEach(element => {
      db.run(sql, [order, element], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve({ status: 'success' });
      });
    })
  });
};

exports.createOrder = (order) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO orders (bowls, proteins, ingredients, price, user) VALUES(?, ?, ?, ?, ?)';
    db.run(sql, [order.bowls, order.proteins, order.ingredients, order.price, order.user], function (err) {
      if (err) {
        reject(err);
        return ;
      }
      // Returning the newly created object with the DB additional properties to the client.
      generatedID = this.lastID;
      resolve(exports.getOrder(order.user, this.lastID));
    });
  });
};

// This function updates an existing order given its id and the new properties.
exports.updateOrder = (user, id, order) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE orders SET bowls = ?, proteins = ?, ingredients = ?, price = ? WHERE id = ? and user = ?';
    db.run(sql, [order.bowls, order.proteins, order.ingredients, order.price, id, user], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(exports.getOrder(order.user, id));
    });
  });
};

// This function deletes an existing film given its id.
exports.deleteOrder = (user, id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM orders WHERE id = ? and user = ?';
    db.run(sql, [id, user], (err) => {
      if (err) {
        reject(err);
        return;
      } else
        resolve(null);
    });
  });
}
