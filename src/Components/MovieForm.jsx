import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number().label("Number In Stock"),
    dailyRentalRate: Joi.number().label("Rate")
  };

  populateGenres() {
    let genres = [];
    getGenres().then(response => {
      genres = [...response.data];
      this.setState({ genres });
    });
  }

  populateMovies() {
    const movieId = this.props.match.params.id;
    console.log(movieId);
    if (movieId === "new") return;

    getMovie(movieId)
      .then(response => {
        const movie = response.data;
        this.setState({ data: this.mapToViewModel(movie) });
      })
      .catch(ex => {
        if (ex.response && ex.response.status === 404)
          this.props.history.replace("/not-found");
      });
  }

  componentDidMount() {
    this.populateGenres();
    this.populateMovies();
  }

  mapToViewModel(movie) {
    console.log(movie);
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = () => {
    console.log("data:", this.state.data);
    saveMovie(this.state.data)
      .then(response => {
        console.log(response);
        this.props.history.push("/movies");
      })
      .catch(ex => {
        console.log(ex);
        this.props.history.push("/movies");
      });
  };

  render() {
    return (
      <div>
        <h1>MovieForm {this.props.match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderDropDown("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
