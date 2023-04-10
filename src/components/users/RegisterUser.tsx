import { useFormik } from "formik";
import * as yup from "yup";
import { useAddUserMutation } from "../../generated/graphql";
import {
  Alert,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import Loader from "../common/Loader";
import { log } from "console";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  username: yup.string().required("Please Enter username"),
  password: yup.string().required("Please Enter password"),
  roles: yup
    .array()
    .min(1, "Please select roles")
    .required("Please select roles"),
});

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const roles = ["ROLE_ADMIN", "ROLE_VIEWER"];

const RegisterUser = () => {
  const theme = useTheme();
  const [adduser, { loading, error }] = useAddUserMutation();
  const navigate = useNavigate();

  const registerForm = useFormik({
    initialValues: {
      username: "",
      password: "",
      roles: [],
    },
    validationSchema,
    onSubmit: (values) => {
      adduser({
        variables: {
          name: values.username,
          password: values.password,
          roles: values.roles.join(", "),
        },
      }).then(() => {
        navigate("/login");
      });
    },
  });

  console.log(registerForm);

  return (
    <Box sx={{ textAlign: "center", marginTop: "2em" }}>
      <Typography variant="h6">Regsiter User</Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <form
          onSubmit={registerForm.handleSubmit}
          style={{ display: "flex", flexDirection: "column", width: "30%" }}
        >
          <TextField
            id="username"
            name="username"
            placeholder="Enter username"
            label="Usrname"
            sx={{ marginTop: "10px" }}
            variant="outlined"
            value={registerForm.values.username}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            error={
              registerForm.touched.username &&
              Boolean(registerForm.errors.username)
            }
            helperText={
              registerForm.touched.username && registerForm.errors.username
            }
          />
          <TextField
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            label="Password"
            sx={{ marginTop: "10px" }}
            variant="outlined"
            value={registerForm.values.password}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            error={
              registerForm.touched.password &&
              Boolean(registerForm.errors.password)
            }
            helperText={
              registerForm.touched.password && registerForm.errors.password
            }
          />
          <FormControl sx={{ mt: 2, width: "100%" }}>
            <InputLabel id="roles">Select Roles</InputLabel>
            <Select
              labelId="roles"
              id="roles"
              name="roles"
              multiple
              value={registerForm.values.roles}
              onChange={registerForm.handleChange}
              input={
                <OutlinedInput id="roles-select-multiple-chip" label="Chip" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
              error={
                registerForm.touched.roles && Boolean(registerForm.errors.roles)
              }
            >
              {roles.map((role) => (
                <MenuItem
                  key={role}
                  value={role}
                  style={getStyles(role, registerForm.values.roles, theme)}
                >
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" type="submit" sx={{ marginTop: "10px" }}>
            Register
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

export default RegisterUser;
