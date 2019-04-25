import http from "./httpService";
import { baseUrl } from "../config.json";

const apiEndpoint = `${baseUrl}/movies`;

export function getMovies() {
  return http.get(`${apiEndpoint}`);
}

export function getMovie(id) {
  return http.get(`${apiEndpoint}/${id}`);
}

function saveMovie(movie) {
  return http.post(`${apiEndpoint}`, movie);
}

function updateMovie(movie) {
  const movieRefs = { ...movie };
  delete movieRefs._id;
  return http.put(`${apiEndpoint}/${movie._id}`, movieRefs);
}

export function updateOrSaveMovie(movie) {
  return movie._id ? updateMovie(movie) : saveMovie(movie);
}

export function deleteMovie(id) {
  return http.delete(`${apiEndpoint}/${id}`);
}
