import { Fragment } from "react";
import StarRating from "../../components/UI/StarRating/StarRating";

import styles from "./ProductsPage.module.css";

export default function ProductsRatingFilter({ onFetchRatingFilter }) {
  const ratingFilterHandler = (rating) => {
    onFetchRatingFilter(rating);
  };

  let content = [4, 3, 2, 1].map((element, index) => (
    <li key={index}>
      <button
        className={styles.ratingButton}
        onClick={() => ratingFilterHandler(element)}
      >
        <StarRating
          rating={element}
          onClick={() => ratingFilterHandler(element)}
        />
        & up
      </button>
    </li>
  ));

  return (
    <Fragment>
      <h4 style={{ paddingTop: "5px" }}>By Rating:</h4>
      <ul>{content}</ul>
    </Fragment>
  );
}
