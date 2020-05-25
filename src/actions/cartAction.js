export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CREATE_ORDER = "CREATE_ORDER";

export const addToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  let alreadyExists = false;
  cartItems.forEach((x) => {
    if (x.id === product.id) {
      alreadyExists = true;
      x.count++;
    }
  });
  if (!alreadyExists) {
    cartItems.push({ ...product, count: 1 });
  }
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState()
    .cart.cartItems.slice()
    .filter((x) => x.id != product.id);
  dispatch({
    type: REMOVE_FROM_CART,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const createOrder = () => async (dispatch, getState) => {
  let cartItems = getState().cart.cartItems.slice();
  cartItems = [];
  dispatch({
    type: CREATE_ORDER,
    payload: { cartItems: cartItems, redirectTo: "/" },
  });
  localStorage.removeItem("cartItems");
  console.log(Math.floor(100000 + Math.random() * 900000));
  alert(
    "Order placed successfully \n Order id: " +
      Math.floor(1000 + Math.random() * 9000) +
      "-" +
      Math.floor(1000 + Math.random() * 9000)
  );
};
