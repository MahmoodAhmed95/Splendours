import "./MenuListItem.css";
import { Link } from "react-router-dom";
export default function MenuListItem({ menuItem, handleAddToOrder }) {
  return (
    <>
      <div
        className="MenuListItem"
        style={{
          backgroundImage: `url(${menuItem.profile_img})`,
          backgroundSize: "cover",
          // backgroundColor: `red`,
        }}
      >
        <Link to={`/details/${menuItem._id}`} className="details-link">
          <div className="name">Post Name :{menuItem.name}</div>
          <br />
          <div className="name">Post Description :{menuItem.description}</div>
          <br />
          <div className="name">Start Date :{menuItem.startDate}</div>
          <br />
          <div className="name">End Date :{menuItem.endDate}</div>
          <br />
          <div className="name">
            Time Duration :{menuItem.timeDuration} Hour
          </div>
          <br />
          <div className="name">Image :{menuItem.profile_img}</div>
          <br />
          <div className="name">Reviews: {menuItem.reviews}</div>
          <br />

          <span>Top Bid: ${menuItem.bidCost.toFixed(2)}</span>
        </Link>
      </div>
      <br />
    </>
  );
}
