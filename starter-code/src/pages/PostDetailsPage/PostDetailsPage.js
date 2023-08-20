import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import * as ordersAPI from "../../utilities/orders-api";
import { Link, useNavigate } from "react-router-dom";
import * as itemsAPI from "../../utilities/items-api";

export default function PostDetailsPage() {
  const [items, setItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchItems() {
      const fetchedItems = await itemsAPI.getById(id);
      setItems(fetchedItems);
    }

    fetchItems();
  }, []);

  const navigate = useNavigate();
  const item = items.find((item) => item._id === id);
  const [cart, setCart] = useState(null);
  async function handleAddToOrder(itemId) {
    // alert(`add item: ${itemId}`);
    // 1. Call the addItemToCart function in ordersAPI, passing to it the itemId, and assign the resolved promise to a variable named cart.
    const cart = await ordersAPI.addItemToCart(itemId);
    // 2. Update the cart state with the updated cart received from the server
    setCart(cart);
  }

  // Add this function
  async function handleChangeQty(itemId, newQty) {
    const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
    setCart(updatedCart);
  }

  async function handleCheckout() {
    await ordersAPI.checkout();
    navigate("/orders");
  }
  if (!item) {
    return <div>item not found</div>;
  }

  return (
    <nav>
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
          <div>{item.reviews.content}</div>
          <div>{item.reviews.rating}</div>
          <div>{item.reviews.userName}</div>
          <img src={item.posterPath} alt="pic" />
        </div>
      </div>
    </nav>
  );
}
