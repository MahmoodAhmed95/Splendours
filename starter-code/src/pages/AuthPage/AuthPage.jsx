import { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function AuthPage({ user, setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main className="auth-page">
        <div className="logo-container">
    <img src="http://i.imgur.com/Lp5HN9F.png" alt="Logo" className="logo" />
    <h1>MONSTERRA</h1>
    <h2>Where gardeners bloom and grow</h2>
  </div>
  <div className="auth-content">
      {showSignUp ? (
        <SignUpForm setUser={setUser} user={user} />
      ) : (
        <LoginForm setUser={setUser} user={user} />
      )}
      {showSignUp ? (
        <p>Already have an account?</p>
      ) : (
        <p>Don't have an account?</p>
      )}
      <a onClick={() => setShowSignUp(!showSignUp)}>
        {showSignUp ? "Log In" : "Sign Up"}
      </a>
      </div>
    </main>
  );
}


