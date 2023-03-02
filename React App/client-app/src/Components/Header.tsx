import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface SearchResult {
  id: number;
  name: string;
  type: string;
}
interface Props {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header = ({ handleSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestedResults, setSuggestedResults] = useState<SearchResult[]>([]);

  const handleSearchEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8000/dishes/search/${searchTerm}`
      );
      const data = await response.json();
      setSuggestedResults(data);
    };
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        fetchData();
      }
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm("");
    setSuggestedResults([]);
  };
  return (
    <>
      <header className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <h2 className="display-6 px-5">Indian Recipe</h2>
        <nav>
          <ul className="navbar-nav px-2 mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" onClick={handleClearSearch} to={`/`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                onClick={handleClearSearch}
                to={`/dish-list`}
              >
                Dishes List
              </Link>
            </li>
          </ul>
        </nav>
        <form className="form-inline ml-auto my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search for dishes..."
            value={searchTerm}
            onChange={handleSearchEvent}
          />
        </form>
      </header>
      <ul className="list-group" style={{ margin: "5rem 0 0 0" }}>
        {searchTerm &&
          suggestedResults.map((result) => (
            <li className="list-group-item" key={result.id}>
              <Link
                className="nav-link"
                onClick={handleClearSearch}
                to={`/dish-details/${encodeURIComponent(result.name.trim())}`}
              >
                {result.name}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Header;
