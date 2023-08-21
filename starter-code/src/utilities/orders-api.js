import sendRequest from "./send-request";

const BASE_URL = "/api/orders";

// Add a post to the user's bookmarks
export function addItemToBookmark(itemId) {
  // Just send itemId for best security (no pricing)
  return sendRequest(`${BASE_URL}/bookmarks/items/${itemId}`, "POST");
}

export async function getBookmarks() {
  return await sendRequest(`${BASE_URL}/bookmarks/items`);
}

export async function deleteBookMark(bookMarkId) {
  return await sendRequest(`${BASE_URL}/bookmarks/${bookMarkId}`, "DELETE");
}
