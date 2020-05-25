import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Login from "./Login";

configure({ adapter: new Adapter() });
describe("Login", () => {
  let login = mount(<Login />);

  describe("test rendering the form", () => {
    it("creates a Form component", () => {
      expect(login.find("Form").exists()).toBe(true);
    });

    it("renders a Input component", () => {
      expect(login.find("Input").exists()).toBe(true);
    });

    it("renders a Login button", () => {
      expect(login.find(".loginBtn").at(0).text()).toEqual("Login");
    });
  });

  describe("when logged in a user", () => {
    let username = "admin";
    let password = "password";

    beforeEach(() => {
      //   login.find("#username").simulate("change", {
      //     target: { value: username },
      //   });
      login.setState({
        username: username,
        password: password,
      });
    });

    it("updates the username in state", () => {
      expect(login.state().username).toEqual(username);
    });

    it("updates the password in state", () => {
      //   login.find("#password").simulate("change", {
      //     target: { value: password },
      //   });

      expect(login.state().password).toEqual(password);
    });

    describe("and click on login button", () => {
      beforeEach(() => {
        login.find(".loginBtn").at(0).simulate("click");
      });

      it("adds user data to localstorage", () => {
        console.log(localStorage.getItem("user"));
        expect(localStorage.getItem("user")).toEqual(null);
      });
    });
  });
});
