import React, { Component } from "react";
import Joi from "joi-browser";

import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateField = ({ name, value }) => {
    const field = { [name]: value };
    const subSchema = { [name]: this.schema[name] };
    const { error } = Joi.validate(field, subSchema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({
      errors: errors || {}
    });
    if (errors) return;

    // Call to server
    console.log("Submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorRef = this.validateField(input);
    if (errorRef) errors[input.name] = errorRef;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;

    this.setState({
      account,
      errors
    });
  };

  render() {
    const { account, errors } = this.state;

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
                error={errors.username}
              />
              <Input
                onChange={this.handleChange}
                value={account.password}
                name="password"
                label="Password"
                type="password"
                error={errors.password}
              />
              <button
                disabled={this.validate()}
                className="btn btn-primary btn-block"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
