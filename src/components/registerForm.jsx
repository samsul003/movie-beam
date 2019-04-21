import Joi from "joi-browser";
import React from "react";

import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { fullName: "", email: "", password: "" },
    errors: {}
  };

  schema = {
    fullName: Joi.string()
      .required()
      .min(3)
      .max(25)
      .label("FullName"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]{8,20}$/)
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
          <h1 className="card-header card-text text-center">Register</h1>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("fullName", "FullName")}
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
