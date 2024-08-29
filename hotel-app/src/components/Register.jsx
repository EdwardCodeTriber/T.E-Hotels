import React from "react";
import {useNavigate} from "react-router-dom"
import picture from "../assets/outdoor-1.jpg"
import {
  Box,
  Typography,
  Button,
  TextField,
  Avatar,
  Container,
  Link,
} from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const toSignIn = (()=>{
    navigate("/Login")
  })
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
            onClick={toSignIn}
          >
            Register
          </Button>
        </Container>
        
      </Box>
      {/* Footer */}
      {/* <Box
          sx={{
            width: "100%",
            position: "absolute",
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "10px 0",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="white">
            © 2024 Thapelo Somo. All rights reserved.
          </Typography>
        </Box> */}
    </div>
  );
};

export default Register;
