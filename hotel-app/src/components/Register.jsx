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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // const toSignIn = (()=>{
  //   navigate("/Login")
  // })

  // handles inputs
  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    // try {
    //   await createUserWithEmailAndPassword(auth, email, password);
    //   console.log("Account Created");
    // } catch (err) {
    //   console.log(err);
    // }
    dispatch(registerUser({ email, password }));
    alert("Account registerd")
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    navigate("/LogIn")
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
          {error && <Typography color="error">{error}</Typography>}
          <Typography variant="body2" color="white" sx={{ mt: 2, mb: 2 }}>
            By clicking on Register You agree with our{" "}
            <Link href="#" underline="hover" color="primary">
              Terms & Conditions
            </Link>
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: "green" }}
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </Container>
      </Box>
    </div>
  );
};

export default Register;
