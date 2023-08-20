import './MenuListItem.css';
import { Link } from 'react-router-dom';


export default function MenuListItem({ menuItem, handleAddToOrder }) {
    return (
        <Link to={`/details/${menuItem._id}`} className="details-link">
      <div className="MenuListItem">
        
        <div className="name">{menuItem.description}</div>
        <div className="name">{menuItem.startDate}</div>
        <div className="name">{menuItem.endDate}</div>
        <div className="name">{menuItem.timeDuration}</div>
        <div className="name">{menuItem.profile_img}</div>
        <div className="name">{menuItem.endDate}</div>


          <span>${menuItem.bidCost.toFixed(2)}</span>
          
        </div>          
      
        </Link>
    );
  }