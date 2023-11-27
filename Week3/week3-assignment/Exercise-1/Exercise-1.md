# Exercise 1: SQL Normalization

## Columns Violating 1NF

- The `food_code` and `food_description` columns in the table violate 1NF as they contain multiple values separated by commas.

## Entities to Extract

- The food-related information (`food_code` and `food_description`) should be extracted into a separate table to follow normalization principles.

## Tables and Columns for 3NF Compliance

- **Members Table:**
  - Columns: `member_id` (PK), `member_name`, `member_address`

- **Dinners Table:**
  - Columns: `dinner_id` (PK), `dinner_date`, `venue_code` (FK), `member_id` (FK)

- **Venues Table:**
  - Columns: `venue_code` (PK), `venue_description`

- **Foods Table:**
  - Columns: `food_code` (PK), `food_description`

- **DinnerFoods Table (Junction Table):**
  - Columns: `dinner_id` (FK), `food_code` (FK)
