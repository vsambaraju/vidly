import http from "../services/httpService";
import { baseUrl } from "../config.json";

const apiEndpoint = baseUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
