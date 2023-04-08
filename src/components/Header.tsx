import React, { FC } from "react";
import { Toolbar, Typography, IconButton, Box } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import RegisterIcon from "@mui/icons-material/HowToReg";
import { Link } from "react-router-dom";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;

interface Props {
  open: boolean;
  handleDrawerOpen: () => void;
}

const StyledLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header: FC<Props> = ({ open, handleDrawerOpen }) => {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            width: "90%",
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <Typography variant="h6" noWrap component="div" mt={0.5}>
            Stack Overflow
          </Typography>
          <Box>
            <StyledLink to={"/login"}>
              <IconButton
                color="inherit"
                aria-label="login"
                onClick={() => {
                  console.log("login");
                }}
                edge="start"
                sx={{ mr: 2 }}
              >
                <LoginIcon />
              </IconButton>
            </StyledLink>
            <StyledLink to={"/register"}>
              <IconButton
                color="inherit"
                aria-label="regsiter"
                onClick={() => {
                  console.log("regsiter");
                }}
                edge="start"
                sx={{ mr: 2 }}
              >
                <RegisterIcon />
              </IconButton>
            </StyledLink>
            <StyledLink to={"/logout"}>
              <IconButton
                color="inherit"
                aria-label="logout"
                onClick={() => {
                  console.log("logout");
                }}
                edge="start"
                sx={{ mr: 2 }}
              >
                <LogoutIcon />
              </IconButton>
            </StyledLink>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
