import React, { ReactNode, useMemo, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Typography,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DescriptionIcon from "@mui/icons-material/Description";
import CommentIcon from "@mui/icons-material/QuestionAnswer";
import UserIcon from "@mui/icons-material/Person";
import AddPostIcon from "@mui/icons-material/PostAdd";
import Header from "./Header";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const StyledLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
  width: "100%",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface Props {
  children: ReactNode;
}

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const Layout: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const drawerOptions = useMemo(() => {
    return [
      {
        text: "Posts",
        icon: <DescriptionIcon />,
        url: "/posts",
      },
      {
        text: "Users",
        icon: <UserIcon />,
        url: "/users",
      },
      {
        text: "Comments",
        icon: <CommentIcon />,
        url: "/comments",
      },
      {
        text: "My Posts",
        icon: <DescriptionIcon />,
        url: "/users/1/my-posts",
      },
    ];
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerOptions.map((option) => (
            <ListItem key={option.text} disablePadding>
              <StyledLink to={option.url}>
                <ListItemButton>
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.text} />
                </ListItemButton>
              </StyledLink>
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListItem disablePadding>
          <StyledLink to={"/posts/new"}>
            <ListItemButton>
              <ListItemIcon>
                <AddPostIcon />
              </ListItemIcon>
              <ListItemText primary="New Post" />
            </ListItemButton>
          </StyledLink>
        </ListItem>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default Layout;
