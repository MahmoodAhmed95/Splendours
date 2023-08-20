export default function AdminPage({ user }) {
  return (
    <>
      <h1>Admin Page</h1>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <h2>Create Category</h2>
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
    </>
  );
}
