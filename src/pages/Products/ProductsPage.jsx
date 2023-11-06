import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import { fetchProducts } from "../../services/http";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import ProductCard from "./ProductCard";
import { priceAfterDiscount, stringTransform } from "../../util/util";
import ProductsCategoryFilter from "./ProductsCategoryFilter";
import ProductsPriceFilter from "./ProductsPriceFilter";
import ProductsRatingFilter from "./ProductsRatingFilter";
import classes from "./ProductsPage.module.css";

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filterRange, setFilterRange] = useState({ min: 0, max: 2000 });
  const [rating, setRating] = useState(0);

  const [searchParams] = useSearchParams();
  const searchCategory = searchParams.get("category");

  const { data, isLoading } = useQuery({
    queryKey: ["products", { limit: 100, skip: 0 }],
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
    return <p>data</p>;
  }

  const filteredProducts = products.filter((product) => {
    const dealPrice = priceAfterDiscount(
      product.price,
      product.discountPercentage
    );
    return (
      dealPrice >= +filterRange.min &&
      dealPrice <= +filterRange.max &&
      product.rating >= rating &&
      (selectedCategories.length
        ? selectedCategories.includes(stringTransform(product.category))
        : true)
    );
  });

  content = filteredProducts.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return (
    <motion.div
      className={classes.productsPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={classes.productsFilter}>
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
      <div className={classes.pageResults}>
        <h2 className={classes.results}>Results</h2>
        <div className={classes.productsContainer}>{content}</div>
      </div>
    </motion.div>
  );
}
