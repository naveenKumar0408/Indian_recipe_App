import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Dish } from "../types";
import { Link } from "react-router-dom";
import { fetchDishes } from "../features/dishes/dishesSlice";

// Define the props for the DishesList component
type DishesListProps = {
  dishes: Dish[];
};
// Define the state for the DishesList component
type DishesListState = {
  currentPage: number;
  itemsPerPage: number;
  sortColumn: string;
  sortDirection: "asc" | "desc";
  filters: {
    diet: string;
    flavor: string;
    state: string;
  };
};
const PAGE_SIZE = 10;

const DishesList: React.FC = () => {
  const dishes = useAppSelector((state) => state.dishes.data);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDishes());
  }, []);
  // const [state, setState] = useState<DishesListState>({
  //   currentPage: 1,
  //   itemsPerPage: 10,
  //   sortColumn: "name",
  //   sortDirection: "asc",
  //   filters: {
  //     diet: "",
  //     flavor: "",
  //     state: "",
  //   },
  // });

  // // Sorting function to sort dishes based on a column and direction
  // const sortDishes = (column: string, direction: "asc" | "desc") => {
  //   const sortedDishes = [...dishes].sort((a, b) => {
  //     if (a[column] < b[column]) {
  //       return direction === "asc" ? -1 : 1;
  //     } else if (a[column] > b[column]) {
  //       return direction === "asc" ? 1 : -1;
  //     } else {
  //       return 0;
  //     }
  //   });

  //   setState({
  //     ...state,
  //     sortColumn: column,
  //     sortDirection: direction,
  //     currentPage: 1,
  //     filters: { ...state.filters },
  //   });
  // };
  // // Pagination function to set the current page
  // const setCurrentPage = (page: number) => {
  //   setState({ ...state, currentPage: page });
  // };

  // // Filtering function to set the filters
  // const setFilters = (filters: {
  //   diet: string;
  //   flavor: string;
  //   state: string;
  // }) => {
  //   setState({ ...state, filters: filters, currentPage: 1 });
  // };

  // // Calculate the index of the first and last item to display based on the current page and itemsPerPage
  // const indexOfLastItem = state.currentPage * state.itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - state.itemsPerPage;

  // // Apply filters to the dishes
  // let filteredDishes = [...dishes];
  // if (state.filters.diet !== "") {
  //   filteredDishes = filteredDishes.filter(
  //     (dish: Dish) => dish.diet === state.filters.diet
  //   );
  // }
  // if (state.filters.flavor !== "") {
  //   filteredDishes = filteredDishes.filter(
  //     (dish: Dish) => dish.flavor_profile === state.filters.flavor
  //   );
  // }
  // if (state.filters.state !== "") {
  //   filteredDishes = filteredDishes.filter(
  //     (dish: Dish) => dish.state === state.filters.state
  //   );
  // }

  // // Apply sorting to the dishes
  // const sortedDishes = [...filteredDishes];
  // sortDishes(state.sortColumn, state.sortDirection);

  // // Get the current page of dishes to display
  // const currentDishes = sortedDishes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <table className="table rounded font-monospace">
        <thead>
          <tr>
            {/* <th onClick={() => handleSort("name")}>Name</th>
              <th onClick={() => handleSort("prepTime")}>Prep Time</th>
              <th onClick={() => handleSort("cookTime")}>Cook Time</th>
              <th onClick={() => handleSort("diet")}>Diet</th>
              <th onClick={() => handleSort("flavor")}>Flavor</th>
              <th onClick={() => handleSort("state")}>State</th> */}
            <th scope="col">Name</th>
            <th scope="col">Prep Time</th>
            <th scope="col">Cook Time</th>
            <th scope="col">Diet</th>
            <th scope="col">Flavor</th>
            <th scope="col">State</th>
          </tr>
          {/* <tr> */}
          {/* <th>
                <input
                  type="text"
                  value={filter.diet || ""}
                  onChange={(e) => setFilter({ ...filter, diet: e.target.value })}
                />
              </th>
              <th>
                <input
                  type="text"
                  value={filter.flavor || ""}
                  onChange={(e) =>
                    setFilter({ ...filter, flavor: e.target.value })
                  }
                />
              </th>
              <th>
                <input
                  type="text"
                  value={filter.state || ""}
                  onChange={(e) =>
                    setFilter({ ...filter, state: e.target.value })
                  }
                />
              </th> */}
          {/* <th></th>
              <th></th>
              <th></th> */}
          {/* </tr> */}
        </thead>
        <tbody>
          {dishes.map((dish: Dish) => (
            <tr key={dish.name}>
              {/* <td>{dish.name}</td> */}
              <td>
                <Link
                  className="nav-link"
                  to={`/dish-details/${encodeURIComponent(dish.name.trim())}`}
                >
                  {dish.name}
                </Link>
              </td>
              {/* <td>
                <Link
                  to={`/dish-details/${dish.name.replace(/[^\w\s]/gi, "")}`}
                >
                  {dish.name}
                </Link>
              </td> */}
              <td>{dish.prep_time}</td>
              <td>{dish.cook_time}</td>
              <td>{dish.diet}</td>
              <td>{dish.flavor_profile}</td>
              <td>{dish.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div>
          <button disabled={currentPage === 1} onClick={handlePrev}>
            Prev
          </button>
          <span>{`${currentPage}/${totalPages}`}</span>
          <button disabled={currentPage === totalPages} onClick={handleNext}>
            Next
          </button>
        </div> */}
    </div>
  );
};
export default DishesList;
//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th
//               onClick={() =>
//                 sortDishes(
//                   "name",
//                   state.sortDirection === "asc" ? "desc" : "asc"
//                 )
//               }
//             >
//               Name
//             </th>
//             <th
//               onClick={() =>
//                 sortDishes(
//                   "diet",
//                   state.sortDirection === "asc" ? "desc" : "asc"
//                 )
//               }
//             >
//               Diet
//             </th>
//             <th
//               onClick={() =>
//                 sortDishes(
//                   "flavor",
//                   state.sortDirection === "asc" ? "desc" : "asc"
//                 )
//               }
//             >
//               Flavor
//             </th>
//             <th
//               onClick={() =>
//                 sortDishes(
//                   "state",
//                   state.sortDirection === "asc" ? "desc" : "asc"
//                 )
//               }
//             >
//               State
//             </th>
//             <th
//               onClick={() =>
//                 sortDishes(
//                   "prepTime",
//                   state.sortDirection === "asc" ? "desc" : "asc"
//                 )
//               }
//             >
//               Prep Time
//             </th>
//             <th
//               onClick={() =>
//                 sortDishes(
//                   "cookTime",
//                   state.sortDirection === "asc" ? "desc" : "asc"
//                 )
//               }
//             >
//               Cook Time
//             </th>
//             <th>Ingredients</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentDishes.map((dish: Dish) => (
//             <tr
//               key={dish.name}
//               onClick={() => console.log("Clicked on dish:", dish.name)}
//             >
//               <td>{dish.name}</td>
//               <td>{dish.diet}</td>
//               <td>{dish.flavor_profile}</td>
//               <td>{dish.state}</td>
//               <td>{dish.prep_time}</td>
//               <td>{dish.cook_time}</td>
//               <td>{dish.ingredients}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DishesList;
