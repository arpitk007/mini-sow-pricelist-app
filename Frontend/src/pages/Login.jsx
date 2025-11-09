import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  useMediaQuery,
  useTheme,
  Fade,
  Slide,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [language, setLanguage] = useState("en");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCard, setShowCard] = useState(false);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    const timeout = setTimeout(() => setShowCard(true), 150);
    return () => clearTimeout(timeout);
  }, []);

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "en" ? "sv" : "en"));

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Store token
      localStorage.setItem("token", res.data.token);
      setLoading(false);
      navigate("/pricelist");
    } catch (err) {
      setLoading(false);
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        backgroundImage:
          'url("https://storage.123fakturera.se/public/wallpapers/sverige43.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.25) 100%)",
          zIndex: 0,
        }}
      />

      {/* Header */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 3, sm: 6, md: 8 },
          py: { xs: 2.5, sm: 3 },
          mt: { xs: 0.5, sm: 1 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            transition: "transform 0.2s ease",
            "&:hover": { transform: "scale(1.05)" },
          }}
        >
          <img
            src="https://storage.123fakturera.se/public/icons/diamond.png"
            alt="diamond"
            width={isMobile ? 32 : 40}
            height={isMobile ? 32 : 40}
            style={{ objectFit: "contain" }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#fff",
              fontSize: { xs: "1.05rem", sm: "1.25rem" },
              textShadow: "0 1px 3px rgba(0,0,0,0.6)",
              letterSpacing: "0.5px",
              userSelect: "none",
            }}
          >
            123 Fakturera
          </Typography>
        </Box>

        <IconButton
          onClick={toggleLanguage}
          sx={{
            p: 0,
            borderRadius: "6px",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
            "&:hover": {
              transform: "scale(1.08)",
              boxShadow: "0 0 8px rgba(255,255,255,0.4)",
            },
          }}
        >
          <img
            src={
              language === "en"
                ? "https://storage.123fakturera.se/public/flags/SE.png"
                : "https://storage.123fakturera.se/public/flags/GB.png"
            }
            alt="flag"
            width={isMobile ? 30 : 36}
            height={isMobile ? 20 : 24}
            style={{ borderRadius: 3 }}
          />
        </IconButton>
      </Box>

      {/* Animated Card */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          px: 2,
        }}
      >
        <Fade in={showCard} timeout={800}>
          <Slide in={showCard} direction="up" timeout={700}>
            <Paper
              elevation={8}
              sx={{
                width: "100%",
                maxWidth: 420,
                borderRadius: "24px",
                p: { xs: 3.5, sm: 5 },
                textAlign: "center",
                backgroundColor: "rgba(255,255,255,0.96)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                transition: "transform 0.25s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                },
              }}
            >
              <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: "red",
                  textTransform: "capitalize",
                }}
              >
                {language === "en" ? "Log in" : "Logga in"}
              </Typography>

              <form onSubmit={handleLogin}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={
                      language === "en" ? "Email address" : "E-postadress"
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "25px",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    label={language === "en" ? "Password" : "Lösenord"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "25px",
                      },
                    }}
                  />

                  {error && (
                    <Typography color="error" sx={{ fontSize: 14 }}>
                      {error}
                    </Typography>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      py: 1.4,
                      fontWeight: 600,
                      borderRadius: "30px",
                      backgroundColor: "#00a152",
                      transition: "0.3s",
                      "&:hover": {
                        backgroundColor: "#00944a",
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    {loading
                      ? "Logging in..."
                      : language === "en"
                      ? "Log in"
                      : "Logga in"}
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Slide>
        </Fade>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          width: "100%",
          py: 2,
          backgroundColor: "rgba(255,255,255,0.7)",
          fontSize: 13,
          color: "#444",
        }}
      >
        © Lättfaktura, CRN no. 538537, 2025. All rights reserved.
      </Box>
    </Box>
  );
};

export default Login;
