import React from "react";
import Layout from "./components/common/layout";
import { Route, Routes } from "react-router-dom";
import LoginContainer from "./components/login/LoginContainer";
import RequireAuth from "./components/common/RequireAuth";
import PostContainer from "./components/posts/PostContainer";
import AddPost from "./components/posts/AddPost";
import RegisterUser from "./components/users/RegisterUser";
import UnAuthorized from "./components/common/UnAuthorized";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>Home Page</div>} />

        <Route element={<RequireAuth roles={["ROLE_ADMIN", "ROLE_VIEWER"]} />}>
          <Route path="/posts">
            {/* { Only allow access to ADMIN, VIEWER } */}
            <Route index element={<PostContainer />} />

            {/* { Only allow access to ADMIN } */}
            <Route element={<RequireAuth roles={["ROLE_ADMIN"]} />}>
              <Route path="new" element={<AddPost />} />
            </Route>
          </Route>

          {/* { Only allow access to ADMIN, VIEWER } */}
          <Route path="/users" element={<div>User page</div>} />
          <Route path="/comments" element={<div>Comment page</div>} />
          <Route path="/my-posts" element={<div>My post</div>} />
        </Route>

        {/* { public route  } */}
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/unauthorized" element={<UnAuthorized />} />
      </Route>
    </Routes>
  );
}

export default App;
