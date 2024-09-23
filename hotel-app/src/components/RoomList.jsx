import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../Redux/roomSlice";
import { saveBooking } from "../Redux/bookingSlice";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Dialog,
  DialogContent,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const RoomList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { rooms, loading } = useSelector((state) => state.rooms);
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleClickOpen = (room) => {
    // Check if the user is logged in
    if (!user) {
      setSnackbarMessage("You need to be logged in to book a room");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      // Redirect to login page if not logged in
      navigate("/login"); 
      return;
    }

    setSelectedRoom(room);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRoom(null);
  };

  const handleBooking = () => {
    if (!checkInDate || !checkOutDate) {
      setSnackbarMessage("Please select check-in and check-out dates");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    // Save the booking using Redux action
    dispatch(
      saveBooking({
        roomId: selectedRoom.id,
        roomType: selectedRoom.roomType,
        price: selectedRoom.price,
        checkInDate,
        checkOutDate,
        status: "Pending",
        paid:"Not yet",
        picture: selectedRoom.imageBase64,
      })
    ).then(() => {
      setSnackbarMessage("Room booked successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setCheckInDate("");
      setCheckOutDate("");
      handleClose();
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Grid container spacing={4}>
        {rooms.map((room) => (
          <Grid item xs={12} md={6} lg={4} key={room.id}>
            <Card sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white" }}>
              <CardMedia
                component="img"
                height="140"
                image={room.imageBase64}
                alt={room.roomType}
              />
              <CardContent>
                <Typography variant="h6">{room.roomType}</Typography>
                <Typography>{room.description}</Typography>
                <Typography>Price: R {room.price}</Typography>
                <Typography>Capacity: {room.capacity}</Typography>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  onClick={() => handleClickOpen(room)}
                  sx={{backgroundColor:"#115e59"}}
                >
                  View & Book
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {selectedRoom && (
            <div>
              <img
                src={selectedRoom.imageBase64}
                alt={selectedRoom.roomType}
                style={{ width: "100%" }}
              />
              <Typography variant="h5">{selectedRoom.roomType}</Typography>
              <Typography>{selectedRoom.description}</Typography>
              <Typography>Price: R{selectedRoom.price}</Typography>
              <Typography>Capacity: {selectedRoom.capacity}</Typography>

              <TextField
                label="Check-In Date"
                type="date"
                fullWidth
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                sx={{ mt: 2 }}
              />
              <TextField
                label="Check-Out Date"
                type="date"
                fullWidth
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                sx={{ mt: 2 }}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleBooking}
                sx={{ mt: 3 }}
              >
                Book Now
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
    </div>
  );
};

export default RoomList;
