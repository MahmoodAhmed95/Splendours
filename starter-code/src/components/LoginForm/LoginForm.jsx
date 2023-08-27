import { useState } from "react";
import * as usersService from "../../utilities/users-service";
export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }
  // handle submit for login
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user.user);
      setError(user.message);
    } catch {
      setError("Log In Failed - Try Again");
      setError("Log In Failed Attempt 1 of 3 - Try Again");
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="title">Email </div>
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            className="input-box"
          />
          <div className="title">Password </div>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="input-box"
          />
          <div className="btn">
            <button type="submit">LOG IN</button>
          </div>
        </form>
      </div>

      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
