import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./form";
import * as loginService from "../services/authService";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: ""
    },
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

  doSubmit = () => {
    const { data } = this.state;
    const { state } = this.props.location;
    loginService
      .login(data.username, data.password)
      .then(response => {
        window.location = state ? state.from.pathname : "/";
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          const errors = { ...this.state.errors };
          errors.username = err.response.data;
          this.setState({ errors });
          console.log("failed: " + err);
        }
      });
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
