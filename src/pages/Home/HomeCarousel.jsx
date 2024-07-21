import CustomCarousel from "../../components/UI/Carousel/CustomCarousel";
import pic1 from "../../media/1.jpg";
import pic2 from "../../media/2.jpg";
import pic3 from "../../media/3.jpg";
import "./HomeCarousel.css";

const carouselContainerData = [
  {
    img: pic1,
    alt: "pic1",
  },
  {
    img: pic2,
    alt: "pic2",
  },
  {
    img: pic3,
    alt: "pic3",
  },
];

export default function HomeCarousel() {
  const extraSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="carouselContainer">
      <CustomCarousel extraSettings={extraSettings}>
        {carouselContainerData.map(({ img, alt }, idx) => {
          return (
            <div key={idx} className="homeCarouselImageContainer">
              <img src={img} alt={alt} />
            </div>
          );
        })}
      </CustomCarousel>
    </div>
  );
}
