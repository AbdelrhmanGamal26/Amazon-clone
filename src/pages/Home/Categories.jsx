import { Link } from "react-router-dom";
import Card from "../../components/UI/Card/Card";
import { stringTransform } from "../../util/util";
import "./Categories.css";

export default function Categories({ data }) {
  let content;

  if (data) {
    content = data.map((category) => {
      let capitalHeader = stringTransform(category.category);

      return (
        <Card key={category.category}>
          <Link
            to={{
              pathname: `/products`,
              search: `?category=${capitalHeader}`,
            }}
            className="categoryLink"
          >
            <h2>{capitalHeader}</h2>
            <div className="categoryImage">
              <img src={category.image} alt="category" />
            </div>
            <span>See more</span>
          </Link>
        </Card>
      );
    });
  }

  return <div className="categoriesContainer">{content}</div>;
}
