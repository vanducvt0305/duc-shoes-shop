import {  configureStore } from '@reduxjs/toolkit'
import productReducer from '../redux/reducers/productReducer';
import userReducer from './reducers/userReducer';


export const store = configureStore({
    reducer: {
        productReducer,
        userReducer
    }
});