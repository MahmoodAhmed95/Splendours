import { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./AuthPage.css"

export default function AuthPage({ user, setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main className="auth-page">
      <div> 
        <div className="logo-container">
          <img src="http://i.imgur.com/8J0TG8q.png" alt="Logo" className="authlogo" id="auth-logo" />
        </div>
        <div className="auth-content">
          {showSignUp ? (
            <SignUpForm setUser={setUser} user={user} />
          ) : (
            <LoginForm setUser={setUser} user={user} />
          )}
          <p>
            {showSignUp ? "Already have an account? " : "Don't have an account? "}
            <a onClick={() => setShowSignUp(!showSignUp)}>
              {showSignUp ? "Log In" : "Sign Up"}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
