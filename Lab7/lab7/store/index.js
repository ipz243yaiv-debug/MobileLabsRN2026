import { configureStore } from '@reduxjs/toolkit';
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cartReducer from './cart/cartSlice';
import productsReducer from './products/productsSlice';
import usersReducer from './users/usersSlice';
import ordersReducer from './orders/ordersSlice';

const persistConfigCart = { key: 'cart', storage: AsyncStorage };
const persistConfigOrders = { key: 'orders', storage: AsyncStorage };

export const store = configureStore({
    reducer: {
        products: productsReducer,
        users: usersReducer,
        cart: persistReducer(persistConfigCart, cartReducer),
        orders: persistReducer(persistConfigOrders, ordersReducer),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);