import CustomCarousel from "../../components/UI/Carousel/CustomCarousel";

import pic1 from "../../media/1.jpg";
import pic2 from "../../media/2.jpg";
import pic3 from "../../media/3.jpg";
import "./HomeCarousel.css";

export default function HomeCarousel() {
  const extraSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="carouselContainer">
      <CustomCarousel extraSettings={extraSettings}>
        <div className="homeCarouselImageContainer">
          <img src={pic1} alt="pic1" />
        </div>
        <div className="homeCarouselImageContainer">
          <img src={pic2} alt="pic2" />
        </div>
        <div className="homeCarouselImageContainer">
          <img src={pic3} alt="pic3" />
        </div>
      </CustomCarousel>
    </div>
  );
}
