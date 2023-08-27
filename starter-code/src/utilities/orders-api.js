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
export async function setNewBid(itemId) {
  return sendRequest(`${BASE_URL}/bids/items/${itemId}`, "POST");
}

export async function setPrevBid(itemId) {
  return sendRequest(`${BASE_URL}/bids/prevBidder/${itemId}`, "POST");
}

export async function getBids() {
  return await sendRequest(`${BASE_URL}/bids/items`);
}

export async function getAuctions() {
  return await sendRequest(`${BASE_URL}/auctions/items`);
}

export async function deleteAuction(auctionId) {
  return await sendRequest(`${BASE_URL}/auctions/${auctionId}`, "DELETE");
}
