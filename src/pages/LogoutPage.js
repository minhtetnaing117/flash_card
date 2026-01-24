import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Box, CircularProgress, Typography } from "@mui/material";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      navigate("/login", { replace: true });
    };

    logout();
  }, [navigate]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
      <Typography sx={{ mt: 2 }}>Logging out...</Typography>
    </Box>
  );
};

export default LogoutPage;
