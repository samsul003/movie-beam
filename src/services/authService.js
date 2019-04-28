import http from "./httpService";
import { baseUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = `${baseUrl}/auth`;
const tokenKey = "token";

async function loginWithCredential(credential) {
  const credentialRefs = {
    email: credential.email,
    password: credential.password
  };
  const { data: jwt } = await http.post(apiEndpoint, credentialRefs);
  localStorage.setItem(tokenKey, jwt);
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  loginWithCredential,
  loginWithJwt,
  logout,
  getCurrentUser
};
