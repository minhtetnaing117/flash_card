import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("AUTH DATA:", data);
    console.log("AUTH ERROR:", error);

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }
    if (data){
        const email = data.user.email;
        const user = data.user;
        console.log("USER EMAIL:", email);
        console.log("USER DATA:", user);
    }
    // ✅ Successful login
    setLoading(false);
    navigate("/"); // or /admin
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" align="center">
          Admin Login
        </Typography>

        {errorMsg && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
