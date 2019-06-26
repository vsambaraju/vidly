import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./Components/Movies";
import NotFound from "./Components/NotFound";
import Customers from "./Components/Customers";
import Rentals from "./Components/Rentals";
import NavBar from "./Components/navBar";
import MovieForm from "./Components/MovieForm";
import LoginForm from "./Components/loginForm";
import RegisterForm from "./Components/registerForm";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main role="main" className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
