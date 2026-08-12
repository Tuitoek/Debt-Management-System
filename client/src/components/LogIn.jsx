import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LogIn = ({onClose}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <Container className = "border border-gray-300 rounded-lg " maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
    <button type="button" onClick={onClose}> Back to Page</button>
    </div>
  );
};

export default LogIn;
