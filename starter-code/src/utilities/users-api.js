// API modules are where the code lives to communicate
// with the server via AJAX
import sendRequest from "./send-request";
const BASE_URL = "/api/users";

// Refactored code below
export function signUp(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}
export function update(userData) {
  return sendRequest(`${BASE_URL}/update`, "POST", userData);
}
export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}
