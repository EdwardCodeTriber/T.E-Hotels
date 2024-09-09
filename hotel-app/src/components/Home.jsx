import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import picture from "../assets/outdoor-2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/authSlice";
import RoomList from "./RoomList";
import UserBookings from "./UserBookings";

const Home = () => {
  
  const [accountOpen, setAccountOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  

  // Opens account dialog when Account button is clicked
  const handleAccountClickOpen = () => {
    setAccountOpen(true);
  };

  const handleAccountClose = () => {
    setAccountOpen(false);
  };

  // Logout function
  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      alert("Logged out successfully");
      navigate("/LogIn");
    });
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
        <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
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
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
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
              Book a beautiful room to live in
            </Typography>
            <Typography variant="h6">
              Find a source you want to spend time in
            </Typography>
          </Box>
          {/* Use RoomList component to display rooms */}
          <RoomList />
          
          <UserBookings/>
          
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
        </Container>
      </Box>
    </div>
  );
};



export default Home;
