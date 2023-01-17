
/**
 * Constructor function for new Order objects
 * @param {string} id unique ID of the order in input
 * @param {number} bowls 
 * @param {number} proteins 
 * @param {number} ingredients 
 * @param {number} price 
 * @param {number} user the id of the user who belong the order
*/

function Order({ id, bowls, proteins, ingredients, price, user } = {}) {
    this.id = id;
    this.bowls = bowls;
    this.proteins = proteins;
    this.ingredients = ingredients;
    this.price = price;
    this.user = user;

}

export { Order }