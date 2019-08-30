import http from "../services/httpService";
import { baseUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = baseUrl + "/auth";

const tokenKey = "token";

http.setJwt(getJwt());

export function login(email, password) {
  return http.post(apiEndpoint, { email, password }).then(response => {
    const jwt = response.data;
    localStorage.setItem(tokenKey, jwt);
  });
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    console.log(jwt);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}
