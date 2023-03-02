import { useState, useEffect } from "react";
import axios from "axios";
import { Dish } from "../types";

type DishSuggesterProps = {
  onIngredientsChange: (newIngredients: string[]) => void;
};
const DishSuggester: React.FC<DishSuggesterProps> = ({
  onIngredientsChange,
}) => {
  const [dishes, setDishes] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [possibleDishes, setPossibleDishes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/dishes").then((response) => {
      setDishes(response.data);
    });
  }, []);

  useEffect(() => {
    const possibleDishes = dishes.filter((dish: Dish) =>
      selectedIngredients.every((ingredient) =>
        dish.ingredients.includes(ingredient)
      )
    );
    setPossibleDishes(possibleDishes);
  }, [selectedIngredients, dishes]);

  const handleIngredientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ingredient = e.target.value;
    setSelectedIngredients((prevSelectedIngredients) => [
      ...prevSelectedIngredients,
      ingredient,
    ]);
  };
  const handleIngredientSelection = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const ingredient = event.target.value;
    if (event.target.checked) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    } else {
      setSelectedIngredients(
        selectedIngredients.filter((i) => i !== ingredient)
      );
    }
    onIngredientsChange(selectedIngredients);
  };

  return (
    <div>
      <h1>Dish Suggester</h1>
      <p>Select the ingredients you have:</p>
      <div>
        <input
          type="checkbox"
          value="Rice flour"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleIngredientChange
          }
        />
        <label>Rice flour</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="Coconut"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleIngredientChange
          }
        />
        <label>Coconut</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="Jaggery"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleIngredientChange
          }
        />
        <label>Jaggery</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="Banana"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleIngredientChange
          }
        />
        <label>Banana</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="Ghee"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleIngredientChange
          }
        />
        <label>Ghee</label>
      </div>
      <h2>Possible Dishes:</h2>
      <ul>
        {possibleDishes.map((dish: Dish) => (
          <li key={dish.name}>{dish.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DishSuggester;
