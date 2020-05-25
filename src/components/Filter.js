import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts, sortProducts } from "../actions/productAction";

class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <div className="filter-sort">
          <select
            value={this.props.sort}
            onChange={(e) =>
              this.props.sortProducts(this.props.products, e.target.value)
            }
          >
            <option value="latest">Latest</option>
            <option value="lowest">Low to High</option>
            <option value="highest">High to Low</option>
          </select>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    fetchProducts,
    sortProducts,
  }
)(Filter);
