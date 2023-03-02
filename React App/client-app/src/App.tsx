import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import DishDetails from "./Components/DishesDetails";
import DishesList from "./Components/DishesList";
import DishSuggester from "./Components/DishSuggester";
import Header from "./Components/Header";
import HomePage from "./Components/Home";
import Parent from "./Components/Parent";

function App() {
  const [dishName, setDishName] = useState("");
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // handle user input and fetch the dish name
    const { value } = event.target;
    setDishName(value);
  };

  return (
    <div className="container">
      <Header handleSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dish-details/:name" element={<DishDetails />} />
        {/* <Route
          path="/dish-suggester"
          element={<DishSuggester onIngredientsChange={handleSearch} />}
        /> */}
        <Route path="/dish-list" element={<DishesList />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/parent" element={<Parent />} />
      </Routes>
    </div>
  );
}

export default App;
