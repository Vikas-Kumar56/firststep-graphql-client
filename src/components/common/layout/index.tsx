import React, { ReactNode, useMemo, useState } from "react";
import Header from "./Header";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DescriptionIcon from "@mui/icons-material/Description";
import CommentIcon from "@mui/icons-material/QuestionAnswer";
import UserIcon from "@mui/icons-material/Person";
import AddPostIcon from "@mui/icons-material/PostAdd";
import { Link, Outlet } from "react-router-dom";

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

const Layout: React.FC<{}> = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
        url: "/my-posts",
      },
    ];
  }, []);

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
                  <ListItemText>{option.text}</ListItemText>
                </ListItemButton>
              </StyledLink>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <StyledLink to="/posts/new">
              <ListItemButton>
                <ListItemIcon>
                  <AddPostIcon />
                </ListItemIcon>
                <ListItemText>New Post</ListItemText>
              </ListItemButton>
            </StyledLink>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};

export default Layout;
