import { useEffect, useState } from "react";
import * as ordersAPI from "../../utilities/orders-api";

export default function BookMarksPage() {
  const [bookmarks, setBookmarks] = useState([]);

  async function handleDelete(id) {
    await ordersAPI.deleteBookMark(id)
    
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


  console.log("bmark2")
  console.log(bookmarks)
  return (
    <div>
      <h1>Bookmarks</h1>
      {bookmarks.length === 0 ? (
        <p>No bookmarks found.</p>
      ) : (
        <ul>
          {bookmarks.map((bookmark) => (
            <li key={bookmark._id}>{bookmark.name} <button onClick={() => handleDelete(bookmark._id)}></button></li>
          ))}
        </ul>
      )}
    </div>
  );
}