import React from "react";
import { Link } from "react-router-dom"; // Import the Link component from React Router

function WelcomePage(props) {
  return (
    <div className="welcome-container">
      <h2>Welcome to Monsterra!</h2>
      <p>Your account has been successfully created.</p>
      <Link to="/">Go to Homepage</Link>
    </div>
  );
}

export default WelcomePage;
