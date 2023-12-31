export async function fetchProductCategories() {
  let url = "https://dummyjson.com/products/categories";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data!");
  }

  const data = await response.json();

  return data;
}

export async function fetchProducts({ signal, limit, skip }) {
  let url = "https://dummyjson.com/products";

  if (limit && skip) {
    url += "?limit=" + limit + "&skip=" + skip;
  } else if (limit) {
    url += "?limit=" + limit;
  }

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data;
}

export async function fetchProduct({ signal, id }) {
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await response.json();

  return data;
}

export async function fetchOrders() {
  const response = await fetch(
    process.env.REACT_APP_FIREBASE_DATABASE_URL + "/orders.json"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  const data = await response.json();

  return data;
}
