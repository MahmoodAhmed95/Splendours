import { useState } from "react";
import * as resetApi from "../../utilities/resets-api";

export default function ResetPass({ user }) {
  const [alertMessage, setAlertMessage] = useState("");
  const [reset, setUpdate] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    confirm: "",
  });

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (reset.password !== reset.confirm) {
      setAlertMessage("Passwords do not match");
      return;
    }
    try {
      const reseti = await resetApi.resetPass(reset);
      setUpdate({
        name: "",
        email: "",
        address: "",
        password: "",
        confirm: "",
      });
      setAlertMessage(reseti.message);
    } catch (err) {
      setAlertMessage("Reset Password Failed - Try Again");
    }
  };

  const handleChange = (evt) => {
    setUpdate((prevUpdate) => ({
      ...prevUpdate,
      [evt.target.name]: evt.target.value,
    }));
  };

  const disable = reset.password !== reset.confirm;

  return (
    <>
      <h1>Reset Password</h1>
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={reset.name}
              onChange={handleChange}
              required
            />
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={reset.email}
              onChange={handleChange}
              required
            />
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={reset.address}
              onChange={handleChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder={""}
              value={reset.password}
              onChange={handleChange}
              required
            />
            <label>Confirm</label>
            <input
              type="password"
              name="confirm"
              placeholder={""}
              value={reset.confirm}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={disable}>
              Reset Password
            </button>
          </form>
          <p className="error-message">&nbsp;{alertMessage}</p>
        </div>
      </div>
    </>
  );
}
