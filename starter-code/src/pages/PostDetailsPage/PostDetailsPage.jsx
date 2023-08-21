import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import * as ordersAPI from "../../utilities/orders-api";
import { Link, useNavigate } from "react-router-dom";
import * as itemsAPI from "../../utilities/items-api";

export default function PostDetailsPage() {
  const [item, setItem] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchItems() {
      // console.log(`does front end work? 1`);
      const fetchedItems = await itemsAPI.getById(id);
      setItem(fetchedItems);
      // console.log(`does front end work?`);
    }

    fetchItems();
  }, []);

  const navigate = useNavigate();
  const [cart, setCart] = useState(null);

  function handleAddToBookmarks(itemId) {
    // Add an item to bookmarks page
    ordersAPI.addItemToBookmark(itemId);
  }

  // Add this function
  // async function handleChangeQty(itemId, newQty) {
  //   const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
  //   setCart(updatedCart);
  // }

  // async function handleCheckout() {
  //   await ordersAPI.checkout();
  //   navigate("/orders");
  // }
  if (!item) {
    return <div>item not found</div>;
  }

  return (
    <div className="mainCard">
      <div className="card">
        <div>{item.name}</div>
        <div>{item.description}</div>
        <div>{item.bidCost}</div>
        <div>{item.startDate}</div>
        <div>{item.endDate}</div>
        <div>{item.timeDuration}</div>
        <div>{item.profile_img}</div>
        <div>{item.cloudinary_id}</div>
        <div>{item.user}</div>
        <div>{item.userName}</div>
        {item.reviews && item.reviews.content && (
          <div>{item.reviews.content}</div>
        )}
        {item.reviews && item.reviews.rating && (
          <div>{item.reviews.rating}</div>
        )}
        {item.reviews && item.reviews.userName && (
          <div>{item.reviews.userName}</div>
        )}
        <div>
          <button onClick={() => handleAddToBookmarks(item._id)}>Add to bookmarks</button>
        </div>
      </div>
    </div>
  );
}
