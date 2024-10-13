import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu"; 
import picture from "../assets/outdoor-2.jpg";
import UserBookings from "./UserBookings";  
import { logoutUser, fetchUser } from "../Redux/authSlice"; 
import Footer from './Footer';
import AccommodationList from "./AccommodationList";

const Home = () => {
  const [accountOpen, setAccountOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredAccommodations, setFilteredAccommodations] = useState([]); // State for filtered accommodations

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector((state) => state.auth.user);
  const accommodations = useSelector((state) => state.accommodations.accommodations); // Select accommodations from state

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Function to filter accommodations based on search term
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = accommodations.filter((accommodation) =>
      accommodation.location.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredAccommodations(filtered); // Update filtered accommodations immediately
  };

  const handleAccountClickOpen = () => {
    setAccountOpen(true);
  };

  const handleAccountClose = () => {
    setAccountOpen(false);
  };

  const handleLogout = () => {
    setLoadingLogout(true);
    dispatch(logoutUser()).then(() => {
      setTimeout(() => {
        setSnackbarMessage("Logged out successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setLogoutDialogOpen(true); 
      }, 1500); // 1.5 seconds delay for logout
    }).finally(() => {
      setLoadingLogout(false);
    });
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    navigate("/LogIn");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div>
      <Box
        sx={{
          backgroundImage: `url(${picture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: "#172554" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              T.E. Hotels
            </Typography>
            <IconButton color="inherit" onClick={handleAccountClickOpen}>
              <AccountCircleIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleLogout} disabled={loadingLogout}>
              {loadingLogout ? <CircularProgress size={24} color="inherit" /> : <LogoutIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{color:"blue"}}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button onClick={() => navigate("/gallery")}>
                <ListItemText primary="Gallery" />
              </ListItem>
              <ListItem button onClick={() => navigate("/accommodations")}>
                <ListItemText primary="Accommodations" />
              </ListItem>
              <ListItem button onClick={() => navigate("/favorites")}>
                <ListItemText primary="Favorites" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        <Container sx={{ mt: 4 }}>
          <Box textAlign="center" sx={{ mb: 4 }}>
            <TextField
              variant="outlined"
              placeholder="Search by location"
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
              value={searchTerm} // Bind the input to searchTerm
              onChange={handleSearchChange} // Call the search function directly on input change
            />
          </Box>

          <Box textAlign="center" sx={{ mb: 4 }}>
            <Typography variant="h4">
              Book a beautiful Accommodation to live in
            </Typography>
            <Typography variant="h6">
              Find a source you want to spend time in
            </Typography>
          </Box>

          {/* Pass filtered accommodations to the AccommodationList component */}
          <AccommodationList accommodations={filteredAccommodations} /> 

          <br />
          <UserBookings />

          {/* Account Info Dialog */}
          <Dialog
            open={accountOpen}
            onClose={handleAccountClose}
            fullWidth
            maxWidth="xs"
          >
            <DialogContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Account Information
              </Typography>
              {user ? (
                <Box>
                  <Typography variant="body1">Email: {user.email}</Typography>
                </Box>
              ) : (
                <Typography variant="body1">
                  No user information available
                </Typography>
              )}
            </DialogContent>
          </Dialog>

          {/* Logout Confirmation Dialog */}
          <Dialog
            open={logoutDialogOpen}
            onClose={() => setLogoutDialogOpen(false)}
          >
            <DialogContent>
              <Typography variant="h6">You have logged out successfully!</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleLogoutConfirm} color="primary">
                Go to Login
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
        
        {/* Snackbar for alerts */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

        {/* Add Footer here */}
        <Footer />
      </Box>
    </div>
  );
};

export default Home;
