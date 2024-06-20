

import { configureStore } from "@reduxjs/toolkit"

import cartSlice from "./slices/cartSlice";
import cartUiSlide from "./slices/cartUiSlice";
import orderReducer from "./slices/orderReducer";
import authSlidce from "./slices/authSlidce";

const store = configureStore({
    reducer:{
        cart: cartSlice,
        cartUi: cartUiSlide.reducer,
        order: orderReducer,
        auth: authSlidce
    }
})

export default store;