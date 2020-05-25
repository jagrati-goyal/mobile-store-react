import {
  FETCH_PRODUCTS,
  SORT_PRODUCTS_BY_PRICE,
  SEARCH_PRODUCTS,
} from "../actions/productAction";

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { items: action.payload, filteredItems: action.payload };

    case SORT_PRODUCTS_BY_PRICE:
      return {
        ...state,
        sort: action.payload.sort,
        filteredItems: action.payload.items,
      };

    case SEARCH_PRODUCTS:
      return {
        ...state,
        filteredItems: action.payload.items,
      };

    default:
      return state;
  }
};
