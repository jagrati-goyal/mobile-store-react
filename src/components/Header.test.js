import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import store from "../store/store";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

configure({ adapter: new Adapter() });
describe("Header", () => {
  let header = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );

  describe("test rendering the form", () => {
    it("should not present Form component", () => {
      expect(header.find("Form").exists()).toBe(false);
    });

    it("renders a Input component", () => {
      expect(header.find("Input").exists()).toBe(true);
    });

    it("renders a Login button", () => {
      expect(header.find(".warning").at(1).text()).toEqual("Login");
    });
  });
});
