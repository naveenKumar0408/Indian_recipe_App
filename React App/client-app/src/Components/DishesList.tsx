import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Dish } from "../types";
import { Link } from "react-router-dom";
import { fetchDishes } from "../features/dishes/dishesSlice";

const DishesList: React.FC = () => {
  const dishes = useAppSelector((state) => state.dishes.data);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDishes());
  }, []);

  return (
    <div>
      <table className="table rounded font-monospace">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Prep Time</th>
            <th scope="col">Cook Time</th>
            <th scope="col">Diet</th>
            <th scope="col">Flavor</th>
            <th scope="col">State</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish: Dish) => (
            <tr key={dish.name}>
              <td>
                <Link
                  className="nav-link"
                  to={`/dish-details/${encodeURIComponent(dish.name.trim())}`}
                >
                  {dish.name}
                </Link>
              </td>

              <td>{dish.prep_time}</td>
              <td>{dish.cook_time}</td>
              <td>{dish.diet}</td>
              <td>{dish.flavor_profile}</td>
              <td>{dish.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default DishesList;
