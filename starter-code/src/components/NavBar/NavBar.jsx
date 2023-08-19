import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    // Remove token using the user service
    userService.logOut();
    // Update user state in App
    setUser(null);
  }

  return (
    <nav>
      <span>Welcome {user.name}</span>
      <Link to="/">Home</Link>
      <Link to="/categories">Categories</Link>
      <Link to="/bookmark">Book Mark</Link>
      <Link to="/userbids">My bids</Link>
      <Link to="/profile">My profile</Link>
      {user.userType ? <Link to="/newpost">New Post</Link> : ""}
      {user.isAdmin ? <Link to="/admin">Admin Page</Link> : ""}
      <Link to="" onClick={handleLogOut}>
        Log Out
      </Link>
    </nav>
  );
}
