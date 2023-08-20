import * as categoryApi from "../../utilities/categories-api";
import { useState , useEffect } from "react";
import * as postApi from "../../utilities/posts-api";
export default function NewPostPage() {
  const [post, setPost] = useState({
    name: "",
    description: "",
    categoryId: "",
    bidCost: "",
    startDate: "",
    endDate: "",
    timeDuration: "",
    profile_img: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [category, setCategory] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const pos = await postApi.addPost(post);
      setPost(pos);
      setAlertMessage("Post Added Successfully");
    } catch {
      setAlertMessage("Add new Post Failed - Try Again");
    }
  }
  function handleOnChange(e) {
    setPost({ ...post, [e.target.name]: e.target.value });
    setAlertMessage("");
  }
  useEffect(() => {
    async function returnCategories() {
      const categories = await categoryApi.showCategory();
      // console.log(categories);
      setCategory(categories)
    }
    returnCategories();
  }, []);
  return (
    <>
      <h1>New Post Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={post.name}
            onChange={handleOnChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={post.description}
            onChange={handleOnChange}
          />
        </label>
        <br />
        <label>
          Category:
          <select
            name="categoryId"
            value={post.categoryId}
            onChange={handleOnChange}
          >
            {category.map((c)=>{
              return <option key={c._id} value={c._id}>{c.name}</option>
            })}
            {/* <option value="category1">category 1</option>
            <option value="category2">category 2</option>
            <option value="category3">category 3</option> */}
          </select>
        </label>
        <br />
        <label>
          Bid Start By BHD:
          <input
            type="number"
            name="bidCost"
            placeholder="Minimum 50BHD"
            value={post.bidCost}
            onChange={handleOnChange}
          />
        </label>
        <br />
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={post.startDate}
            onChange={handleOnChange}
          />
        </label>
        <br />
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={post.endDate}
            onChange={handleOnChange}
          />
        </label>
        <br />
        <label>
          Time Duration:
          <input
            type="count"
            name="timeDuration"
            value={post.timeDuration}
            onChange={handleOnChange}
          />
        </label>
        <br />
        <label>
          Post Image:
          <input
            type="file"
            name="profile_img"
            value={post.profile_img}
            onChange={handleOnChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <p className="error-message">&nbsp;{alertMessage}</p>
    </>
  );
}
