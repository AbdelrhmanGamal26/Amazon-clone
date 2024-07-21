import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import styles from "./ProductsPage.module.css";
import { fetchProductCategories } from "../../services/http";

export default function ProductsCategoryFilter({
  onFetchSelectedCategories,
  selectedCategories,
  searchCategory,
}) {
  const navigate = useNavigate();

  const { data: cats } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchProductCategories,
  });

  const addCategory = (category) => {
    if (!selectedCategories.includes(category)) {
      onFetchSelectedCategories((prev) => [...prev, category]);
    }
  };

  const removeCategory = (category) => {
    if (selectedCategories.includes(category)) {
      const removedList = selectedCategories.filter(
        (item) => item !== category
      );
      onFetchSelectedCategories(removedList);
    }
  };

  const resetCategory = () => {
    if (searchCategory) {
      navigate("/products");
    }
    onFetchSelectedCategories([]);
  };

  const categoryFilterHandler = (event) => {
    const category = event.target.value;
    if (selectedCategories.includes(category)) {
      removeCategory(category);
    } else {
      addCategory(category);
    }
  };

  let catContent;

  if (cats) {
    catContent = cats.map((cat) => {
      let capitalHeader = cat.name;
      return (
        <button
          className={
            selectedCategories.includes(capitalHeader) ? styles.active : ""
          }
          key={capitalHeader}
          value={capitalHeader}
          style={{ textTransform: "capitalize", cursor: "pointer" }}
          onClick={categoryFilterHandler}
        >
          {capitalHeader}
        </button>
      );
    });
  }

  return (
    <Fragment>
      <h4>By Category:</h4>
      <div className={styles.catFilter}>
        {catContent}
        <button onClick={resetCategory} style={{ cursor: "pointer" }}>
          Clear
        </button>
      </div>
    </Fragment>
  );
}
