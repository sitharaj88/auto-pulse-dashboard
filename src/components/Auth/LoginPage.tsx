import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { login, clearError } from "../../store/slices/authSlice";
import CarIcon from "@mui/icons-material/DirectionsCar";
import BikeIcon from "@mui/icons-material/TwoWheeler";
import LoginIcon from "@mui/icons-material/Login";

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  padding: theme.spacing(2),
}));

const LoginCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 600,
  width: "100%",
  borderRadius: theme.spacing(2),
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
}));

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      dispatch(login(credentials));
    }
  };

  const demoCredentials = [
    { username: "admin", password: "admin123", role: "Administrator" },
    { username: "manager", password: "manager123", role: "Sales Manager" },
    { username: "analyst", password: "analyst123", role: "Data Analyst" },
  ];

  const fillDemoCredentials = (username: string, password: string) => {
    setCredentials({ username, password });
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <StyledContainer maxWidth={false}>
      <LoginCard elevation={10}>
        <Box textAlign="center" mb={4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={2}
          >
            <CarIcon sx={{ fontSize: 40, color: "primary.main", mr: 1 }} />
            <BikeIcon sx={{ fontSize: 40, color: "secondary.main", ml: 1 }} />
          </Box>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            AutoPulse Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Advanced Analytics for Car & Bike Sales
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            margin="normal"
            required
            autoComplete="username"
            disabled={isLoading}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleInputChange}
            margin="normal"
            required
            autoComplete="current-password"
            disabled={isLoading}
            variant="outlined"
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={
              isLoading || !credentials.username || !credentials.password
            }
            startIcon={
              isLoading ? <CircularProgress size={20} /> : <LoginIcon />
            }
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Demo Accounts
          </Typography>
        </Divider>

        <Box display="flex" flexDirection="column" gap={2}>
          {demoCredentials.map((demo, index) => (
            <Card key={index} variant="outlined">
              <CardContent sx={{ py: 2, "&:last-child": { pb: 2 } }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {demo.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {demo.username} / {demo.password}
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() =>
                      fillDemoCredentials(demo.username, demo.password)
                    }
                    disabled={isLoading}
                  >
                    Use Account
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            AutoPulse Dashboard • Built with React • Material-UI • Redux Toolkit
          </Typography>
        </Box>
      </LoginCard>
    </StyledContainer>
  );
};

export default LoginPage;
