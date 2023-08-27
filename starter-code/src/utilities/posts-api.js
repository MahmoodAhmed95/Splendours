import sendRequest from "./send-request";
const BASE_URL = "/api/posts";

export function addPost(post) {
  return sendRequest(BASE_URL, "POST", post);
}
export function showPost() {
  return sendRequest(BASE_URL);
}
export function deletePost(postSel) {
  return sendRequest(`${BASE_URL}/delete/${postSel}`, "DELETE");
}
