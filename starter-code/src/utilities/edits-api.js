import sendRequest from "./send-request";
const BASE_URL = "/api/edits";

export function updatePass(update) {
  return sendRequest(BASE_URL, "POST", update);
}
