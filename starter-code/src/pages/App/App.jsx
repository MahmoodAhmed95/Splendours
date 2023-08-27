import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import HomePage from "../HomePage/HomePage";
import "./App.css";
import BookMarksPage from "../BookMarksPage/BookMarksPage";
import UserBidsPage from "../UserBidsPage/UserBidsPage";
import ProfilePage from "../ProfilePage/PofilePage";
import NewPostPage from "../NewPostPage/NewPostPage";
import AdminPage from "../AdminPage/AdminPage";
import PostDetailsPage from "../PostDetailsPage/PostDetailsPage";
import MyAuctionsPage from "../MyAuctionsPage/MyAuctionsPage";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <div className="App">
      {user ? (
        <>
        <div className="content">
          <div className="navbar">
          <NavBar className="app-navbar" user={user} setUser={setUser} />
          </div>
          <div className="app-content">
            <Routes>
              <Route
                path="/"
                element={<HomePage user={user} setUser={setUser} />}
              />
              <Route path="/bookmark" element={<BookMarksPage />} />
              <Route path="/userbids" element={<UserBidsPage />} />
              <Route path="/details/:id" element={<PostDetailsPage />} />
              <Route
                path="/profile"
                element={<ProfilePage setUser={setUser} user={user} />}
              />
              {user.userType ? (
                <>
                <Route path="/newpost" element={<NewPostPage />} />
                <Route path="/myauctions" element={<MyAuctionsPage user={user}/>} />
                </>
              ) : null}

              {user.isAdmin ? (
                <Route path="/admin" element={<AdminPage user={user} />} />
              ) : null}
            </Routes>
          </div>
          </div>
        </>
      ) : (
        <AuthPage className="auth-page" setUser={setUser} user={user} />
      )}
    </div>
  );
}

export default App;
