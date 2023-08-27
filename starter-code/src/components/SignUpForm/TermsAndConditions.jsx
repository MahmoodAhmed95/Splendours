import React from "react";
import { Link } from "react-router-dom"; // Import the Link component from React Router

function TermsAndConditions(props) {
  const handleAcceptance = () => {
    props.onAcceptTerms();
  };

  const handleNext = (evt) => {
    props.onSubmit(evt);
  };

  return (
    <div className="form-container">
      <h2>Terms and Conditions</h2>
      <label>
        <input
          type="checkbox"
          checked={props.acceptedTerms}
          onChange={handleAcceptance}
        />
        I accept the terms and conditions
      </label>
      <button onClick={handleNext}>Create Account</button>
    
    </div>
  );
}

export default TermsAndConditions;
