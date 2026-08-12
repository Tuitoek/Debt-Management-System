import React, { useState } from "react";
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  CircularProgress 
} from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LogIn = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
    } catch (err) {
      console.error("Error signing in:", err);
      // Cleans up standard Firebase error strings for cleaner UI display
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Container 
        className="border border-gray-300 rounded-lg bg-white p-6 shadow-md" 
        maxWidth="xs"
      >
        <Box 
          component="form" 
          onSubmit={handleLogin}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Sign In
          </Typography>

          {/* Display Firebase errors if present */}
          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <TextField
            margin="normal"
            required
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
            disabled={loading}
            sx={{ mt: 3, mb: 1 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
          </Button>

          <Button
            fullWidth
            variant="text"
            color="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Back to Page
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default LogIn;