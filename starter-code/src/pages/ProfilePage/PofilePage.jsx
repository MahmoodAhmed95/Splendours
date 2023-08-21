import { signUp } from "../../utilities/users-service";

export default function ProfilePage({ user }) {
  const disable = user.password !== user.confirm;
  // new cvode // // // // // //
  const handleSubmit = async (evt) => {
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
  };

  const handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };
  // // // untill here // // //
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
        </div>
      </div>
    </>
  );
}
