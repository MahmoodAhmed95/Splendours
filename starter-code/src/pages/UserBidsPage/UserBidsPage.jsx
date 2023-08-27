import { useEffect, useState } from "react";
import * as ordersAPI from "../../utilities/orders-api";
import { Link } from "react-router-dom";

export default function UserBidsPage({user, setUser}) {
  const [bids, setBids] = useState([]);
  const [currentBidders, setCurrentBidders] = useState([]);

  useEffect(() => {
    async function fetchBids() {
      try {
        const fetchedBids = await ordersAPI.getBids();
        setBids(fetchedBids.bids);
        setCurrentBidders(fetchedBids.currentBidders);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBids();
  }, []);

  const checkAuctionStatus = (bid, currentBidder) => {
    if(new Date(bid.endDate) > new Date()) {
      return 'Still in auction';
    } else {
      return currentBidder._id === user._id ? 'Won' : 'Lost';
    }
  }

  return (
    <div>
      <h1>Bids</h1>
      {bids.length === 0 ? (
        <p>No bids found.</p>
      ) : (
        <div className="mainCard">
          {bids.map((bid, index) => (
            <Link to={`/details/${bid._id}`} className="details-link" key={bid._id}>
              <div className="card">
              <img className="postPic" src={bid.image} alt="postImage" />
              <div className="mainInfo">
                <div>{bid.name}</div>
                <div>{bid.description}</div>
                <div>{new Date(bid.endDate).toLocaleDateString()}</div>
                </div>
                <div className="auction">
                <div>Current Bidder: {currentBidders[index]?.name}</div>
                <div>{bid.bidCost}</div>
                <div>{checkAuctionStatus(bid, currentBidders[index])}</div>
              </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}