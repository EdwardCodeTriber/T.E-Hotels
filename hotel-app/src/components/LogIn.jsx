import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Avatar,
  Container,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import picture from "../assets/outdoor.jpg";
import { loginUser } from "../Redux/authSlice";

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.auth);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // SignIn function
  const handleLogIn = (e) => {
    e.preventDefault();

    dispatch(loginUser({ email, password })).then((result) => {
      
      // Introduce a 2.5 second delay for loader visibility
      setTimeout(() => {
        if (result.meta.requestStatus === "fulfilled") {
          setSnackbarMessage("Logged in successfully");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);

          // After 2.5 seconds, navigate to Home page
          setTimeout(() => {
            navigate("/Home");
          }, 2500);
        } else if (result.meta.requestStatus === "rejected") {
          setSnackbarMessage("Login failed: " + result.payload);
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        }
      }, 2500); // Delay the loader by 2.5 seconds
    });
  };

  return (
    <div>
      <Box
        sx={{
          backgroundImage: `url(${picture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          maxWidth="xs"
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            borderRadius: "8px",
            padding: "32px",
            textAlign: "center",
          }}
        >
          {/* Logo Section */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Avatar alt="Logo" src="/Logo.png" sx={{ width: 80, height: 80 }} />
          </Box>

          {/* Login Form */}
          <Typography component="h1" variant="h5" color="white" sx={{ mb: 3 }}>
            Login
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "white",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "white",
                },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "white",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "white",
                },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
          />
          <Typography variant="body2" color="white" sx={{ mt: 2, mb: 2 }}>
            Don't have an account?{" "}
            <Link to="/Register" underline="hover" color="primary">
              Register
            </Link>
          </Typography>

          {/* Conditional rendering of loader */}
          {loading ? (
            <CircularProgress sx={{ color: "white", mt: 3, mb: 2 }} />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "green" }}
              onClick={handleLogIn}
            >
              Sign In
            </Button>
          )}

          {/* Error Message */}
          {error && <Typography color="error">{error}</Typography>}

          {/* Snackbar for Success/Error messages */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </div>
  );
};

export default LogIn;
