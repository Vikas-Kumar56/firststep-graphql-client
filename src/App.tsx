import React from "react";
import Layout from "./components/common/layout";
import { Route, Routes } from "react-router-dom";
import LoginContainer from "./components/login/LoginContainer";
import RequireAuth from "./components/common/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>Home Page</div>} />

        <Route element={<RequireAuth roles={["ROLE_ADMIN", "ROLE_VIEWER"]} />}>
          <Route path="/posts">
            {/* { Only allow access to ADMIN, VIEWER } */}
            <Route index element={<div>Post page</div>} />

            {/* { Only allow access to ADMIN } */}
            <Route element={<RequireAuth roles={["ROLE_ADMIN"]} />}>
              <Route path="new" element={<div>New Post</div>} />
            </Route>
          </Route>

          {/* { Only allow access to ADMIN, VIEWER } */}
          <Route path="/users" element={<div>User page</div>} />
          <Route path="/comments" element={<div>Comment page</div>} />
          <Route path="/my-posts" element={<div>My post</div>} />
        </Route>

        {/* { public route  } */}
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<div>Register user</div>} />
        <Route
          path="/unauthorized"
          element={<div>You dont have required permission</div>}
        />
      </Route>
    </Routes>
  );
}

export default App;
