import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/Cart/cartSlice"
import shopReducer from "../features/Shop/shopSlice"
import {shopApi} from "../services/shopService";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../services/authService";
import authReducer from "../features/User/userSlice";
import counterReducer from "../features/Counter/counterSlice"
import globalReducer from "../features/Global/globalSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        shop: shopReducer,
        global: globalReducer,
        cart: cartReducer,
        auth: authReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(shopApi.middleware)
    .concat(authApi.middleware)
})

setupListeners(store.dispatch)

export default store;