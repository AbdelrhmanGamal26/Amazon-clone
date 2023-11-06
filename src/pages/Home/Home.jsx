import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { fetchProductCategories } from "../../services/http";
import HomeCarousel from "./HomeCarousel";
import ProductsCarousel from "./ProductsCarousel";
import Categories from "./Categories";
import { categoryImagesArray } from "../../util/constants";
import "./Home.css";

export default function HomePage() {
  const { data: categoriesData } = useQuery({
    queryKey: ["HomeCategories"],
    queryFn: fetchProductCategories,
  });

  let firstSection;
  let secondSection;

  if (categoriesData) {
    let categoryData = categoriesData.map((category) => ({
      category,
      image: categoryImagesArray[category],
    }));

    firstSection = categoryData.slice(0, 12);
    secondSection = categoryData.slice(12);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container"
    >
      <HomeCarousel />
      <div className="upperCategoriesSection">
        <h1 className="sectionTitle">Explore our categories</h1>
        <Categories data={firstSection} />
      </div>
      <div className="productsSection">
        <div className="sectionTitle">
          <p>Explore our products</p>
          <Link to={"/products"}>See more</Link>
        </div>
        <ProductsCarousel />
      </div>
      <div className="lowerCategoriesSection">
        <h1 className="sectionTitle">More categories to explore</h1>
        <Categories data={secondSection} />
      </div>
    </motion.div>
  );
}
