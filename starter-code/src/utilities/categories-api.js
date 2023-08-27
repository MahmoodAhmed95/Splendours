import sendRequest from "./send-request";
const BASE_URL = "/api/categories";

export function addCategory(category) {
  return sendRequest(BASE_URL, "POST", category);
}
export function showCategory() {
  return sendRequest(BASE_URL);
}
export function deleteCategory(categorySel) {
  return sendRequest(`${BASE_URL}/delete/${categorySel}`, "DELETE");
}
