import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Modal from "react-modal";
import Login from "./components/Login";
import PrivateRoute from "./PrivateRoute";
import Checkout from "./components/Checkout";
import Main from "./components/Main";
import Header from "./components/Header";
import CartDetails from "./components/CartDetails";

class App extends Component {
  componentWillMount() {
    Modal.setAppElement("body");
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/cart" component={Header} />
          <Route path="/cart" component={CartDetails} />
          <PrivateRoute path="/checkout" component={Checkout} />
        </Router>
      </Provider>
    );
  }
}

export default App;
