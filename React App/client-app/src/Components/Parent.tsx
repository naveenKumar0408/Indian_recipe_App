import React, { useState } from "react";
import { Dish } from "../types";
import DishSuggester from "./DishSuggester";

function ParentComponent() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [suggestedDishes, setSuggestedDishes] = useState([]);

  const handleIngredientsChange = async (newIngredients: string[]) => {
    try {
      const response = await fetch(
        `http://localhost:8000/dishes/possible?ingredients=${newIngredients.join(
          ","
        )}`
      );
      const data = await response.json();
      setSuggestedDishes(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Select the ingredients you have:</h2>
      <DishSuggester onIngredientsChange={handleIngredientsChange} />
      <h2>Suggested Dishes:</h2>
      <ul>
        {selectedIngredients.length > 0 ? (
          suggestedDishes.map((dish: Dish) => (
            <li key={dish.name}>{dish.name}</li>
          ))
        ) : (
          <p>Please select some ingredients</p>
        )}
      </ul>
    </div>
  );
}
export default ParentComponent;
