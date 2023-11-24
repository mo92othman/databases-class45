# Food Recipes Database

The tables after normalization:

## Tables

- **Categories:**
  - `category_id` (Primary Key)
  - `category_name` (TEXT)

- **Ingredients:**
  - `ingredient_id` (Primary Key)
  - `ingredient_name` (TEXT)

- **Steps:**
  - `step_id` (Primary Key)
  - `step_desc` (TEXT)

- **Recipes:**
  - `recipe_id` (Primary Key)
  - `recipe_name` (TEXT)

- **Recipe_ingredients:**
  - `recipe_id` (Foreign Key)
  - `ingredient_id` (Foreign Key)
  - Primary Key: `(recipe_id, ingredient_id)`

- **Recipe_steps:**
  - `recipe_id` (Foreign Key)
  - `step_id` (Foreign Key)
  - Primary Key: `(recipe_id, step_id)`

- **Recipe_categories:**
  - `recipe_id` (Foreign Key)
  - `category_id` (Foreign Key)
  - Primary Key: `(recipe_id, category_id)`

# Database Normalization Summary

**Original Structure:**

- Lacked full 2NF and 3NF due to JSON-like arrays in `Recipes`, causing potential redundancy and querying challenges.

**Normalization Changes:**

1. **Separation of Data:**
   - Created `Ingredients` and `Steps` tables for improved organization and individual querying.

2. **Junction Tables:**
   - Introduced `Recipe_ingredients` and `Recipe_steps` for efficient many-to-many relationships.

**Benefits:**

- **Data Integrity:**
  - Enhanced integrity through reduced redundancy and foreign key relationships.

- **Flexibility:**
  - Improved flexibility for future expansion and modifications.

### How adding a new recipe would look like?

```sql
INSERT INTO Recipes (recipe_name)
VALUES ('New Recipe');

-- Get the newly added recipe_id
SET @new_recipe_id = LAST_INSERT_ID();

-- Add Ingredients
INSERT INTO Recipe_ingredients (recipe_id, ingredient_id)
VALUES
    (@new_recipe_id, 1), 
    (@new_recipe_id, 2), 

-- Add Steps
INSERT INTO Recipe_steps (recipe_id, step_id)
VALUES
    (@new_recipe_id, 1), 
    (@new_recipe_id, 2); 
```

## Challenges in Data Retrieval with Joined Tables

The normalized structure enhances integrity but introduces complexities in data retrieval:

- **Query Complexity:**
  - Increased due to multiple table joins.

```sql
-- Query for vegetarian recipes with potatoes
SELECT DISTINCT R.recipe_name
FROM Recipes R
  JOIN RecipeCategories RC ON R.recipe_id = RC.recipe_id
  JOIN Categories C ON RC.category_id = C.category_id
  JOIN Recipe_ingredients RI ON R.recipe_id = RI.recipe_id
  JOIN Ingredients I ON RI.ingredient_id = I.ingredient_id
WHERE C.category_name = 'Vegetarian'
  AND I.ingredient_name LIKE '%Potatoes%';
```

while in the older structure version was:

```sql
-- Query for vegetarian recipes with potatoes
SELECT R.name AS recipe_name
FROM Recipes R
  JOIN RecipeCategories RC ON R.recipe_id = RC.recipe_id
  JOIN Categories C ON RC.category_id = C.category_id
WHERE C.name = 'Vegetarian'
  AND R.ingredients LIKE '%Potatoes%';
```
