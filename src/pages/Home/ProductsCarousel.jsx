import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../services/http";

import Card from "../../components/UI/Card/Card";
import CustomCarousel from "../../components/UI/Carousel/CustomCarousel";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import { priceAfterDiscount } from "../../util/util";
import "./ProductsCarousel.css";

export default function Categories() {
  const { data, isLoading } = useQuery({
    queryKey: ["HomeProducts", { limit: 15 }],
    queryFn: ({ signal, queryKey }) =>
      fetchProducts({ signal, ...queryKey[1] }),
  });

  let content;

  if (isLoading) {
    return (
      <div
        style={{
          margin: "50px auto",
          display: "flex",
          justifyContent: "center",
          fontSize: "20px",
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  if (data) {
    content = data.products.map((item) => (
      <Card key={item.id}>
        <Link to={{ pathname: `/products/${item.id}` }} className="productLink">
          <h2>
            {item.title.length > 28
              ? item.title.slice(0, 20) + "..."
              : item.title}
          </h2>
          <div className="productImage">
            <img src={item.images[0]} alt="product" />
          </div>
          <div className="productDetails">
            <div className="productDeal">
              <span className="discountPercentage">{`${item.discountPercentage}% off`}</span>
              <span className="deal">Deal</span>
            </div>
            <div className="productPrice">
              <span>$</span>
              <span className="priceAfterDiscount">
                {priceAfterDiscount(item.price, item.discountPercentage)}
              </span>
              <span className="productDiscountText">Was: </span>
              <span className="priceBeforeDiscount">{`$${item.price}`}</span>
            </div>
            <p className="productDescription">
              {item.description.length > 20
                ? `${item.description.slice(0, 25) + "..."}`
                : item.description}
            </p>
          </div>
          <span className="learnMore">Learn more</span>
        </Link>
      </Card>
    ));
  }

  const extraSettings = {
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="productsCarouselContainer">
      <div className="productsCardsCarousel">
        <CustomCarousel extraSettings={extraSettings}>{content}</CustomCarousel>
      </div>
    </div>
  );
}
