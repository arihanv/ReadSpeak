// import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./counter";

// const store = configureStore({
//     reducer: {
//         candle: counterReducer
//     }
// })

// export default store;

import { createStore } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import allReducers from '../reducers/index';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);

const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

