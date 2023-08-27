import React from "react";
import "./SignUp.css"; 

function AccountTypeSelection(props) {
  const handleSelection = (userType) => {
    props.setUserType(userType);
    props.onNext();
  };

  return (
    <div>
    <div className="account-type-body">
       
      <div className="suwelcome">Welcome! </div>
      <div className="suwelcome1">Select Your Account Type </div>

      <div className="account-type-container">

        <form>
          <button
            className="account-button"
            onClick={() => handleSelection(false)}
          >
           <div className="ac-type"> Personal Account</div>
           <div className="ac-info"> Browse, connect, and bid on your favorite plants</div>
          </button>
          <button
            className="account-button"
            onClick={() => handleSelection(true)}
          >
            <div className="ac-type"> Business Account</div>
            <div className="ac-info">Sell, trade, and auction your homegrown plants.</div>
          </button>
          
        </form>
      </div>
    </div>
    </div>
  );
}

export default AccountTypeSelection;
