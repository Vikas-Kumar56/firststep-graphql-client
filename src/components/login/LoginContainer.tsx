import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useLoginMutation } from "../../generated/graphql";
import * as yup from "yup";
import { useFormik } from "formik";
import Loader from "../common/Loader";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  username: yup.string().required("Please enter username"),
  password: yup.string().required("Please enter password"),
});

const LoginContainer = () => {
  const [login, { data, error, loading }] = useLoginMutation({
    fetchPolicy: "network-only",
  });

  const navigate = useNavigate();

  const loginForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("values", values);
      login({
        variables: {
          username: values.username,
          password: values.password,
        },
      }).then(() => {
        console.log("called");
        data?.login && localStorage.setItem("token", data.login);
        navigate("/posts");
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
            label="Username"
            value={loginForm.values.username}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            variant="outlined"
            error={
              loginForm.touched.username && Boolean(loginForm.errors.username)
            }
            helperText={loginForm.touched.username && loginForm.errors.username}
            sx={{ marginTop: "10px" }}
          />
          <TextField
            id="password"
            name="password"
            placeholder="Enter password"
            label="Password"
            type="password"
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            variant="outlined"
            error={
              loginForm.touched.password && Boolean(loginForm.errors.password)
            }
            helperText={loginForm.touched.password && loginForm.errors.password}
            sx={{ marginTop: "10px" }}
          />
          <Button variant="contained" type="submit" sx={{ marginTop: "10px" }}>
            Login
          </Button>
          {error && (
            <Box mt={2}>
              <Alert severity="error">{error.message}, please try again.</Alert>
            </Box>
          )}
        </form>
      </Box>
      <Loader open={loading} />
    </Box>
  );
};

export default LoginContainer;
