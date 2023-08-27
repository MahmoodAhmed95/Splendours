// PaymentMethod.jsx
import React from "react";
import "./SignUp.css";

function PaymentMethod(props) {
  const handleNext = () => {
    props.onNext();
  };

  return (
    <div className="form-container">
      <h2>Payment Method</h2>
      <p>Choose your payment method:</p>

      
      {/* Add payment method options */}
      <button onClick={handleNext}>NEXT</button>
    </div>
  );
}

export default PaymentMethod;
