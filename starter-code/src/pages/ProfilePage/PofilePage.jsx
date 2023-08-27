import { useState } from "react";
import * as editApi from "../../utilities/edits-api";

export default function ProfilePage({ user }) {
  const [alertMessage, setAlertMessage] = useState("");
  const [update, setUpdate] = useState({
    name: user.name,
    password: "",
    confirm: "",
  });

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (update.password !== update.confirm) {
      setAlertMessage("Passwords do not match");
      return;
    }

    try {
      const updatedUser = await editApi.updateProfile(update);
      setUpdate({
        name: updatedUser.name,
        password: "",
        confirm: "",
      });
      setAlertMessage("Profile Updated Successfully");
    } catch (err) {
      setAlertMessage("Update Profile Failed - Try Again");
    }
  };

  const handleChange = (evt) => {
    setUpdate((prevUpdate) => ({
      ...prevUpdate,
      [evt.target.name]: evt.target.value,
    }));
  };

  const disable = update.password !== update.confirm;

  return (
    <>
      <h1>Edit Profile</h1>
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder={user.name}
              value={update.name}
              onChange={handleChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder={""}
              value={update.password}
              onChange={handleChange}
              required
            />
            <label>Confirm</label>
            <input
              type="password"
              name="confirm"
              placeholder={""}
              value={update.confirm}
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
