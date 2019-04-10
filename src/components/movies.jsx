import _ from "lodash";
import React, { Component } from "react";

import { getGenres } from "../services/mockGenreService";
import { getMovies } from "../services/mockMovieService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { colRefs: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres
    });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({
      movies
    });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({
      movies
    });
  };

  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };

  handleGenreSelect = genre => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({
      sortColumn
    });
  };

  fetchPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      movies: allMovies,
      selectedGenre
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(
      filtered,
      [sortColumn.colRefs],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumn,
      genres,
      selectedGenre
    } = this.state;

    if (count === 0) return <p>There's no movies in the database!</p>;

    const { totalCount, data: movies } = this.fetchPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>
            Showing
            <span className="badge badge-primary badge-pill m-1">
              {totalCount}
            </span>
            movies from the database!
          </p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />
          <Pagination
            onPageChange={this.handlePageChange}
            itemsCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
