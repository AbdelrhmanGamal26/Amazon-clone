import { Fragment } from "react";

import classes from "./ProductsPage.module.css";

export default function ProductsPriceFilter({
  filterRange,
  onFetchPriceFilter,
}) {
  const minInputChangeHandler = (e) =>
    onFetchPriceFilter((prev) => ({ ...prev, min: e.target.value }));

  const maxInputChangeHandler = (e) =>
    onFetchPriceFilter((prev) => ({ ...prev, max: e.target.value }));

  return (
    <Fragment>
      <h4 style={{ marginTop: "5px" }}>By Price:</h4>
      <div className={classes.priceFilter}>
        <form>
          <input
            type="number"
            placeholder="Min"
            value={filterRange.min}
            onChange={minInputChangeHandler}
          />
          <input
            type="number"
            placeholder="Max"
            value={filterRange.max}
            onChange={maxInputChangeHandler}
          />
        </form>
      </div>
    </Fragment>
  );
}
