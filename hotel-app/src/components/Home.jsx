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
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import picture from "../assets/outdoor-2.jpg";
import RoomList from "./RoomList";
import UserBookings from "./UserBookings";  
import { logoutUser, fetchUser } from "../Redux/authSlice"; 
import Footer from './Footer';

const Home = () => {
  const [accountOpen, setAccountOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

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
        setLogoutDialogOpen(true); // Open logout confirmation dialog
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
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              T.E. Hotels
            </Typography>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Contact Us</Button>
            <Button color="inherit">About Us</Button>
            <IconButton color="inherit">
              <FavoriteIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleAccountClickOpen}>
              <AccountCircleIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleLogout} disabled={loadingLogout}>
              {loadingLogout ? <CircularProgress size={24} color="inherit" /> : <LogoutIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 4 }}>
          <Box textAlign="center" sx={{ mb: 4 }}>
            <TextField
              variant="outlined"
              placeholder="Search"
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
            />
          </Box>

          <Box textAlign="center" sx={{ mb: 4 }}>
            <Typography variant="h4">
              Book a beautiful Accomodation to live in
            </Typography>
            <Typography variant="h6">
              Find a source you want to spend time in
            </Typography>
          </Box>

          {/* Use RoomList component to display rooms */}
          <RoomList />

          <br/>
          {/* Display user bookings */}
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
