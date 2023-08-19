export default function NewPostPage({ user }) {
  return (
    <>
      <h1>New Post Page</h1>
      <form action="/submit" method="POST">
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" required />
        </label>
        <br />
        <label>
          Category:
          <select name="categoryId" required>
            <option value="category1">category 1</option>
            <option value="category2">category 2</option>
            <option value="category3">category 3</option>
          </select>
        </label>
        <br />
        <label>
          Bid Cost By BHD:
          <input type="number" name="bidCost" placeholder="Minimum 50BHD" />
        </label>
        <br />
        <label>
          Start Date:
          <input type="date" name="startDate" />
        </label>
        <br />
        <label>
          End Date:
          <input type="date" name="endDate" />
        </label>
        <br />
        <label>
          Time Duration:
          <input type="count" name="timeDuration" value="Not specified" />
        </label>
        <br />
        <label>
          Post Image:
          <input type="file" name="profile_img" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
