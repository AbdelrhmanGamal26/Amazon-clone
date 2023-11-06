import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import "./StarRating.css";

export default function StarRating({ rating, onClick }) {
  const getStarClassName = (starIndex) => {
    if (rating >= starIndex) {
      return "star-filled";
    } else if (rating >= starIndex - 0.5) {
      return "star-half-filled";
    } else {
      return "star-empty";
    }
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <FontAwesomeIcon
          icon={faStar}
          key={index}
          className={`star ${getStarClassName(index + 1)}`}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
