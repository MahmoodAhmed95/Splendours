export default function AdminPage({ user }) {
  return (
    <>
      <h1>Admin Page</h1>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </>
  );
}
