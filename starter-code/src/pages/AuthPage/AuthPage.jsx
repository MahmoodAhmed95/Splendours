import { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function AuthPage({ user, setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main>
      <h1>AuthPage</h1>
      {showSignUp ? (
        <SignUpForm setUser={setUser} user={user} />
      ) : (
        <LoginForm setUser={setUser} user={user} />
      )}
      {showSignUp ? (
        <p>already have an account?</p>
      ) : (
        <p>doesnt have an account?</p>
      )}
      <a onClick={() => setShowSignUp(!showSignUp)}>
        {showSignUp ? "Log In" : "Sign Up"}
      </a>
    </main>
  );
}
