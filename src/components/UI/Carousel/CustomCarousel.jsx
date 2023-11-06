import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CustomCarousel.css";

function NextArrow({ onClick }) {
  return (
    <button
      className="arrowContainer nextArrow homeArrowContainer"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: "30px" }} />
    </button>
  );
}

function PrevArrow({ onClick }) {
  return (
    <button
      className="arrowContainer prevArrow homeArrowContainer"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: "30px" }} />
    </button>
  );
}

export default function CustomCarousel({ children, extraSettings }) {
  const settings = {
    arrows: true,
    className: "carousel",
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    dotsClass: "customDots",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    ...extraSettings,
  };

  return <Slider {...settings}>{children}</Slider>;
}
