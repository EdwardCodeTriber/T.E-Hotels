import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../Redux/roomSlice";
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
} from "@mui/material";

const RoomList = () => {
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.rooms);
  
  const [open, setOpen] = React.useState(false);
  const [selectedRoom, setSelectedRoom] = React.useState(null);

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
                  View
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
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomList;
