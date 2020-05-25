import React, { Component } from "react";
import formatCurrency from "../util/currency";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import { connect } from "react-redux";

import ProductDetails from "./ProductDetails";
import { fetchProducts } from "../actions/productAction";
import { addToCart } from "../actions/cartAction";
import ReactPaginate from "react-paginate";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      offset: 0,
      data: [],
      perPage: 6,
      currentPage: 0,
    };
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchProducts();

    // call api to find out the number of products
    fetch(
      `https://my-json-server.typicode.com/jagrati-goyal/react-mobile-store/products`
    )
      .then((response) => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
        return response.json();
      })
      .then((json) => {
        this.setState({
          pageCount: Math.ceil(json.length / this.state.perPage),
        });
      });
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    console.log("selectedpage", selectedPage);
    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.componentDidMount();
      }
    );
  };

  openModal = (product) => {
    this.setState({ product });
  };

  closeModal = () => {
    this.setState({ product: null });
  };

  render() {
    const { product } = this.state;
    return (
      <div>
        {!this.props.products ? (
          <div>Loading...</div>
        ) : (
          <ul className=" products">
            {this.props.products.length < 1 && (
              <div className="no-product">No Product found..</div>
            )}
            {this.props.products
              .slice(this.state.offset, this.state.offset + this.state.perPage)
              .map((product) => (
                <li
                  style={{
                    border: "1px solid green",
                    margin: "30px 30px 30px 30px",
                  }}
                  key={product.id}
                >
                  <div className="product">
                    <a
                      href={"#" + product.id}
                      onClick={() => this.openModal(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        width="350px"
                        height="350px"
                      ></img>
                      <div className="product-details">
                        <p>{product.title}</p>
                      </div>
                    </a>

                    <div className="product-price">
                      <div>{formatCurrency(product.price)}</div>
                      <Button
                        style={{ margin: "10px" }}
                        outline
                        color="info"
                        onClick={() => this.openModal(product)}
                      >
                        View
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => this.props.addToCart(product)}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
        {product && (
          <ProductDetails
            product={this.state.product}
            closeModal={this.closeModal}
            addToCart={this.props.addToCart}
          />
        )}
        <div className="pagination">
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.filteredItems,
  };
};

export default connect(mapStateToProps, {
  fetchProducts,
  addToCart,
})(Products);
