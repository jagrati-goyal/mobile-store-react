import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Checkout from "./Checkout";
import { Provider } from "react-redux";
import store from "../store/store";

configure({ adapter: new Adapter() });
describe("Checkout", () => {
  let checkout = mount(
    <Provider store={store}>
      <Checkout />
    </Provider>
  );

  describe("test rendering the form", () => {
    it("creates a Form component", () => {
      expect(checkout.find("Form").exists()).toBe(true);
    });

    it("renders a Input component", () => {
      expect(checkout.find("Input").exists()).toBe(true);
    });

    it("renders a Checkout button", () => {
      expect(checkout.find(".checkoutBtn").at(0).text()).toEqual("Checkout");
    });
  });
});
