import React, { Component } from "react";
import formatCurrency from "../util/currency";
import Modal from "react-modal";
import { Button } from "reactstrap";

export default class ProductDetails extends Component {
  render() {
    return (
      <Modal isOpen={true} onRequestClose={this.props.closeModal}>
        <Button
          color="danger"
          className="close-modal"
          onClick={this.props.closeModal}
        >
          Close x
        </Button>
        <div className="product-details">
          <img
            src={this.props.product.image}
            alt={this.props.product.title}
          ></img>
          <div className="product-details-description">
            <p>
              <strong>{this.props.product.title}</strong>
            </p>
            <p>{this.props.product.description}</p>

            <div className="product-price">
              <div>{formatCurrency(this.props.product.price)}</div>
              <Button
                color="primary"
                onClick={() => {
                  this.props.addToCart(this.props.product);
                  this.props.closeModal();
                }}
              >
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
