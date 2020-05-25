import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import { Button, Input, Label, Form } from "reactstrap";
import { Redirect } from "react-router";
import { createOrder } from "../actions/cartAction";
import { connect } from "react-redux";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
    this.closeModal = this.closeModal.bind(this);
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  closeModal() {
    this.setState({
      isOpen: false,
    });
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        {
          <Modal isOpen={this.state.isOpen} onRequestClose={this.closeModal}>
            <Fade right cascade>
              <h2> Checkout Page </h2>
              <div className="cart">
                <Form onSubmit={this.props.createOrder}>
                  <Button
                    color="danger"
                    className="close-modal"
                    onClick={this.closeModal}
                  >
                    Close x
                  </Button>
                  <ul className="form-container">
                    <li>
                      <Label>Email</Label>
                      <Input
                        name="email"
                        type="email"
                        required
                        onChange={this.handleInput}
                        placeholder="Enter your Email"
                      ></Input>
                    </li>
                    <li>
                      <Label>Address</Label>
                      <Input
                        name="address"
                        type="text"
                        required
                        onChange={this.handleInput}
                        placeholder="Enter your address"
                      ></Input>
                    </li>
                    <li>
                      <Button
                        className="checkoutBtn"
                        color="primary"
                        type="submit"
                      >
                        Checkout
                      </Button>
                    </li>
                  </ul>
                </Form>
              </div>
            </Fade>
          </Modal>
        }
        {this.props.redirectTo && <Redirect to={this.props.redirectTo} />}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
    redirectTo: state.cart.redirectTo,
  }),
  { createOrder }
)(Checkout);
