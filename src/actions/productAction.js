export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const SORT_PRODUCTS_BY_PRICE = "SORT_PRODUCTS_BY_PRICE";
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch(
    `https://my-json-server.typicode.com/jagrati-goyal/react-mobile-store/products`
  );
  const data = await res.json();
  console.log(data);
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

export const searchProducts = (products, keyword) => (dispatch, getState) => {
  if (keyword === "" || keyword === undefined) {
    fetchProducts();
  } else {
    console.log("Serach action");
    const filteredProducts = products
      .slice()
      .filter((x) => x.title.toLowerCase().includes(keyword.toLowerCase()));
    dispatch({
      type: SEARCH_PRODUCTS,
      payload: {
        items: filteredProducts,
      },
    });
  }
};

export const sortProducts = (products, sort) => (dispatch) => {
  console.log("sortProducts", products);
  const sortedProducts = products.slice();
  if (sort === "latest") {
    sortedProducts.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }
  console.log("sorted result", sortedProducts);
  dispatch({
    type: SORT_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};
