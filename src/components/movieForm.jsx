import Joi from "joi-browser";
import React from "react";

import { getGenres } from "../services/genreService";
import { getMovie, updateOrSaveMovie } from "../services/movieService";
import Form from "./common/form";

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
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({
      genres
    });
  }

  async populateMovieForm() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({
        data: this.mapToViewModel(movie)
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovieForm();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = async () => {
    await updateOrSaveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    return (
      <div className="row">
        <div className="card col-7 mx-auto">
          <h1 className="card-header card-text text-center">Movie</h1>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("title", "Title")}
              {this.renderSelect("genreId", "Genre", this.state.genres)}
              {this.renderInput("numberInStock", "Number In Stock", "number")}
              {this.renderInput("dailyRentalRate", "Daily Rental Rate", "rate")}
              {this.renderButton("Save")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieForm;
