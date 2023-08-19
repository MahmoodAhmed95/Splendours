import { signUp } from "../../utilities/users-service";

export default function ProfilePage({ user }) {
  const disable = user.password !== user.confirm;

  return (
    <>
      <h1>Profile Page</h1>
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={""}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder={user.name}
              onChange={"handleChange"}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder={user.email}
              onChange={"handleChange"}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder={""}
              onChange={""}
              required
            />
            <label>Confirm</label>
            <input
              type="password"
              name="confirm"
              placeholder={""}
              onChange={""}
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
