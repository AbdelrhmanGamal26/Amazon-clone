import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import { fetchProducts } from "../../services/http";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import ProductCard from "./ProductCard";
import { priceAfterDiscount } from "../../util/util";
import ProductsCategoryFilter from "./ProductsCategoryFilter";
import ProductsPriceFilter from "./ProductsPriceFilter";
import ProductsRatingFilter from "./ProductsRatingFilter";
import styles from "./ProductsPage.module.css";

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filterRange, setFilterRange] = useState({ min: 0, max: 2000 });
  const [rating, setRating] = useState(0);

  const [searchParams] = useSearchParams();
  const searchCategory = searchParams.get("category");

  const { data, isLoading } = useQuery({
    queryKey: ["products", { limit: 200, skip: 0 }],
    queryFn: ({ signal, queryKey }) =>
      fetchProducts({ signal, ...queryKey[1] }),
    staleTime: 30000,
  });

  const { products = [] } = data || {};

  useEffect(() => {
    if (searchCategory && !selectedCategories.includes(searchCategory))
      setSelectedCategories((prevCategories) => [
        ...prevCategories,
        searchCategory,
      ]);
  }, [searchCategory, selectedCategories]);

  let content;

  if (isLoading) {
    return (
      <div
        style={{
          margin: "200px auto",
          display: "flex",
          justifyContent: "center",
          fontSize: "20px",
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  if (!products?.length) {
    return <p>No data available</p>;
  }

  const filteredProducts = products.filter((product) => {
    const dealPrice = priceAfterDiscount(
      product.price,
      product.discountPercentage
    );
    const lowerCaseSelectedCategories = selectedCategories.map((cat) =>
      cat.toLowerCase()
    );
    return (
      dealPrice >= +filterRange.min &&
      dealPrice <= +filterRange.max &&
      product.rating >= rating &&
      (lowerCaseSelectedCategories.length
        ? lowerCaseSelectedCategories.includes(
            product.category.replace("-", " ")
          )
        : true)
    );
  });

  content = filteredProducts.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return (
    <motion.div
      className={styles.productsPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.productsFilter}>
        <h3>Filter:</h3>
        <ProductsCategoryFilter
          onFetchSelectedCategories={setSelectedCategories}
          selectedCategories={selectedCategories}
          searchCategory={searchCategory}
        />
        <ProductsPriceFilter
          filterRange={filterRange}
          onFetchPriceFilter={setFilterRange}
        />
        <ProductsRatingFilter onFetchRatingFilter={setRating} />
      </div>
      <div className={styles.pageResults}>
        <h2 className={styles.results}>Results</h2>
        <div className={styles.productsContainer}>{content}</div>
      </div>
    </motion.div>
  );
}
