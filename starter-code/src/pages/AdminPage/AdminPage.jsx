import { useState, useEffect } from "react";
import * as categoryApi from "../../utilities/categories-api";
import * as postApi from "../../utilities/posts-api";

export default function AdminPage({ user }) {
  const [showAddCategory, setShowAddCategory] = useState(true);
  const [categorySel, setSelectedValue] = useState("");
  const [postSel, setPostSelectedValue] = useState("");
  const [category, setCategory] = useState({ name: "", icon: "" });
  const [allCategories, setAllCategories] = useState([{ name: "", icon: "" }]);
  const [refreshCat, setRefreshCat] = useState(false);
  const [refreshPost, setRefreshPost] = useState(false);
  const [allPosts, setAllPosts] = useState([{ name: "", icon: "" }]);

  const [alertMessage, setAlertMessage] = useState("");
  const [dAlertMessage, setDAlertMessage] = useState("");
  const [dPostAlertMessage, setDPostAlertMessage] = useState("");
  useEffect(() => {
    async function returnCategories() {
      const ac = await categoryApi.showCategory();
      setAllCategories(ac);
    }
    returnCategories();
  }, [refreshCat]);
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    async function returnPosts() {
      const P = await postApi.showPost();
      setAllPosts(P);
    }
    returnPosts();
  }, [refreshPost]);
  const handlePostSelectChange = (event) => {
    setPostSelectedValue(event.target.value);
  };
  async function handleDeleteSubmit(e) {
    e.preventDefault();
    try {
      const del = await categoryApi.deleteCategory(categorySel);
      setRefreshCat((prevRefreshCat) => !prevRefreshCat);
      setDAlertMessage(del.message);
      setAllCategories((prevCategories) =>
        prevCategories.filter((c) => c._id !== categorySel)
      );
    } catch (err) {
      setDAlertMessage("");
    }
  }
  async function handleDeletePost(e) {
    e.preventDefault();
    try {
      const delPost = await postApi.deletePost(postSel);
      setRefreshPost((prevRefreshPost) => !prevRefreshPost);
      setDPostAlertMessage(delPost.message);

      setAllPosts((prevPosts) => prevPosts.filter((p) => p._id !== postSel));
    } catch {
      setDPostAlertMessage("Deleting Post Failed - Try Again");
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const add = await categoryApi.addCategory(category);
      setAlertMessage(add.message);
    } catch {
      setAlertMessage("Failed To Add Category");
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

      <button onClick={() => setShowAddCategory(!showAddCategory)}>
        {showAddCategory ? "Delete Category & Post Form" : "Add Category Form"}
      </button>
      {showAddCategory ? (
        <>
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
            {/* <br />
            <label>
              Category Icon:
              <input
                type="text"
                name="icon"
                value={category.icon}
                onChange={handleOnChange}
              />
            </label> */}
            <br />
            <button type="submit">Create Category</button>
          </form>
          <p className="error-message">&nbsp;{alertMessage}</p>
        </>
      ) : (
        <>
          <h2>Delete Category</h2>
          <form onSubmit={handleDeleteSubmit}>
            <label>
              Category:
              <select
                name="categoryId"
                value={categorySel}
                onChange={handleSelectChange}
              >
                <option value="">select Category</option>

                {allCategories.map((c) => {
                  return (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <br />
            <button type="submit">Delete Category</button>
          </form>
          <p className="error-message">&nbsp;{dAlertMessage}</p>
          {/* delete post */}
          <h2>Delete Post</h2>
          <form onSubmit={handleDeletePost}>
            <label>
              Post:
              <select
                name="postId"
                value={postSel}
                onChange={handlePostSelectChange}
              >
                <option value="">select Post</option>
                {allPosts.map((p) => {
                  return (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <br />
            <button type="submit">Delete Post</button>
          </form>
          <p className="error-message">&nbsp;{dPostAlertMessage}</p>
        </>
      )}
    </>
  );
}
