import http from "./httpService";
import { baseUrl } from "../config.json";

const apiEndpoint = `${baseUrl}/users`;

function register(user) {
  const userRefs = {
    name: user.name,
    email: user.email,
    password: user.password
  };
  return http.post(apiEndpoint, userRefs);
}

export default {
  register
};
