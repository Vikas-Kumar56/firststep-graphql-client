import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";
import * as yup from "yup";

interface Props {
  onSubmit: (values: string) => void;
  disabled: boolean;
}

const validationSchema = yup.object({
  text: yup.string().required("Please Enter comment"),
});

const AddComment: FC<Props> = ({ onSubmit, disabled }) => {
  const commentForm = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values.text);
    },
  });

  return (
    <Box mb={2}>
      <form
        style={{
          marginLeft: "15px",
        }}
        onSubmit={commentForm.handleSubmit}
      >
        <TextField
          id="text"
          name="text"
          placeholder="Enter comemnt"
          label="text"
          size="small"
          sx={{ marginTop: "10px" }}
          variant="outlined"
          value={commentForm.values.text}
          onChange={commentForm.handleChange}
          onBlur={commentForm.handleBlur}
          error={commentForm.touched.text && Boolean(commentForm.errors.text)}
          helperText={commentForm.touched.text && commentForm.errors.text}
        />
        <Button
          sx={{ marginLeft: "10px", marginTop: "10px" }}
          variant="outlined"
          type="submit"
          disabled={disabled}
        >
          {disabled ? "Adding" : "Add comment"}
        </Button>
      </form>
    </Box>
  );
};

export default AddComment;
