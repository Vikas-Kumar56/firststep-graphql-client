import React from "react";
import Layout from "./components/common/layout";
import { Route, Routes } from "react-router-dom";
import LoginContainer from "./components/login/LoginContainer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>Home Page</div>} />
        <Route path="/posts">
          <Route index element={<div>Post page</div>} />
          <Route path="new" element={<div>New Post</div>} />
        </Route>
        <Route path="/users" element={<div>User page</div>} />
        <Route path="/comments" element={<div>Comment page</div>} />
        <Route path="/my-posts" element={<div>My post</div>} />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<div>Register user</div>} />
      </Route>
    </Routes>
  );
}

export default App;
