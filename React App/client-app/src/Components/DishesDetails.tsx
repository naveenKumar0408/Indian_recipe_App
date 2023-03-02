import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Dish } from "../types";

// Define the type for a dish object

const DishDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [dish, setDish] = useState<Dish | null>(null);
  useEffect(() => {
    fetch(`http://localhost:8000/dishes/${name?.replace(/[^\w\s]/gi, "")}`)
      .then((response) => response.json())
      .then((data) => setDish(data))
      .catch((error) => console.log(error));
  }, [name]);

  if (!dish) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center bg-white p-5 mt-3 w-50 m-auto shadow list-group">
      <h1 className="fs-1 list-group-item">{dish.name}</h1>
      <p className="mb-4 mt-2">
        <span className="fw-bold me-2 text-uppercase">Ingredients:</span>
        <span className="fst-italic">{dish.ingredients}</span>
      </p>
      <p className="mb-4">
        <span className="fw-bold me-2 text-uppercase">Diet: </span>
        <span className="fst-italic">{dish.diet}</span>
      </p>
      <p className="mb-4">
        <span className="fw-bold me-2 text-uppercase">Flavor: </span>
        <span className="fst-italic">{dish.flavor_profile}</span>
      </p>
      <p className="mb-4">
        <span className="fw-bold me-2 text-uppercase">State: </span>
        <span className="fst-italic">{dish.state}</span>
      </p>
      <p className="mb-4">
        <span className="fw-bold me-2 text-uppercase">Prep Time: </span>
        <span className="fst-italic">{dish.prep_time} minutes</span>
      </p>
      <p className="mb-4">
        <span className="fw-bold me-2 text-uppercase">Cook Time: </span>
        <span className="fst-italic">{dish.cook_time} minutes</span>
      </p>
    </div>
  );
};

export default DishDetails;
