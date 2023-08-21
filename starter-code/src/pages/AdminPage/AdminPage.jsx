import { useState } from "react";
import * as categoryApi from "../../utilities/categories-api";
import * as userApi from "../../utilities/users-api";

export default function AdminPage({ user }) {
  const [u, setU] = useState([]);
  const [category, setCategory] = useState({ name: "", icon: "" });
  const [alertMessage, setAlertMessage] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const catg = await categoryApi.addCategory(category);
      setCategory(catg);
      setAlertMessage("Category Added Successfully");
    } catch {
      setAlertMessage("Add category Failed - Try Again");
    }
  }
  function handleOnChange(e) {
    setCategory({ ...category, [e.target.name]: e.target.value });
    setAlertMessage("");
  }
  return (
    <>
      <h1>Admin Page</h1>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Category Name:
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleOnChange}
          />
        </label>
        <br />
        <label>
          Category Icon:
          <input
            type="text"
            name="icon"
            value={category.icon}
            onChange={handleOnChange}
          />
        </label>
        <br />
        <button type="submit">Create Category</button>
      </form>
      <p className="error-message">&nbsp;{alertMessage}</p>
    </>
  );
}
