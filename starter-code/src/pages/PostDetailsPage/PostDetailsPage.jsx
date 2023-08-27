import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardMedia, Typography, Button, IconButton } from "@mui/material";
import * as ordersAPI from "../../utilities/orders-api";
import * as itemsAPI from "../../utilities/items-api";
import GavelIcon from "@mui/icons-material/Gavel";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import "./PostDetailsPage.css";

export default function PostDetailsPage() {
  const [item, setItem] = useState("");
  const [bidder, setBidder] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchItems() {
      try {
        const fetchedItems = await itemsAPI.getById(id);
        setItem(fetchedItems);
      } catch (error) {
        console.error(error);
      }
    }
    fetchItems();
  }, [id,refresh]);

  useEffect(() => {
    async function setPrevBidder(itemId) {
      try {
        const setPrevBidder = await ordersAPI.setPrevBid(itemId);
        if (setPrevBidder !== null) {
          setBidder(setPrevBidder);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (item) {
      setPrevBidder(item._id);
    }
  }, [item]);

  async function handleAddToBookmarks(itemId) {
    try {
      await ordersAPI.addItemToBookmark(itemId);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSetBid(itemId) {
    try {
      const response = await ordersAPI.setNewBid(itemId);
      setRefresh((prevRefresh)=> !prevRefresh)
      setBidder(response.user.name);
      setItem(response.post);
    } catch (error) {
      console.error(error);
    }
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="mainCard">
      <Card className="card">
        <CardMedia
          component="img"
          height="200"
          image={item.image}
          alt="postImage"
        />
        <Typography variant="h6">{item.name}</Typography>
        <Typography>{item.description}</Typography>
        <Typography>{new Date(item.endDate).toLocaleDateString()}</Typography>
        <div className="auction">
          <Typography>Bid Increment: {item.increment}</Typography>
          <Typography variant="subtitle1">
            Latest Bid Price: {item.bidCost}
          </Typography>
          <Typography>Bidder: {bidder}</Typography>
          <IconButton onClick={() => handleSetBid(item._id)}>
            <GavelIcon />
          </IconButton>
        </div>
        <IconButton
          onClick={() => handleAddToBookmarks(item._id)}
          aria-label="Add to bookmarks"
        >
          <BookmarkBorderIcon />
        </IconButton>
      </Card>
    </div>
  );
}