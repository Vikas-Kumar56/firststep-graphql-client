import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Loader from "../common/Loader";
import { useAddPostsMutation } from "../../generated/graphql";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  title: yup.string().required("Please Enter title"),
  description: yup.string().required("Please Enter description"),
});

const AddPost = () => {
  const [addPost, { loading, error }] = useAddPostsMutation({
    fetchPolicy: "network-only",
  });

  const navigate = useNavigate();

  const postForm = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      addPost({
        variables: {
          title: values.title,
          description: values.description,
        },
      }).then(() => {
        navigate("/posts");
      });
    },
  });

  return (
    <Box sx={{ textAlign: "center", marginTop: "2em" }}>
      <Typography variant="h6">Add Post</Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <form
          onSubmit={postForm.handleSubmit}
          style={{ display: "flex", flexDirection: "column", width: "30%" }}
        >
          <TextField
            id="title"
            name="title"
            placeholder="Enter title"
            label="Title"
            sx={{ marginTop: "10px" }}
            variant="outlined"
            value={postForm.values.title}
            onChange={postForm.handleChange}
            onBlur={postForm.handleBlur}
            error={postForm.touched.title && Boolean(postForm.errors.title)}
            helperText={postForm.touched.title && postForm.errors.title}
          />
          <TextField
            type="description"
            id="description"
            name="description"
            placeholder="Enter description"
            label="description"
            sx={{ marginTop: "10px" }}
            variant="outlined"
            value={postForm.values.description}
            onChange={postForm.handleChange}
            onBlur={postForm.handleBlur}
            error={
              postForm.touched.description &&
              Boolean(postForm.errors.description)
            }
            helperText={
              postForm.touched.description && postForm.errors.description
            }
          />
          <Button variant="contained" type="submit" sx={{ marginTop: "10px" }}>
            Add Post
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

export default AddPost;
