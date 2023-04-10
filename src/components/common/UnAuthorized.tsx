import { Alert } from "@mui/material";

const UnAuthorized = () => {
  return (
    <Alert sx={{ marginTop: 2 }} severity="error">
      You dont have required perssion.
    </Alert>
  );
};

export default UnAuthorized;
