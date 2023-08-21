import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import HomePage from "../HomePage/HomePage";
import "./App.css";
import CategoriesPage from "../CategoriesPage/CategoriesPage";
import BookMarksPage from "../BookMarksPage/BookMarksPage";
import UserBidsPage from "../UserBidsPage/UserBidsPage";
import ProfilePage from "../ProfilePage/PofilePage";
import NewPostPage from "../NewPostPage/NewPostPage";
import AdminPage from "../AdminPage/AdminPage";
import PostDetailsPage from "../PostDetailsPage/PostDetailsPage";

function App() {
  const [user, setUser] = useState(getUser());
  // console.log("user");
  // console.log(user);

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* Route components in here */}
            <Route
              path="/"
              element={<HomePage user={user} setUser={setUser} />}
            />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/bookmark" element={<BookMarksPage />} />
            <Route path="/userbids" element={<UserBidsPage />} />
            <Route path="/details/:id" element={<PostDetailsPage />} />
            <Route
              path="/profile"
              element={<ProfilePage setUser={setUser} user={user} />}
            />
            {user.userType ? (
              <Route path="/newpost" element={<NewPostPage user={user} />} />
            ) : (
              ""
            )}
            {user.isAdmin ? (
              <Route path="/admin" element={<AdminPage user={user} />} />
            ) : (
              ""
            )}
          </Routes>
          {/* <h1>Home Page</h1> */}
        </>
      ) : (
        <AuthPage setUser={setUser} user={user} />
      )}
    </main>
  );
}

export default App;
