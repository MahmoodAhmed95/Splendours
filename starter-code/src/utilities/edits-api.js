import sendRequest from "./send-request";

const BASE_URL = "/api/edits";

export function updateProfile(update) {
  return sendRequest(BASE_URL, "PUT", update);
}
