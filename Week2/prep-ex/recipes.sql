CREATE TABLE Recipes (
  recipe_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  ingredients TEXT,
  steps TEXT
);
-- Create the Categories table
CREATE TABLE Categories (
  category_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255)
);
-- Create the RecipeCategories table
CREATE TABLE RecipeCategories (
  recipe_id INT,
  category_id INT,
  PRIMARY KEY (recipe_id, category_id),
  FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
  FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);
-- Inserting No-Bake Cheesecake
INSERT INTO Recipes (name, ingredients, steps)
VALUES (
    'No-Bake Cheesecake',
    '["Condensed milk", "Cream Cheese", "Lemon Juice", "Pie Crust", "Cherry Jam"]',
    '["Beat Cream Cheese", "Add condensed Milk and blend", "Add Lemon Juice and blend", "Add the mix to the pie crust", "Spread the Cherry Jam", "Place in refrigerator for 3h."]'
  );
-- Inserting Roasted Brussels Sprouts
INSERT INTO Recipes (name, ingredients, steps)
VALUES (
    'Roasted Brussels Sprouts',
    '["Brussels Sprouts", "Lemon juice", "Sesame seeds", "Pepper", "Salt", "Olive oil"]',
    '["Preheat the oven", "Mix the ingredients in a bowl", "Spread the mix on baking sheet", "Bake for 30'']'
  );
-- Inserting Mac & Cheese
INSERT INTO Recipes (name, ingredients, steps)
VALUES (
    'Mac & Cheese',
    '["Macaroni", "Butter", "Flour", "Salt", "Pepper", "Milk", "Shredded Cheddar cheese"]',
    '["Cook Macaroni for 8'', "Melt butter in a saucepan", "Add flour, salt, pepper and mix", "Add Milk and mix", "Cook until mix is smooth", "Add cheddar cheese", "Add the macaroni"]'
  );
-- Inserting Tamagoyaki Japanese Omelette
INSERT INTO Recipes (name, ingredients, steps)
VALUES (
    'Tamagoyaki Japanese Omelette',
    '["Eggs", "Soy sauce", "Sugar", "Salt", "Olive Oil"]',
    '["Beat the eggs", "Add soya sauce, sugar and salt", "Add oil to a saucepan", "Bring to medium heat", "Add some mix to the saucepan", "Let it cook for 1''", "Add oil to a saucepan", "Add some mix to the saucepan", "Let it cook for 1''", "Remove pan from fire"]'
  );
-- Insert categories into the Categories table
INSERT INTO Categories (name)
VALUES ('Cake'),
  ('No-Bake'),
  ('Vegetarian'),
  ('Vegan'),
  ('Gluten-Free'),
  ('Japanese');
-- Insert data into RecipeCategories table
-- No-Bake Cheesecake
INSERT INTO RecipeCategories (recipe_id, category_id)
VALUES (1, 1),
  -- Cake
  (1, 2),
  -- No-Bake
  (1, 3);
-- Vegetarian
-- Roasted Brussels Sprouts
INSERT INTO RecipeCategories (recipe_id, category_id)
VALUES (2, 4),
  -- Vegan
  (2, 5);
-- Gluten-Free
-- Mac & Cheese
INSERT INTO RecipeCategories (recipe_id, category_id)
VALUES (3, 3);
-- Vegetarian
-- Tamagoyaki Japanese Omelette
INSERT INTO RecipeCategories (recipe_id, category_id)
VALUES (4, 3),
  -- Vegetarian
  (4, 6);
-- Japanese