import { Order } from './models/Order';

const SERVER_URL = 'http://localhost:3001/api/';


/**
 * A utility function for parsing the HTTP response.
 */
function getJson(httpResponsePromise) {
  // server API always return JSON, in case of error the format is the following { error: <message> } 
  return new Promise((resolve, reject) => {
    httpResponsePromise
      .then((response) => {
        if (response.ok) {

         // the server always returns a JSON, even empty {}. Never null or non json, otherwise the method will fail
         response.json()
            .then( json => resolve(json) )
            .catch( err => reject({ error: "Cannot parse server response" }))

        } else {
          // analyzing the cause of error
          response.json()
            .then(obj => 
              reject(obj)
              ) // error msg in the response body
            .catch(err => reject({ error: "Cannot parse server response" })) // something else
        }
      })
      .catch(err => 
        reject({ error: "Cannot communicate"  })
      ) // connection error
  });
}

/**
 * Getting from the server side and returning the list of orders.
 * The list of orders could be filtered in the server-side through the optional parameter: filter.
 */
const getOrders = async (filter) => {
  // order.watchDate could be null or a string in the format YYYY-MM-DD
  return getJson(
    filter 
      ? fetch(SERVER_URL + 'orders?filter=' + filter, { credentials: 'include' })
      : fetch(SERVER_URL + 'orders', { credentials: 'include' })
  ).then( json => {
    return json.map((order) => new Order(order))
  })
}


/** 
 * Getting and returning the definition of the filters from the server-side.
 * This functionality was not requested in the requirements but allows to dinamically change the filters without modifying the front-end.
 */ 
const getFilters = async () => {
  return getJson(
    fetch(SERVER_URL + 'filters', { credentials: 'include' })
  ).then( json => {
    return json;
  })
}

async function checkProteinsDetails (orderId) {
  const json = await getJson(fetch(SERVER_URL + "order_protein/?id=" + orderId));
  return json;
}

async function checkIngredientsDetails (orderId) {
  const json = await getJson(fetch(SERVER_URL + "order_ingredient/?id=" + orderId));
  return json;
}

/**
 * Getting and returing a order, specifying its orderId.
 */
const getOrder = async (orderId) => {
  return getJson( fetch(SERVER_URL + 'orders/' + orderId, { credentials: 'include' }))
    .then( order => new Order(order) )
}

 function updateAvailability(type, quantity){
  return getJson(
    fetch(SERVER_URL + "update-availability/?a=" + type + "&b=" + quantity, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      // credentials: 'include',
      // body: JSON.stringify(type, quantity) 
    })
  )
 }

/**
 * This function wants a order object as parameter. If the orderId exists, it updates the order in the server side.
 */
function updateOrder(order) {
  return getJson(
    fetch(SERVER_URL + "orders/" + order.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(order) // dayjs date is serialized correctly by the .toJSON method override
    })
  )
}

function insertOrderType(id, typeId) {
  return getJson(
    fetch(SERVER_URL + "order_types/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ orderId: id, typeId }) 
    })
  )
}

function insertOrderProtein(id, proteinId) {
  return getJson(
    fetch(SERVER_URL + "order_proteins/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ orderId: id, proteinId }) 
    })
  )
}

function insertOrderIngredient(id, ingredientId) {
  return getJson(
    fetch(SERVER_URL + "order_ingredients/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ orderId: id, ingredientId }) 
    })
  )
}

/**
 * This funciton adds a new order in the back-end library.
 */
function addOrder(order) {
  return getJson(
    fetch(SERVER_URL + "orders/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(order) 
    })
  )
}

/**
 * This function deletes a order from the back-end library.
 */
function deleteOrder(order) {
  return getJson(
    fetch(SERVER_URL + "orders/" + order.id, {
      method: 'DELETE',
      credentials: 'include'
    })
  )
}

/**
 * This function wants username and password inside a "credentials" object.
 * It executes the log-in.
 */
const logIn = async (credentials) => {
  return getJson(fetch(SERVER_URL + 'sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  })
  )
};

/**
 * This function is used to verify if the user is still logged-in.
 * It returns a JSON object with the user info.
 */
const getUserInfo = async () => {
  return getJson(fetch(SERVER_URL + 'sessions/current', {
    credentials: 'include',
  })
  )
};

/**
 * This function destroy the current user's session and execute the log-out.
 */
const logOut = async() => {
  return getJson(fetch(SERVER_URL + 'sessions/current', {
    method: 'DELETE',
    credentials: 'include'
  })
  )
}


const API = {logIn, getUserInfo, logOut, getOrders, updateOrder, deleteOrder, addOrder, getOrder, getFilters, insertOrderType, insertOrderIngredient, insertOrderProtein, checkProteinsDetails, checkIngredientsDetails, updateAvailability};
export default API;
