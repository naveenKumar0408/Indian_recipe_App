import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
type Props = {
  // Define props here if needed
};

const HomePage: React.FC<Props> = (props) => {
  return (
    <div className="container p-0 align-middle ">
      <div className="z-3 rounded-3 jumbotron jumbotron-fluid text-center text-white bg-dark position-relative">
        <div className="overlay"></div>
        <div className="container">
          <h1 className="fw-semibold display-4">Welcome to the Recipe App!</h1>
          <p className="fw-semibold lead">
            Here you can find delicious recipes for any occasion.
          </p>
          <hr className="my-4" />
          <p className="fw-semibold">
            Get started by browsing our recipes or submitting your own!
          </p>
          <button className="btn btn-primary fw-semibold">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/dish-list`}
            >
              Browse Dishes
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
