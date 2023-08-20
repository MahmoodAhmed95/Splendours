import sendRequest from "./send-request";
const BASE_URL = "/api/categories";

export function addCategory(category) {
  return sendRequest(BASE_URL, "POST", category);
}
