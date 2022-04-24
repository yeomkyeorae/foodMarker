import axios from "axios";
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, AUTH_USER } from "./types";

export function loginUser(dataToSubmit: { email: string, password: string}): { type: string, payload: Promise<{ loginSuccess: boolean, name: string, userId: string}> } {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then(response => response.data );

  return {
    type: LOGIN_USER,
    payload: request
  };
}

export function logoutUser(): { type: string, payload: Promise<{ success: boolean }> }{
  const request = axios
    .get("/api/users/logout")
    .then(response => response.data);

  return {
    type: LOGOUT_USER,
    payload: request
  };
}

export function registerUser(dataToSubmit: { email: string, name: string, password: string }): { type: string, payload: Promise<{ success: boolean }>} {
  const request = axios
    .post("/api/users/signup", dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: request
  };
}

export function auth(): { type: string, payload: Promise<{ isAuth: boolean, error: boolean }> } {
  const request = axios.get("/api/users/auth").then(response => response.data);

  return {
    type: AUTH_USER,
    payload: request
  };
}
