// import cloudinary from "cloudinary";
import * as categoryApi from "../../utilities/categories-api";
import { React, useState, useEffect } from "react";
import * as postApi from "../../utilities/posts-api";
import "./NewPostPage.css";
export default function NewPostPage() {
  const [post, setPost] = useState({
    name: "",
    description: "",
    categoryId: "",
    bidCost: "",
    increment: "",
    endDate: "",
    image: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [category, setCategory] = useState([]);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(post);
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
      setCategory(categories);
    }
    returnCategories();
  }, []);

  // // // cloud // // //
  function handleImageUpload(evt) {
    // get the image uploaded in input file, it will be the first element in files arr
    const file = evt.target.files[0];
    console.log(file);

    TransformFileData(file);
  }
  // transfer file/image to base64 string
  function TransformFileData(file) {
    //The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
    // FileReader can only access the contents of files that the user has explicitly selected, either using an HTML <input type="file"> element or by drag and drop
    // filereader is js object
    const reader = new FileReader();

    if (file) {
      // Starts reading the contents of the specified Blob, once finished, the "result" attribute contains a data: URL representing the file's data.
      reader.readAsDataURL(file);
      // Fired when a read has completed, successfully or not.
      reader.onloadend = () => {
        console.log(reader.result);
        setPost({ ...post, image: reader.result });
        // setAlertMessage("");
      };
    } else {
      // no image
      setPost({ ...post, image: "" });
      setAlertMessage("ERROR");
    }
  }
  // Get tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split("T")[0];
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
            required
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
            required
          />
        </label>
        <br />
        <label>
          Category:
          <select
            name="categoryId"
            value={post.categoryId}
            onChange={handleOnChange}
            required
          >
            <option>Choose Category</option>
            {category.map((c) => {
              return (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              );
            })}
          </select>
        </label>
        <br />
        <label>
          Bid Start By BHD:
          <input
            type="number"
            name="bidCost"
            placeholder="Minimum 10BHD"
            value={post.bidCost}
            onChange={handleOnChange}
            min="10"
            required
          />
        </label>
        <br />
        <label>
          Increment:
          <input
            type="number"
            name="increment"
            value={post.increment}
            onChange={handleOnChange}
            required
          />
        </label>
        <br />
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            min={tomorrowFormatted}
            value={post.endDate}
            onChange={handleOnChange}
            required
          />
        </label>
        <br />
        <label>
          Post Image:
          <input
            type="file"
            name="image"
            accept="image/jpeg, image/png ,image/jpg"
            onChange={handleImageUpload}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <p className="error-message">&nbsp;{alertMessage}</p>
    </>
  );
}
