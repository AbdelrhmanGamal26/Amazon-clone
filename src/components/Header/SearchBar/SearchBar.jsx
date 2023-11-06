import { useState } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { stringTransform } from "../../../util/util";
import classes from "./SearchBar.module.css";

export default function SearchBar() {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const searchInputChangeHandler = (event) => {
    setCategory(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (category) {
      navigate(`/products?category=${stringTransform(category)}`);
    }

    setCategory("");
  };

  return (
    <form className={classes.search} onSubmit={submitHandler}>
      <input
        type="search"
        className={classes.input}
        onChange={searchInputChangeHandler}
        value={category}
        placeholder="Enter Category Name"
      />
      <button type="submit" className={classes.searchIcon}>
        <FontAwesomeIcon
          icon={faSearch}
          style={{ color: "#131921", fontSize: "15px" }}
        />
      </button>
    </form>
  );
}
