import Joi from "joi-browser";
import React from "react";

import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    // Call to server
    console.log("Submitted");
  };

  render() {
    return (
      <div className="row">
        <div className="card col-5 mx-auto">
          <h1 className="card-header card-text text-center">Login</h1>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Login")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
