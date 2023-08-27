import { useEffect, useState } from "react";
import * as ordersAPI from "../../utilities/orders-api";
import "./MyAuctionsPage.css";

export default function MyAuctionsPage({ user, setUser }) {
  const [bids, setBids] = useState([]);
  const [currentBidders, setCurrentBidders] = useState([]);

  useEffect(() => {
    async function fetchAuctions() {
      try {
        const auctions = await ordersAPI.getAuctions();
        
        setBids(auctions);
        setCurrentBidders(auctions);
        

      } catch (error) {
        console.error(error);
      }
    }

    fetchAuctions();
  }, []);

  async function handleDelete(id) {
    await ordersAPI.deleteAuction(id);
  }

  const checkAuctionStatus = (bid, currentBidder) => {
    if (new Date(bid.endDate) > new Date()) {
      return "Still in auction";
    } else {
      return "Auction Completed";
    }
  };
  const correctGrammer = (bid) => {
    if (new Date(bid.endDate) > new Date()) {
      return "CurrentBidder: ";
    } else {
      return "Person who won the bid: ";
    }
  };
  return (
    <div>
      <h1>Auctions</h1>
      {bids.length === 0 ? (
        <p>No Auction found.</p>
      ) : (
        <div className="mainCard">
          {bids.map((bid, index) => (
            <div
              to={`/details/${bid._id}`}
              className="details-link"
              key={bid._id}
            >
              <div className="card">
                <img className="postPic" src={bid.image} alt="postImage" />
                <div className="mainInfo">
                  <div>{bid.name}</div>
                  <div>{bid.description}</div>
                  <div>{new Date(bid.endDate).toLocaleDateString()}</div>
                </div>
                <div className="auction">
                  <div>{correctGrammer(bid)} {bid.currentBidder ? bid.currentBidder.name : "No Current Bidder"}</div>
                  <div>{bid.bidCost}</div>
                  <div>{checkAuctionStatus(bid, currentBidders[index])}</div>
                  {bid.currentBidder ? "" : <button onClick={() => handleDelete(bid._id)}>Delete</button>}

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
