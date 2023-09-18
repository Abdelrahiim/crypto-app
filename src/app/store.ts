import { configureStore } from "@reduxjs/toolkit";
import { cryptoAPI } from "../services/CryptoAPI";
import {cryptoNewsAPI} from "../services/CryptoNews"

export default configureStore({
    reducer :{
        [cryptoAPI.reducerPath]:cryptoAPI.reducer,
        [cryptoNewsAPI.reducerPath]:cryptoNewsAPI.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoAPI.middleware,cryptoNewsAPI.middleware),
})