import React from 'react';
import './index.css';
import * as ReactDOM from "react-dom/client";
import AppRouter from "./AppRouter.js";
import BasicExample from "./modules/nav";
import { Provider } from 'react-redux'
// import {createStore} from 'redux';
// import allReducers from './reducers';
import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

// const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <>
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <BasicExample />
    <AppRouter />
    </PersistGate>
    </Provider>
  </>
  // </React.StrictMode>
);
