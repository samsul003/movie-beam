import http from "./httpService";
import { baseUrl } from "../config.json";

const apiEndpoint = `${baseUrl}/movies`;

function getMovies() {
  return http.get(apiEndpoint);
}

function getMovie(id) {
  return http.get(`${apiEndpoint}/${id}`);
}

function _saveMovie(movie) {
  return http.post(apiEndpoint, movie);
}

function _updateMovie(movie) {
  const movieRefs = { ...movie };
  delete movieRefs._id;
  return http.put(`${apiEndpoint}/${movie._id}`, movieRefs);
}

function updateOrSaveMovie(movie) {
  return movie._id ? _updateMovie(movie) : _saveMovie(movie);
}

function deleteMovie(id) {
  return http.delete(`${apiEndpoint}/${id}`);
}

export default {
  getMovies,
  getMovie,
  updateOrSaveMovie,
  deleteMovie
};
