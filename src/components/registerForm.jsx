import Joi from "joi-browser";
import React from "react";

import authService from "../services/authService";
import userService from "../services/userService";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { name: "", email: "", password: "" },
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .min(3)
      .max(25)
      .label("Name"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]{8,20}$/)
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { headers } = await userService.register(this.state.data);
      authService.loginWithJwt(headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.password = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="row">
        <div className="card col-5 mx-auto">
          <h1 className="card-header card-text text-center">Register</h1>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("name", "Name")}
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Register")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
