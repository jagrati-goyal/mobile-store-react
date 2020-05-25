import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Cart from "./Cart";
import * as actions from "../actions/cartAction";
import { Provider } from "react-redux";
import store from "../store/store";

configure({ adapter: new Adapter() });
describe("Cart", () => {
  let cart = mount(
    <Provider store={store}>
      <Cart />
    </Provider>
  );

  describe("actions", () => {
    it("should create an action to add a product", () => {
      const testProduct = {
        id: 13,
        image: "https://static.toiimg.com/photo/63393984/Samsung-Galaxy-J6.jpg",
        title: "Samsung Galaxy J6 Plus (4GB RAM, 64GB Storage)",
        description:
          "Camera: 13+5 MP Rear camera | 8 MP front camera. Display: 15.2 centimeters (6-inch) HD+ capacitive touchscreen display with 720x1480 pixels and 18:5:9 aspect ratio. Memory, Storage & SIM: 4GB RAM | 64GB storage expandable up to 512GB | Dual SIM (nano+nano) with dual standby (4G+4G). Operating System and Processor: Android v8.1 Oreo operating system operating system with 1.4GHz Qualcomm Snapdragon SD425 quad core processor. Battery: 3300 mAH lithium ion battery.",
        price: 12999,
      };

      const expectedAction = {
        type: actions.ADD_TO_CART,
        testProduct,
      };
      actions.addToCart(testProduct);
      expect(localStorage.getItem("cartItems")).toBeTruthy();
    });
  });
});
