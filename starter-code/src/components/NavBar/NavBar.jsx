
import * as React from 'react';
import { styled, createTheme, ThemeProvider, useTheme } from '@mui/material/styles'; // Add useTheme import
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GavelIcon from '@mui/icons-material/Gavel';
import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import * as userService from '../../utilities/users-service';
import "./NavBar.css"

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// ... Rest of the code remains the same

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#ffffff", // Set primary color to white
    },
    background: {
      default: "#FFFCF1", // Set default background color to white
    },
    typography: {
      fontFamily: "Trocchi, serif", // Set the desired font family
    },
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,

    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ user, setUser }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleLogOut() {
    // Remove token using the user service
    userService.logOut();
    // Update user state in App
    setUser(null);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
            <img
        src="Splendoursside.png" 
        alt="Logo"
        className="logo"
        id="SideBar-logo"
      />
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <React.Fragment>
            <img
        src="logosolo.png" 
        alt="Logo"
        className="logosolo"
        id="SideBar-logo"
      />
            <span>Hello {user.name}</span>
              <ListItemButton>
                <Link style={{ textDecoration: "none" }} to="/">
                  <ListItemIcon>
                    <HomeIcon />                    
                  </ListItemIcon>
                  Home
                </Link>
              </ListItemButton>
              <ListItemButton>
                <Link style={{ textDecoration: "none" }} to="/bookmark">
                  <ListItemIcon>
                    <BookmarksIcon />
                  </ListItemIcon>
                  Bookmarks
                </Link>
              </ListItemButton>
              <ListItemButton>
                <Link style={{ textDecoration: "none" }} to="/userbids">
                  <ListItemIcon>
                    <LocalOfferIcon />
                  </ListItemIcon>
                  Bids
                </Link>
              </ListItemButton>
              <ListItemButton>
                <Link style={{ textDecoration: "none" }} to="/profile">
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  Profile
                </Link>
              </ListItemButton>

              {user && (
                <React.Fragment>
                  <ListItemButton>
                    {user.userType ? (
                      <Link style={{ textDecoration: "none" }} to="/myauctions">
                        <ListItemIcon>
                          <GavelIcon />
                        </ListItemIcon>
                        My Auctions
                      </Link>
                    ) : null}
                  </ListItemButton>
                  <ListItemButton>
                    {user.userType ? (
                      <Link style={{ textDecoration: "none" }} to="/newpost">
                        <ListItemIcon>
                          <CreateIcon />
                        </ListItemIcon>
                        New Post
                      </Link>
                    ) : null}
                  </ListItemButton>
                  <ListItemButton>
                    {user.isAdmin ? (
                      <Link style={{ textDecoration: "none" }} to="/admin">
                        <ListItemIcon>
                          <SettingsIcon />
                        </ListItemIcon>
                        Admin Page
                      </Link>
                    ) : null}
                  </ListItemButton>
                  <Divider />
                  <ListItemButton>
                    <div className="nav-button" onClick={handleLogOut}>
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      Log Out
                    </div>
                  </ListItemButton>
                </React.Fragment>
              )}
            </React.Fragment>
          </List>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
