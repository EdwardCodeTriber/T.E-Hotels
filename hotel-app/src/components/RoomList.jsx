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
} from "@mui/material";

const RoomList = () => {
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.rooms);
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleClickOpen = (room) => {
    setSelectedRoom(room);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRoom(null);
  };

  const handleBooking = () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates");
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
        status:"Pending",
        picture: selectedRoom.imageBase64,
      })
    ).then(() => {
      alert("Room booked successfully!");
      setCheckInDate("");
      setCheckOutDate("");
      handleClose();
    });
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

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
    </div>
  );
};

export default RoomList;
