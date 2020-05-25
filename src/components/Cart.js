import React, { Component } from "react";
import formatCurrency from "../util/currency";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartAction";
import { Link } from "react-router-dom";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let { cartItems } = this.props;

    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} item(s) in cart{" "}
          </div>
        )}
        <div className="cart">
          <Fade left cascade>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div>
                    <img
                      src={item.image}
                      alt={item.title}
                      height="50px"
                      width="50px"
                    ></img>
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency(item.price)} x {item.count}{" "}
                      <button
                        className="button"
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        {cartItems.length !== 0 && (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <Link to="/checkout">
                  <button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                    className="button primary"
                  >
                    Proceed
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
        ;
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart }
)(Cart);
