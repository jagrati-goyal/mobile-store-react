import React, { Component } from "react";
import { Button, Input, Label, Form } from "reactstrap";
import Modal from "react-modal";
import { userService } from "../service/user-service";

class Login extends Component {
  constructor(props) {
    super(props);
    userService.logout();
    this.state = {
      username: "",
      password: "",
      submitted: false,
      error: "",
      isOpen: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({
      isOpen: false,
    });
    this.props.history.push("/");
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password, returnUrl } = this.state;

    // stop here if form is invalid
    if (!(username && password)) {
      return;
    }

    userService.login(username, password).then(
      (user) => {
        const { from } = this.props.location.state || {
          from: { pathname: "/" },
        };
        this.props.history.push(from);
      },
      (error) => this.setState({ error })
    );
    e.preventDefault();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { username, password, submitted, error } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <Modal isOpen={this.state.isOpen} onRequestClose={this.closeModal}>
          <Form>
            <h2> Login Page </h2>
            <Button
              color="danger"
              className="close-modal"
              onClick={this.closeModal}
            >
              Close x
            </Button>
            <div className="product-details">
              <Label>User Name</Label>
              <Input
                id="username"
                type="text"
                name="username"
                value={username}
                onChange={this.handleChange}
                placeholder="Enter user name"
                required
              />
              {submitted && !username && (
                <div className="help-block">Username is required</div>
              )}
              <br />
              <br />
              <Label> Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                placeholder="Enter Password"
                required
              />
              {submitted && !password && (
                <div className="help-block">Password is required</div>
              )}
              <br />
              <br />
              <Button className="loginBtn" onClick={this.handleSubmit}>
                Login
              </Button>
            </div>
            {error && <div className={"alert alert-danger"}>{error}</div>}
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Login;
