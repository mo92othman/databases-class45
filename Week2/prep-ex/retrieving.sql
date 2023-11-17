-- Query for vegetarian recipes with potatoes
SELECT R.name AS recipe_name
FROM Recipes R
  JOIN RecipeCategories RC ON R.recipe_id = RC.recipe_id
  JOIN Categories C ON RC.category_id = C.category_id
WHERE C.name = 'Vegetarian'
  AND R.ingredients LIKE '%Potatoes%';
-- Query for cakes that do not need baking
SELECT r.name
FROM Recipes r
  JOIN RecipeCategories rc ON r.recipe_id = rc.recipe_id
  JOIN Categories c ON rc.category_id = c.category_id
WHERE c.name = 'No-Bake';
AND R.steps NOT LIKE '%Bake%';
-- Query for vegan and Japanese recipes
SELECT r.name
FROM Recipes r
  JOIN RecipeCategories rc ON r.recipe_id = rc.recipe_id
  JOIN Categories c ON rc.category_id = c.category_id
WHERE c.name IN ('Vegan', 'Japanese');