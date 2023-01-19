
## Instructions

In the `client` directory, do **NOT** create a new folder for the project, i.e., `client` should directly contain the `public` and `src` folders and the `package.json` files coming from BigLab1.

When committing on this repository, please, do **NOT** commit the `node_modules` directory, so that it is not pushed to GitHub.
This should be already automatically excluded from the `.gitignore` file, but double-check.

When another member of the team pulls the updated project from the repository, remember to run `npm install` in the project directory to recreate all the Node.js dependencies locally, in the `node_modules` folder.
Remember that `npm install` should be executed inside the `client` and `server` folders (not in the `BigLab2` root directory).

Finally, remember to add the `final` tag for the final submission, otherwise it will not be graded.

## Registered Users

| email | password | name |
|-------|----------|------|
| john.doe@polito.it | password | John |
| mario.rossi@polito.it | password | Mario |
| testuser@polito.it | password | Testuser |

## List of APIs offered by the server

Provide a short description for API with the required parameters, follow the proposed structure.

* [HTTP Method] [URL, with any parameter]
* [One-line about what this API is doing]
* [Sample request, with body (if any)]
* [Sample response, with body (if any)]
* [Error responses, if any]

### Order management

#### Get all films

* HTTP method: `GET`  URL: `/api/orders`
* Description: Get the full list of orders and belong to the logged user
* Request body: _None_
* Request query parameter: _None_
* Response: `200 OK` (success)
* Response body: Array of objects, each describing one order:

``` json
[
  {
    "id": 1,
    "bowls": 2,
    "proteins": 2,
    "ingredients": 4,
    "price": 22,
    "user": 1
  },
  {
    "id": 2,
    "bowls": 3,
    "proteins": 2,
    "ingredients": 3,
    "price": 42,
    "user": 3
  },
  ...
]
```

* Error responses:  `500 Internal Server Error` (generic error)

#### Get order by id

* HTTP method: `GET`  URL: `/api/orders/:id`
* Description: Get the order corresponding to the id (if it belongs to the current logged user)
* Request body: _None_
* Response: `200 OK` (success)
* Response body: One object describing the required film:

``` JSON
[
  {
    "id": 1,
    "bowls": 2,
    "proteins": 2,
    "ingredients": 4,
    "price": 22,
    "user": 1
  }
]
```

* Error responses:  `500 Internal Server Error` (generic error), `404 Not Found` (not present or unavailable)



#### Add a new order

* HTTP method: `POST`  URL: `/api/orders`
* Description: Add a new order to the orders of the logged user
* Request body: description of the object to add (user propery, if present, is ignored and substituted with the id of the logged user, id generated in database)

``` JSON
{
    "bowls": 2,
    "proteins": 2,
    "ingredients": 4,
    "price": 22,
    "user": 1
}
```

* Response: `200 OK` (success)
* Response body: the object as represented in the database

* Error responses:  `422 Unprocessable Entity` (values do not satisfy validators), `503 Service Unavailable` (database error)

#### Check availability 

* HTTP method: `GET`  URL: `/api/check-availability`
* Description: Get the availability of the type specified inside order 
* Request body: bowl type and quantity
* Response: `200 OK` (success)
* Response body: the quantity available

``` JSON
[
  {
    "quantity": 6,
  }
]
```

* Error responses:  `500 Internal Server Error` (generic error), `404 Not Found` (not present or unavailable)

#### Update availability 

* HTTP method: `GET`  URL: `/api/update-availability`
* Description: Get the availability updated of the type specified inside order 
* Request body: bowl type and quantity
* Response: `200 OK` (success)
* Response body: status "success"

``` JSON
[
  {
    "status": "success",
  }
]
```

* Error responses:  `500 Internal Server Error` (generic error), `404 Not Found` (not present or unavailable)

#### Retrieve type, proteins and ingredients of the past orders (of the user logged in) 

* HTTP method: `GET`  URL: `/api/order_type` `/api/order_protein` `/api/order_ingredient`
* Description: Get the details of the order specified
* Request body: order id
* Response: `200 OK` (success)
* Response body: type, proteins list and ingredient list

``` JSON
[
  {
    "type": 2,
  }
]
[
  {
    "proteins": [4,5],
  }
]
[
  {
    "ingredients": [9,11,15],
  }
]
```

* Error responses:  `500 Internal Server Error` (generic error), `404 Not Found` (not present or unavailable)

#### Post in database tables type, proteins and ingredients of the order submitted (of the user logged in) 

* HTTP method: `POST`  URL: `/api/order_types` `/api/order_proteins` `/api/order_ingredients`
* Description: Post the details of the order specified
* Request body: order id and respectively type, proteins list, ingredient list
* Response: `200 OK` (success)
* Response body: status "success"

``` JSON
[
  {
    "status": "success",
  }
]
```

* Error responses:  `500 Internal Server Error` (generic error), `404 Not Found` (not present or unavailable)

#### Delete an existing order (not requested, just useful)

* HTTP method: `DELETE`  URL: `/api/orders/:id`
* Description: Delete an existing order of the logged user
* Request body: _None_

* Response: `200 OK` (success)
* Response body: an empty object

* Error responses:  `503 Service Unavailable` (database error)


### User management

#### Login

* HTTP method: `POST`  URL: `/api/sessions`
* Description: authenticate the user who is trying to login
* Request body: credentials of the user who is trying to login

``` JSON
{
    "username": "username",
    "password": "password"
}
```

* Response: `200 OK` (success)
* Response body: authenticated user

``` JSON
{
    "id": 1,
    "username": "john.doe@polito.it", 
    "name": "John"
}
```
* Error responses:  `500 Internal Server Error` (generic error), `401 Unauthorized User` (login failed)


#### Check if user is logged in

* HTTP method: `GET`  URL: `/api/sessions/current`
* Description: check if current user is logged in and get her data
* Request body: _None_
* Response: `200 OK` (success)

* Response body: authenticated user

``` JSON
{
    "id": 1,
    "username": "john.doe@polito.it", 
    "name": "John"
}
```

* Error responses:  `500 Internal Server Error` (generic error), `401 Unauthorized User` (user is not logged in)


#### Logout

* HTTP method: `DELETE`  URL: `/api/sessions/current`
* Description: logout current user
* Request body: _None_
* Response: `200 OK` (success)

* Response body: _None_

* Error responses:  `500 Internal Server Error` (generic error), `401 Unauthorized User` (user is not logged in)

#### React components routes

"/login" -> homepage layout with menu options and login form

"/" -> pastOrders layout with list of past orders of logged user 

"/add" -> addLayout with order form

"*" -> NotFoundLayout

#### Database tables:

users -> for users data ( name, email, hashed password, salt, id )
orders -> for orders submitted data ( id, bowls num, proteins num, ingredients num, price, user id)
bowls_details -> for storing bowls options ( id, name, price)
proteins -> for storing proteins options ( id, name)
ingredients -> for storing ingredients options ( id, name)
order_type -> for storing bowl type of each order ( better implementation would have been to save it directly in class order) 
order_protein -> for storing multiple proteins correlated to single order id ( one to many relationship )
order_ingredient -> for storing multiple ingredients correlated to single order id ( one to many relationship )
