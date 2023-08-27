import React, { useState } from "react";
import "./SignUp.css"; 

function AddressInput(props) {
  const [address, setAddress] = useState("");

  const handleAddressSubmit = (evt) => {
    evt.preventDefault();
    props.onSubmit(address);
  };

  const handleAddressChange = (evt) => {
    setAddress(evt.target.value);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleAddressSubmit}>
        <h2>Enter Your Address</h2>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleAddressChange}
            required
          />
        </label>
        <button type="submit">NEXT</button>
      </form>
    </div>
  );
}

export default AddressInput;
