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
<<<<<<< HEAD
    `https://clone-db7ee-default-rtdb.firebaseio.com/orders.json`
=======
    `https://************************.firebaseio.com/orders.json`
>>>>>>> b95e57812c72cc5992f769ed0e36af9bc59a57f1
  );

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  const data = await response.json();

  return data;
}
