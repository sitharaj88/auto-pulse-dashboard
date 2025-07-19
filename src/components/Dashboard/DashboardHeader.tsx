import React from "react";
import {
  Box,
  Typography,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CarIcon from "@mui/icons-material/DirectionsCar";
import BikeIcon from "@mui/icons-material/TwoWheeler";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import type { User } from "../../types";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
}));

const BrandSection = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

interface DashboardHeaderProps {
  user: User | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  return (
    <StyledAppBar position="sticky" elevation={0}>
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        <BrandSection sx={{ flexGrow: 1 }}>
          <DashboardIcon
            sx={{ fontSize: { xs: 24, sm: 32 }, color: "white" }}
          />
          <CarIcon sx={{ fontSize: { xs: 20, sm: 28 }, color: "white" }} />
          <BikeIcon sx={{ fontSize: { xs: 20, sm: 28 }, color: "white" }} />
          <Box ml={1}>
            <Typography
              variant="h5"
              component="h1"
              fontWeight="bold"
              color="white"
              sx={{
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
              }}
            >
              AutoPulse Dashboard
            </Typography>
            <Typography
              variant="caption"
              color="rgba(255, 255, 255, 0.8)"
              sx={{
                display: { xs: "none", sm: "block" },
                fontSize: { xs: "0.65rem", sm: "0.75rem" },
              }}
            >
              Real-time Car & Bike Sales Analytics
            </Typography>
          </Box>
        </BrandSection>

        {user && (
          <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }}>
            <Box
              textAlign="right"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Typography variant="body2" color="white" fontWeight="medium">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="caption" color="rgba(255, 255, 255, 0.8)">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Typography>
            </Box>

            <IconButton
              size="large"
              onClick={handleMenuOpen}
              color="inherit"
              sx={{
                border: "2px solid rgba(255, 255, 255, 0.3)",
                "&:hover": {
                  border: "2px solid rgba(255, 255, 255, 0.6)",
                },
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
              }}
            >
              {user.avatar ? (
                <Avatar
                  src={user.avatar}
                  alt={user.firstName}
                  sx={{ width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 } }}
                />
              ) : (
                <AccountCircle sx={{ fontSize: { xs: 28, sm: 32 } }} />
              )}
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: { xs: 160, sm: 200 },
                  "& .MuiMenuItem-root": {
                    px: { xs: 1.5, sm: 2 },
                    py: { xs: 0.5, sm: 1 },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem disabled>
                <Box>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
                  >
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
                  >
                    {user.email}
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1, fontSize: { xs: 18, sm: 20 } }} />
                <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
                  Sign Out
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default DashboardHeader;
