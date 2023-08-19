export default function AdminPage({ user }) {
  return (
    <>
      <h1>Admin Page</h1>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <div>
        <h1>Create Category</h1>
        <form onSubmit={"handleSubmit"}>
          <label>
            Category Name:
            <input type="text" value={"name"} onChange={"handleNameChange"} />
          </label>
          <br />
          <label>
            Category Icon:
            <input type="text" value={"icon"} onChange={"handleIconChange"} />
          </label>
          <br />
          <button type="submit">Create Category</button>
        </form>
      </div>
    </>
  );
}
