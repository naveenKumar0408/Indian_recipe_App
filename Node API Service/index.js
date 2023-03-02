require("dotenv").config();
const express = require("express");
const cors = require("cors");
const csv = require("csv-parser");
const fs = require("fs");

const app = express();
const port = process.env.port || 8000;
const csvFilePath = process.env.CSV_FILE_PATH || "./data/dishes.csv";

const dishes = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (data) => {
    dishes.push(data);
  })
  .on("end", () => {
    console.log("CSV File successfully processed");
  });

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Indian Dishes API");
});

// Find all the dishes available in the system
app.get("/dishes", (req, res) => {
  res.json(dishes);
});

// Find data about a specific dish in the system
app.get("/dishes/:name", (req, res) => {
  const dishName = req.params.name;
  const dish = dishes.find((d) => d.name === dishName);
  if (dish) {
    res.json(dish);
  } else {
    res.status(404).json({ message: `Dish with name ${dishName} not found` });
  }
});

// Find all dishes that are possible to make given a set of ingredients available with the user
app.post("/dishes/possible", (req, res) => {
  const { ingredients } = req.body;
  if (!ingredients) {
    return res.status(400).json({ message: "Ingredients are required" });
  }
  const possibleDishes = dishes.filter((dish) => {
    const dishIngredients = dish.ingredients.split(",").map((i) => i.trim());
    return dish.ingredients.every((i) => ingredients.includes(i));
  });
  res.json(possibleDishes);
});

app.get("/dishes/ingredients/:ingredient", (req, res) => {
  const dishesWithIngredient = dishes.filter((dish) =>
    dish.ingredients.includes(req.params.ingredient)
  );
  res.json(dishesWithIngredient);
});

app.get("/dishes/search/:name", (req, res) => {
  const searchTerm = req.params.name.toLowerCase();
  const matchingDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm)
  );
  res.json(matchingDishes);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
