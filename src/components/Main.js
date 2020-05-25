import React, { Component } from "react";
import Products from "../components/Products";
import Filter from "../components/Filter";
import Cart from "../components/Cart";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import Header from "./Header";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: localStorage.getItem("user") === null ? false : true,
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    };
  }

  componentDidMount() {
    console.log("dfgjhfiidwbn");
    this.setState({
      isLogin: localStorage.getItem("user") === null ? false : true,
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    });
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <Header></Header>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter></Filter>
              <Products></Products>
            </div>
            <div className="sidebar">
              <Cart />
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }
}

export default withRouter(Main);
