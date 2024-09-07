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
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Dialog,
  DialogContent,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import picture from "../assets/outdoor-2.jpg";
import picture1 from "../assets/room-1.jpg";
import picture2 from "../assets/room-4.jpg";
import picture3 from "../assets/view-room-6.jpg";
import picture5 from "../assets/room-5.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/authSlice";
import RoomList from "./RoomList";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  // Opens dialog after Book button click
  const handleClickOpen = (room) => {
    setSelectedRoom(room);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRoom(null);
  };

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
          <Grid container spacing={4}>
            {roomData.map((room) => (
              <Grid item xs={12} md={6} lg={4} key={room.title}>
                <Card
                  sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white" }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={room.image}
                    alt={room.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{room.title}</Typography>
                    {/* Replace with rating component */}
                    <Typography>⭐⭐</Typography>
                  </CardContent>
                  <CardActions
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => handleClickOpen(room)}
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          {/* Room Details Dialog */}
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogContent>
              {selectedRoom && (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardMedia
                        component="img"
                        alt={selectedRoom.title}
                        height="300"
                        image={selectedRoom.image}
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {selectedRoom.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                      >
                        {selectedRoom.description}
                      </Typography>
                      <Typography variant="h6" component="div">
                        {selectedRoom.price}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClose}
                      >
                        Book
                      </Button>
                    </CardContent>
                  </Grid>
                </Grid>
              )}
            </DialogContent>
          </Dialog>
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

const roomData = [
  {
    title: "Closed View Room",
    description: `Single bed room is a modern, elegantly designed space 
                   featuring a plush king-size bed with high-quality linens, a cozy seating
                   area with a stylish armchair, and a sleek work desk. The room is equipped
                   with a large flat-screen TV, a minibar, and a coffee maker for added convenience.`,
    image: `${picture1}`,
    price: "R 1 500",
  },
  {
    title: "Outside View Room",
    description: `The dual bed room is a cozy yet spacious haven, 
                  featuring a king-sized bed with plush linens and pillows. 
                  Large windows allow natural light to flood the room, 
                  offering a stunning view of the city skyline. 
                  A sleek, modern desk provides ample workspace`,
    image: `${picture2}`,
    price: "R 1 500",
  },
  {
    title: "Top Garden Room",
    description: `The hotel room is a cozy yet spacious haven, 
                   featuring a king-sized bed with plush linens and pillows. 
                   Large windows allow natural light to flood the room, 
                   offering a stunning view of the city skyline. A sleek,
                   modern desk provides ample workspace`,
    image: `${picture5}`,
    price: "R 1 500",
  },
  {
    title: "Full 180° View Room",
    description: `The hotel room is a cozy yet spacious haven, 
                   featuring a king-sized bed with plush linens and pillows. 
                   Large windows allow natural light to flood the room, 
                   offering a stunning view of the city skyline. A sleek,
                    modern desk provides ample workspace`,
    image: `${picture3}`,
    price: "R 1 500",
  },
];

export default Home;
