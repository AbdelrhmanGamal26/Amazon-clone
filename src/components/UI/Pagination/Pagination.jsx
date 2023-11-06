import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./Pagination.module.css";

export default function Pagination({ total, pageNumber, onSetPageNumber }) {
  const changeNextPageHandler = () => {
    if (pageNumber === 5) return;
    onSetPageNumber((current) => parseInt(current) + 1);
  };

  const changePreviousPageHandler = () => {
    if (pageNumber === 1) return;
    onSetPageNumber((current) => parseInt(current) - 1);
  };

  const changePageHandler = (page) => onSetPageNumber(parseInt(page));

  return (
    <div className={classes.pagination}>
      <ul>
        <li>
          <button
            className={classes.prev}
            onClick={changePreviousPageHandler}
            style={{ color: pageNumber === 1 && "#CCC" }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            Previous
          </button>
        </li>
        {[...Array(Math.ceil(total / 20) || 1)].map((_, index) => {
          const page = index + 1;
          return (
            <li key={page}>
              <button
                onClick={() => changePageHandler(page)}
                className={pageNumber === page ? classes.active : ""}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li>
          <button
            onClick={changeNextPageHandler}
            className={classes.next}
            style={{ color: pageNumber === 5 && "#CCC" }}
          >
            Next
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </li>
      </ul>
    </div>
  );
}
