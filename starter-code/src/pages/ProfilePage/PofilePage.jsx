import { useState } from "react";
import * as editApi from "../../utilities/edits-api";

export default function ProfilePage({ user }) {
  const [alertMessage, setAlertMessage] = useState("");

  const [update, setUpdate] = useState({
    name: "",
    password: "",
    confirm: "",
  });
  // new cvode // // // // // //
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const pas = await editApi.updatePass(update);
      setUpdate(pas);
      setAlertMessage("Password Updated Successfully");
    } catch {
      setAlertMessage("Update Password Failed - Try Again");
    }
  };

  const handleChange = (evt) => {
    setUpdate({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };
  // // // untill here // // //
  const disable = user.password !== user.confirm;

  return (
    <>
      <h1>Profile Page</h1>
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder={user.name}
              onChange={handleChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder={""}
              onChange={handleChange}
              required
            />
            <label>Confirm</label>
            <input
              type="password"
              name="confirm"
              placeholder={""}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={disable}>
              Edit
            </button>
          </form>
          <p className="error-message">&nbsp;{alertMessage}</p>
        </div>
      </div>
    </>
  );
}
