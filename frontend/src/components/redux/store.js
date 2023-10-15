import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux";
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

const reducers = combineReducers({

    auth:authReducer,

   });

   const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});




//commented

// export default configureStore({
//     reducer:{
//         search: searchReducer,
//         auth:authReducer
//     }
// })