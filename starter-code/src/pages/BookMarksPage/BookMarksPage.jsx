import { useEffect, useState } from "react";
import * as ordersAPI from "../../utilities/orders-api";
import { Link } from "react-router-dom";
import "./BookMarksPage.css"; // Import a CSS file to style the cards

export default function BookMarksPage() {
  const [bookmarks, setBookmarks] = useState([]);

  async function handleDelete(id) {
    await ordersAPI.deleteBookMark(id);
    // After deletion, you can also update the bookmarks state to remove the deleted bookmark
    setBookmarks(bookmarks.filter((bookmark) => bookmark._id !== id));
  }

  useEffect(() => {
    async function fetchBookmarks() {
      try {
        const fetchedBookmarks = await ordersAPI.getBookmarks();

        if (Array.isArray(fetchedBookmarks)) {
          setBookmarks(fetchedBookmarks);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchBookmarks();
  }, []);

  return (
    <div className="bookmark-list">
      <h1>Bookmarks</h1>
      {bookmarks.length === 0 ? (
        <p>No bookmarks found.</p>
      ) : (
        <div className="cards-container">
          {bookmarks.map((bookmark) => (
            <div key={bookmark._id} className="card">
              <Link to={`/details/${bookmark._id}`} className="details-link">
                <div
                  className="card-bg"
                  style={{ backgroundImage: `url(${bookmark.image})` }}
                >
                  <div className="overlay">
                    <div className="card-content">
                      <div className="card-title">{bookmark.name}</div>
                      <div className="card-bid">${bookmark.bidCost}</div>
                    </div>
                  </div>
                </div>
              </Link>
              <button onClick={() => handleDelete(bookmark._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
