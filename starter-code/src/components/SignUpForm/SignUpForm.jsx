import React, { Component } from "react";
import { signUp } from "../../utilities/users-service";
import AccountTypeSelection from "./AccountTypeSelection";
import AddressInput from "./AddressInput";
import PaymentMethod from "./PaymentMethod";
import TermsAndConditions from "./TermsAndConditions";
import WelcomePage from "./WelcomePage";

import "./SignUp.css";

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    userType: "",
    address: "",
    paymentMethod: "",
    acceptedTerms: false,
    error: "",
    step: 1,
  };

  setUserType = (userType) => {
    this.setState({ userType });
  };

  handleNextStep = () => {
    this.setState((prevState) => ({ step: prevState.step + 1 }));
  };

  handleAddressSubmit = (address) => {
    this.setState({ address }, this.handleNextStep);
  };

  handlePaymentSubmit = (paymentMethod) => {
    this.setState({ paymentMethod }, this.handleNextStep);
  };

  handleAcceptTerms = () => {
    this.setState((prevState) => ({ acceptedTerms: !prevState.acceptedTerms }));
  };

  handleCreateAccount = async (evt) => {
    //  account data creation logic here
    evt.preventDefault();
    try {
      const formData = { ...this.state };
      delete formData.confirm;
      delete formData.error;
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      // Update user state with user
      this.props.setUser(user);
    } catch {
      // Invalid signup
      this.setState({
        error: "Sign Up Failed - Try Again",
      });
    }

    // then goes to the Welcome Page
    this.handleNextStep();
  };

  // handleGoToHomepage = () => {
  // };

  handleChange = (evt) => {
    const { name, value } = evt.target;
    let error = "";

    if (name === "email") {
      // Email regex pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        error = "Invalid email address";
      }
    }

    this.setState({
      [name]: value,
      error: error,
    });
  };

  render() {
    const disable = this.state.password !== this.state.confirm;

    if (this.state.step === 1) {
      return (
        <div>
          <h1>SignUp</h1>
          <div className="form-container">
            <form autoComplete="off" onSubmit={this.handleNextStep}>
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
              <label>Enter Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirm"
                value={this.state.confirm}
                onChange={this.handleChange}
                required
              />
              <button type="submit" disabled={disable}>
                NEXT
              </button>
            </form>
          </div>
          <p className="error-message">&nbsp;{this.state.error}</p>
        </div>
      );
    } else if (this.state.step === 2) {
      return (
        <AccountTypeSelection
          setUserType={this.setUserType}
          onNext={this.handleNextStep}
        />
      );
    } else if (this.state.step === 3) {
      return (
        <AddressInput
          onSubmit={this.handleAddressSubmit}
          onNext={this.handleNextStep}
        />
      );
    } else if (this.state.step === 4) {
      return (
        <PaymentMethod
          onSubmit={this.handlePaymentSubmit}
          onNext={this.handleNextStep}
        />
      );
    } else if (this.state.step === 5) {
      return (
        <TermsAndConditions
          acceptedTerms={this.state.acceptedTerms}
          onAcceptTerms={this.handleAcceptTerms}
          onSubmit={this.handleCreateAccount}
        />
      );
    } else if (this.state.step === 6) {
      return <WelcomePage onGoToHomepage={this.handleGoToHomepage} />;
    }
    // Add similar conditions for other steps
  }
}
