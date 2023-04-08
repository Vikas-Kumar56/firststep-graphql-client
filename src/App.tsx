import React from "react";
import { Routes, Route } from "react-router-dom";
import HelloWorld from "./components/HelloWorld";
import Layout from "./components/Layout";
import LoginContainer from "./components/login/LoginContainer";
import PostContainer from "./components/posts/PostContainer";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/posts">
          <Route index element={<PostContainer />} />
          <Route path="new" element={<div>New Post</div>} />
        </Route>
        <Route path="/comments" element={<div>comments</div>} />
        <Route path="/users">
          <Route index element={<div>Users</div>} />
          <Route path=":userId/my-posts" element={<div>my-posts</div>} />
        </Route>
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/logout" element={<div>logout page</div>} />
        <Route path="/register" element={<div>register page</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
