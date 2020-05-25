import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { configureFakeBackend } from "./auth/fake-backend";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import ReactPaginate from "react-paginate";
import { Provider } from "react-redux";
import store from "./store/store";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./PrivateRoute";
import Checkout from "./components/Checkout";

configureFakeBackend();
ReactDOM.render(
  // <React.StrictMode>{/* <App /> */}</React.StrictMode>,
  <Router>
    <Route exact path="/" component={App} />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
