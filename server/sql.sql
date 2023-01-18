
-- DROP TABLE bowls_prices;
-- DROP TABLE user_orders;
-- DROP TABLE orders_list;
-- DROP TABLE proteins;
-- DROP TABLE ingredients;
-- DROP TABLE order_protein;
-- DROP TABLE order_ingredient;

-- UPDATE bowls_details SET availability = 10 WHERE id = 1;
-- UPDATE bowls_details SET availability = 8 WHERE id = 2;
-- UPDATE bowls_details SET availability = 6 WHERE id = 3;

-- CREATE TABLE bowls_details (id INTEGER NOT NULL PRIMARY KEY, bowlType TEXT NOT NULL, price INTEGER NOT NULL, availability INTEGER NOT NULL);
-- CREATE TABLE user_orders (userID INTEGER NOT NULL, orderID INTEGER NOT NULL PRIMARY KEY);
-- CREATE TABLE proteins (proteinID INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL);
-- CREATE TABLE ingredients (ingredientID INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL);
-- CREATE TABLE order_protein (orderID INTEGER NOT NULL, proteinID INTEGER NOT NULL);
-- CREATE TABLE order_ingredient (orderID INTEGER NOT NULL, ingredientID INTEGER NOT NULL);
-- CREATE TABLE orders (id INTEGER NOT NULL PRIMARY KEY, bowls INTEGER NOT NULL, proteins INTEGER NOT NULL, ingredients INTEGER NOT NULL, price FLOAT NOT NULL, user INTEGER NOT NULL);
-- CREATE TABLE users (id INTEGER NOT NULL PRIMARY KEY, email TEXT NOT NULL, name TEXT NOT NULL, hash TEXT NOT NULL, salt TEXT NOT NULL);
-- CREATE TABLE orders_list(id INTEGER NOT NULL PRIMARY KEY, type TEXT NOT NULL, bowls INTEGER NOT NULL, proteins INTEGER NOT NULL, ingredients INTEGER NOT NULL, price FLOAT NOT NULL, user INTEGER NOT NULL, proteinslist JSON NOT NULL, ingredientslist JSON NOT NULL);

-- control + k + c = per commentare intero blocco
-- control + k + u = per decommentare intero blocco
-- control + shift + p + > + invio = per eseguire query

-- INSERT INTO proteins (proteinID, name) VALUES ("4", "tuna");
-- INSERT INTO proteins (proteinID, name) VALUES ("5", "chicken");
-- INSERT INTO proteins (proteinID, name) VALUES ("6", "salmon");
-- INSERT INTO proteins (proteinID, name) VALUES ("7", "tofu");
-- INSERT INTO ingredients (ingredientID, name) VALUES ("8", "avocado");
-- INSERT INTO ingredients (ingredientID, name) VALUES ("9", "ananas");
-- INSERT INTO ingredients (ingredientID, name) VALUES ("10", "cashew nuts");
-- INSERT INTO ingredients (ingredientID, name) VALUES ("11", "kale");
-- INSERT INTO ingredients (ingredientID, name) VALUES ("12", "mango");
-- INSERT INTO ingredients (ingredientID, name) VALUES ("13", "peppers");
-- INSERT INTO ingredients (ingredientID, name) VALUES ("14", "corn");
-- INSERT INTO ingredients (ingredientID, name) VALUES ("15", "wakame");
-- INSERT INTO ingredients (ingredientID, name) VALUES ("16", "tomatoes");
-- INSERT INTO ingredients (ingredientID, name) VALUES ("17", "carrots");
-- INSERT INTO ingredients (ingredientID, name) VALUES ("18", "salad");
-- INSERT INTO orders_list(id, type, bowls, proteins, ingredients, price, user, proteinslist, ingredientslist) VALUES ("1", "regular", 2, 3, 3, 21.6, 1, '[4, 5, 7]', '[8, 14, 16]'); 
-- INSERT INTO orders_list(id, type, bowls, proteins, ingredients, price, user, proteinslist, ingredientslist) VALUES ("2", "medium", 3, 4, 3, 46.2, 1, '[4, 5, 6, 7]', '[9, 10, 12]'); 
-- INSERT INTO orders_list(id, type, bowls, proteins, ingredients, price, user, proteinslist, ingredientslist) VALUES ("3", "large", 1, 5, 3, 42, 2, '[4]', '[9, 11, 16, 17, 18]'); 
-- INSERT INTO orders_list(id, type, bowls, proteins, ingredients, price, user, proteinslist, ingredientslist) VALUES ("4", "regular", 2, 1, 3, 32.4, 3, '[6]', '[10, 13, 15]'); 
-- INSERT INTO bowls_details (id, bowlType, price, availability) VALUES ("1", "regular", 9, 10);
-- INSERT INTO bowls_details (id, bowlType, price, availability) VALUES ("2", "medium", 11, 8);
-- INSERT INTO bowls_details (id, bowlType, price, availability) VALUES ("3", "large", 14, 6);
-- INSERT INTO orders (id, bowls, proteins, ingredients, price, user) VALUES ("1", 2, 2, 4, 22.15, 1);
-- INSERT INTO orders (id, bowls, proteins, ingredients, price, user) VALUES ("2", 2, 2, 4, 22.99, 1);
-- INSERT INTO orders (id, bowls, proteins, ingredients, price, user) VALUES ("3", 1, 3, 6, 14.50, 2);
-- INSERT INTO orders (id, bowls, proteins, ingredients, price, user) VALUES ("4", 5, 1, 4, 45.40, 3);

-- INSERT INTO users (id, email, name, hash, salt) VALUES ("1", "john.doe@polito.it", "John", "e06a2f2073a3d66d1ca4fd6ce04c64fe684ea19c27660b05e2fbf7269ce9ff42", "72e4eeb14def3b21");
-- INSERT INTO users (id, email, name, hash, salt) VALUES ("2", "mario.rossi@polito.it", "Mario", "ac28edf49ba34ac83c17145375a030b4579ffddf3fe1dbb68f530bb3ca4ce514", "a8b618c717683608");
-- INSERT INTO users (id, email, name, hash, salt) VALUES ("3", "testuser@polito.it", "Testuser", "4af3cc8549ccc19af11b711cada4509c4e93c57cca34078c683498ed7bf64258", "e818f0647b4e1fe0");
-- all passwords are "password"