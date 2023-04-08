import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLoginMutation } from "../../generated/graphql";
import Loader from "../common/Loader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../common/AuthProvider";
import { log } from "console";
import { useEffect } from "react";

const validationSchema = yup.object({
  username: yup.string().required("Please Enter username"),
  password: yup.string().required("Please Enter password"),
});

const LoginContainer = () => {
  const authActions = useAuth();
  const [login, { data, loading, error }] = useLoginMutation({
    fetchPolicy: "network-only",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (data && authActions) {
      authActions.saveToken(data.login);
      navigate("/");
    }
  }, [data, authActions]);

  const loginForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      login({
        variables: {
          username: values.username,
          password: values.password,
        },
      });
    },
  });

  return (
    <Box sx={{ textAlign: "center", marginTop: "2em" }}>
      <Typography variant="h6">Login</Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <form
          onSubmit={loginForm.handleSubmit}
          style={{ display: "flex", flexDirection: "column", width: "30%" }}
        >
          <TextField
            id="username"
            name="username"
            placeholder="Enter username"
            label="Usrname"
            sx={{ marginTop: "10px" }}
            variant="outlined"
            value={loginForm.values.username}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            error={
              loginForm.touched.username && Boolean(loginForm.errors.username)
            }
            helperText={loginForm.touched.username && loginForm.errors.username}
          />
          <TextField
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            label="Password"
            sx={{ marginTop: "10px" }}
            variant="outlined"
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            error={
              loginForm.touched.password && Boolean(loginForm.errors.password)
            }
            helperText={loginForm.touched.password && loginForm.errors.password}
          />
          <Button variant="contained" type="submit" sx={{ marginTop: "10px" }}>
            Login
          </Button>
          {error && (
            <Alert sx={{ marginTop: 2 }} severity="error">
              {error.message}, please try again.
            </Alert>
          )}
        </form>
        <Loader open={loading} />
      </Box>
    </Box>
  );
};

export default LoginContainer;
