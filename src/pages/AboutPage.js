// src/pages/AboutPage.js
import React from "react";
import { Container, Typography, Box, Link } from "@mui/material";

const AboutPage = () => {
    return (
        <Container maxWidth="sm" sx={{ py: 4, textAlign: "center", bgcolor: "#c38fff", minHeight: "100vh", marginTop: "24px", borderRadius: "8px" }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
                About Me
            </Typography>

            <Box sx={{ textAlign: "left", mt: 4 }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Name:</strong> Min Htet Naing
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Email:</strong> minhtetnaing117@gmail.com
                </Typography>


                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>LinkedIn:</strong>{" "}
                    <Link
                        href="https://www.linkedin.com/in/min-htet-naing-03290b268"
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        color="inherit"
                    >
                        www.linkedin.com/in/min-htet-naing-03290b268
                    </Link>
                </Typography>

            </Box>

            {/* <Typography variant="caption" sx={{ mt: 10, display: "block" }}>
                Created By MHN
            </Typography> */}
        </Container>
    );
};

export default AboutPage;
