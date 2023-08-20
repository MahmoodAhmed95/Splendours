import sendRequest from "./send-request";
const BASE_URL = "/api/details";

export function showDetails() {
  return sendRequest(BASE_URL);
}
