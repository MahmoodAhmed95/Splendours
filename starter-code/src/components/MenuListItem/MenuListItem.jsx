import './MenuListItem.css';
import { Link } from 'react-router-dom';


export default function MenuListItem({ menuItem, handleAddToOrder }) {
    return (
        <Link to={`/details/${menuItem._id}`} className="details-link">
      <div className="MenuListItem">
        <div className="emoji flex-ctr-ctr">{menuItem.emoji}</div>
        <div className="name">{menuItem.name}</div>
        <div className="buy">
          <span>${menuItem.price.toFixed(2)}</span>
          
        </div>          
      </div>
        </Link>
    );
  }