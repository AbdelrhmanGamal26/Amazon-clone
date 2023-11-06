export function stringTransform(string) {
  const transformedString = string
    .toString()
    .replace("-", " ")
    .replace("mens", "men's");

  return transformedString;
}

export function priceAfterDiscount(price, discountPercentage) {
  const priceAfterDiscount = Math.round(
    (price - price * discountPercentage * 0.01).toFixed(2)
  );
  return priceAfterDiscount;
}
