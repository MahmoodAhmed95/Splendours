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
      <Link to="/">Home</Link>
      &nbsp; | &nbsp;
      <Link to="/categories">Categories</Link>
      &nbsp; | &nbsp;
      <Link to="/bookmark">Book Mark</Link>
      &nbsp; | &nbsp;
      <Link to="/userbids">My bids</Link>
      &nbsp; | &nbsp;
      <Link to="/profile">My profile</Link>
      &nbsp; | &nbsp;
      {user.userType ? <Link to="/newpost">New Post</Link> : ""}
      &nbsp; &nbsp;
      {user.isAdmin ? <Link to="/admin">Admin Page</Link> : ""}
      &nbsp; &nbsp;
      <span>Welcome, {user.name}</span>
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogOut}>
        Log Out
      </Link>
    </nav>
  );
}
