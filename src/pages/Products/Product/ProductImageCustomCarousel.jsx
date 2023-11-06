import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductImageCustomCarousel.css";

function NextArrow({ onClick }) {
  return (
    <div className="nextArrowProduct" onClick={onClick}>
      <button className="arrowContainerProduct">
        <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: "30px" }} />
      </button>
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div className="prevArrowProduct" onClick={onClick}>
      <button className="arrowContainerProduct">
        <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: "30px" }} />
      </button>
    </div>
  );
}

export default function ProductImageCustomCarousel({ children, images }) {
  const settings = {
    arrows: true,
    className: "productCarousel",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: "customDots",
    appendDots: (dots) => <ul> {dots} </ul>,
    customPaging: (i) => (
      <div className="productCarouselSmallImages">
        <img
          src={images[i]}
          alt=""
          height="45px"
          width="60px"
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return <Slider {...settings}>{children}</Slider>;
}
