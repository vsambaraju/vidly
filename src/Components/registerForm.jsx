import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./form";
import * as userService from "../services/userService";
import { loginWithJwt } from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {}
  };
  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = () => {
    userService
      .register(this.state.data)
      .then(response => {
        loginWithJwt(response.headers["x-auth-token"]);
        window.location = "/";
        console.log(response);
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          const errors = { ...this.state.errors };
          errors.username = err.response.data;
          this.setState({ errors });
        }
        console.log("Failed: " + err);
      });
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
