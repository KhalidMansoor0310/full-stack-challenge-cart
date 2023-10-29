import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import CartSlice from "./Features/Cart/CartSlice";
import ProductSlice from "./Features/Product/ProductSlice";
let initialState = {};
let store = configureStore(
  {
    reducer: {
      products: ProductSlice,
      carts: CartSlice,
    },
  },
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

setupListeners(store.dispatch);

export default store;
