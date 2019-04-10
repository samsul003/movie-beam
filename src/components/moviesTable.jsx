import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    {
      colRefs: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { colRefs: "genre.name", label: "Genre" },
    { colRefs: "numberInStock", label: "Stock" },
    { colRefs: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like onLike={() => this.props.onLike(movie)} liked={movie.liked} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={movies}
      />
    );
  }
}

MoviesTable.propTypes = {
  movies: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default MoviesTable;
