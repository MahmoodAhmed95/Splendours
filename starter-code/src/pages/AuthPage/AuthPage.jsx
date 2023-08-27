import { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import ResetPass from "../../components/ResetPass/ResetPass";
import "./AuthPage.css";

export default function AuthPage({ user, setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showReset, setShowReset] = useState(false);
  return (
    <main className="auth-page">
      <div>
        <div className="logo-container">
          <img
            src="logoful.png"
            alt="Logo"
            className="authlogo"
            id="auth-logo"
          />
        </div>
        <div className="auth-content">
          {showSignUp ? (
            <SignUpForm setUser={setUser} user={user} />
          ) : showReset ? (
            <>
              <ResetPass setUser={setUser} user={user} />
              {"You Remember Your Password? "}
              <a onClick={() => setShowReset(!showReset)} className="auth-link">
                Login
              </a>
            </>
          ) : (
            <>
              <LoginForm setUser={setUser} user={user} />
              {"Forgot you Password? "}
              <a onClick={() => setShowReset(!showReset)} className="auth-link">
                Reset Password
              </a>
            </>
          )}
          <p>
            {showSignUp
              ? "Already have an account? "
              : "Don't have an account? "}
            <a onClick={() => setShowSignUp(!showSignUp)} className="auth-link">
              {showSignUp ? "Log In" : "Sign Up"}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
