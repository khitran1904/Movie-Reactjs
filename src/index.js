import React from 'react';
import ReactDOM from 'react-dom';
import './Style/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore,applyMiddleware,compose } from "redux";
import thunk from "redux-thunk";
import {  Provider} from "react-redux";
import  rootReducer from "./Reducer";

const enhanced = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(rootReducer,enhanced);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
