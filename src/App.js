import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Newsfeed from "./pages/Newsfeed";
import Profile from "./pages/Profile/Profile";
import WriteStory from "./pages/WriteStory";
import Stories from "./pages/Stories/Stories";
import Settings from "./pages/Settings";
import Suggested from "./pages/Suggested";
import PageNotFound from "./pages/PageNotFound";
import StoryCard from "./components/StoryCard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/resetpassword/:id" element={<ResetPassword />} />
        <Route path="/newsfeed" element={<Newsfeed />} />
        <Route exact path="/stories/:storyID" element={<Stories />} />
        <Route exact path="/profile/:username" element={<Profile />} />
        <Route path="/writestory" element={<WriteStory />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/suggested" element={<Suggested />} />
        <Route path="/storycard" element={<StoryCard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
