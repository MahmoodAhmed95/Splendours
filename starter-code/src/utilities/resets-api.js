import sendRequest from "./send-request";

const BASE_URL = "/api/resets";

export function resetPass(reset) {
  return sendRequest(BASE_URL, "PUT", reset);
}
