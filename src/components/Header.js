import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Input, Button } from "reactstrap";
import { searchProducts } from "../actions/productAction";
import { connect } from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: localStorage.getItem("user") === null ? false : true,
      searchKeyword: "",
    };
    this.onLogout = this.onLogout.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onLogout(e) {
    if (e.target.value === "login") {
      localStorage.removeItem("user");
      this.setState({ isLogin: false });
    }
  }

  onInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log("Inpt", this.state.searchKeyword);
  }

  render() {
    const { searchKeyword } = this.state;
    return (
      <div className="header">
        <Link to="/">
          <img
            src="https://cdn4.vectorstock.com/i/1000x1000/11/68/m-letter-logo-template-mobile-devices-store-vector-4101168.jpg"
            alt="Mobile Store"
            width="12%"
            height="10%"
          />{" "}
          Mobile Store
        </Link>
        <Input
          type="text"
          name="searchKeyword"
          value={searchKeyword}
          onChange={this.onInputChange}
          placeholder="Search.."
        />
        <Button
          className="btn btn-default"
          type="submit"
          onClick={this.props.searchProducts(
            this.props.products,
            this.state.searchKeyword
          )}
        >
          <FontAwesomeIcon icon={faSearch} />
        </Button>
        <div className="user-info">
          {this.state.isLogin ? (
            <select onChange={this.onLogout}>
              <option value="">
                {JSON.parse(localStorage.getItem("user")).username}
              </option>
              <option value="login">Logout</option>
            </select>
          ) : (
            <Link to="/login">
              <Button className="warning" size="lg" block>
                Login
              </Button>
            </Link>
          )}
        </div>
        <div className="cart-icon">
          <Link
            to={{
              pathname: "/cart",
            }}
          >
            <FontAwesomeIcon
              className="fas fa-shopping-cart fa-2x"
              icon={faShoppingCart}
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    products: state.products.items,
  }),
  {
    searchProducts,
  }
)(Header);
