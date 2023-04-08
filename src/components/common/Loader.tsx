import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { FC } from "react";

interface Props {
  open: boolean;
}

const Loader: FC<Props> = ({ open }) => {
  return (
    <Backdrop
      open={open}
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        color: "#ede0e0",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <CircularProgress color="inherit" />
      <Box mt={2}>
        <Typography variant="h6">Loading...</Typography>
        <Typography variant="body1">Please wait, dont refresh</Typography>
      </Box>
    </Backdrop>
  );
};

export default Loader;
