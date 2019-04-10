import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" }
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({
      account
    });
  };

  render() {
    const { account } = this.state;

    return (
      <div className="row">
        <div className="card col-5 mx-auto">
          <h1 className="card-header card-text text-center">Login</h1>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <Input
                onChange={this.handleChange}
                value={account.username}
                name="username"
                label="Username"
                type="text"
              />
              <Input
                onChange={this.handleChange}
                value={account.password}
                name="password"
                label="Password"
                type="password"
              />
              <button className="btn btn-primary btn-block">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
