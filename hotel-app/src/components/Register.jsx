import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import picture from "../assets/outdoor-1.jpg";
import {
  Box,
  Typography,
  Button,
  TextField,
  Avatar,
  Container,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsOpen, setTermsOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(""); 
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); 

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setPassword("");
      setConfirmPassword("");
      return;
    }

    // Dispatch registration and add delay
    dispatch(registerUser({ email, password })).then((result) => {
      setTimeout(() => {
        if (result.meta.requestStatus === "fulfilled") {
          setSnackbarMessage("Account registered successfully");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);

          // After the delay, navigate to the login page
          setTimeout(() => {
            navigate("/LogIn");
          }, 2500);
        } else {
          setSnackbarMessage("Registration failed: " + result.payload);
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }

        // Clear form fields
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }, 2500); // 2.5-second delay for loader visibility
    });
  };

  const handleTermsOpen = () => {
    setTermsOpen(true);
  };

  const handleTermsClose = () => {
    setTermsOpen(false);
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

          {/* Registration Form */}
          <Typography component="h1" variant="h5" color="white" sx={{ mb: 3 }}>
            Register
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {/* {error && <Typography color="error">{error}</Typography>} */}
          <Typography variant="body2" color="white" sx={{ mt: 2, mb: 2 }}>
            By clicking on Register You agree with our{" "}
            <Link
              href="#"
              underline="hover"
              color="primary"
              onClick={handleTermsOpen}
            >
              Terms & Conditions
            </Link>
          </Typography>

          {/* Conditional rendering of loader */}
          {loading ? (
            <CircularProgress sx={{ color: "white", mt: 2 }} />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, backgroundColor: "green" }}
              onClick={handleRegister}
            >
              Register
            </Button>
          )}

          {/* Terms & Conditions Dialog */}
          <Dialog
            open={termsOpen}
            onClose={handleTermsClose}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>Terms & Conditions</DialogTitle>
            <DialogContent>
              <Typography variant="body2">
                Your privacy is important to us. By using our services, you
                agree to the collection and use of your data as outlined in our
                Privacy Policy. We do not share your information with third
                parties without consent.
                <br />
                <br />
                Please read the full Terms and Conditions and Privacy Policy to
                understand how we collect, use, and protect your information.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleTermsClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleSnackbarClose}
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

export default Register;
