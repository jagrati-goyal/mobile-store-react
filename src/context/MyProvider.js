import MyContext from "./MyContext";
import React, { Component } from "react";

class MyProvider extends Component {
  state = {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  };

  updateState() {
    localStorage.removeItem("cartItems");
    this.setState({
      cartItems: [],
    });
    this.props.history.push("/");
  }

  render() {
    return (
      <MyContext.Provider
        value={{
          cartItems: this.state.cartItems,
          updateState: this.updateState,
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
