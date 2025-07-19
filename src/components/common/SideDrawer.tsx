import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Avatar,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  Chip,
  Collapse,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  BarChart as BarChartIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  PieChart as PieChartIcon,
  TableChart as TableChartIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  DirectionsCar as CarIcon,
  TwoWheeler as BikeIcon,
  Timeline as TimelineIcon,
  Compare as CompareIcon,
  Insights as InsightsIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";

const DRAWER_WIDTH = 280;
const COLLAPSED_WIDTH = 64;

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{ collapsed?: boolean }>(({ theme, collapsed }) => ({
  width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  "& .MuiDrawer-paper": {
    width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
    background: `linear-gradient(135deg, 
      ${theme.palette.primary.main}15 0%, 
      ${theme.palette.secondary.main}10 50%, 
      ${theme.palette.primary.main}05 100%)`,
    backdropFilter: "blur(20px)",
    borderRight: `1px solid ${theme.palette.divider}`,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: collapsed ? "hidden" : "visible",
    boxSizing: "border-box",
  },
}));

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: DRAWER_WIDTH,
    background: `linear-gradient(135deg, 
      ${theme.palette.primary.main}15 0%, 
      ${theme.palette.secondary.main}10 50%, 
      ${theme.palette.primary.main}05 100%)`,
    backdropFilter: "blur(20px)",
    borderRight: `1px solid ${theme.palette.divider}`,
    boxSizing: "border-box",
  },
}));

const UserProfileSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main}20 0%, 
    ${theme.palette.secondary.main}15 100%)`,
  borderRadius: theme.spacing(1),
  margin: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  margin: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
  "&:hover": {
    background: `linear-gradient(135deg, 
      ${theme.palette.primary.main}20 0%, 
      ${theme.palette.secondary.main}15 100%)`,
    transform: "translateX(4px)",
    transition: "all 0.2s ease-in-out",
  },
  "&.Mui-selected": {
    background: `linear-gradient(135deg, 
      ${theme.palette.primary.main}30 0%, 
      ${theme.palette.secondary.main}20 100%)`,
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    "&:hover": {
      background: `linear-gradient(135deg, 
        ${theme.palette.primary.main}35 0%, 
        ${theme.palette.secondary.main}25 100%)`,
    },
  },
}));

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedView: string;
  onViewChange: (view: string) => void;
  onCollapse?: (collapsed: boolean) => void;
  isMobile?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  children?: MenuItem[];
}

const SideDrawer: React.FC<SideDrawerProps> = ({
  open,
  onClose,
  selectedView,
  onViewChange,
  onCollapse,
  isMobile: isMobileProp,
}) => {
  const theme = useTheme();
  const isMobileDetected = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = isMobileProp !== undefined ? isMobileProp : isMobileDetected;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "analytics",
  ]);

  const menuSections: MenuSection[] = [
    {
      title: "Main",
      items: [
        {
          id: "overview",
          label: "Dashboard",
          icon: <DashboardIcon />,
          badge: "New",
        },
      ],
    },
    {
      title: "Analytics",
      items: [
        {
          id: "analytics",
          label: "Analytics Hub",
          icon: <AnalyticsIcon />,
          children: [
            {
              id: "sales-trends",
              label: "Sales Trends",
              icon: <TrendingUpIcon />,
            },
            {
              id: "performance",
              label: "Performance",
              icon: <AssessmentIcon />,
            },
            {
              id: "comparison",
              label: "Comparison",
              icon: <CompareIcon />,
            },
            {
              id: "detailed-charts",
              label: "Detailed Charts",
              icon: <BarChartIcon />,
            },
            {
              id: "distribution",
              label: "Distribution",
              icon: <PieChartIcon />,
            },
            {
              id: "ai-insights",
              label: "AI Insights",
              icon: <InsightsIcon />,
              badge: "AI",
            },
          ],
        },
        {
          id: "data-table",
          label: "Data Tables",
          icon: <TableChartIcon />,
        },
        {
          id: "timeline",
          label: "Timeline View",
          icon: <TimelineIcon />,
        },
      ],
    },
    {
      title: "Vehicles",
      items: [
        {
          id: "cars",
          label: "Car Sales",
          icon: <CarIcon />,
        },
        {
          id: "bikes",
          label: "Bike Sales",
          icon: <BikeIcon />,
        },
      ],
    },
  ];

  const handleToggleCollapsed = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    if (onCollapse) {
      onCollapse(newCollapsed);
    }
  };

  const handleSectionToggle = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections.includes(item.id);
    const isSelected = selectedView === item.id;

    return (
      <React.Fragment key={item.id}>
        <ListItem disablePadding>
          <StyledListItemButton
            selected={isSelected}
            onClick={() => {
              if (hasChildren) {
                handleSectionToggle(item.id);
              } else {
                onViewChange(item.id);
                if (isMobile) {
                  onClose();
                }
              }
            }}
            sx={{ pl: depth * 2 + 2 }}
          >
            {!collapsed && (
              <ListItemIcon
                sx={{
                  color: isSelected ? theme.palette.primary.main : "inherit",
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
            )}
            {!collapsed && (
              <ListItemText
                primary={item.label}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "0.9rem",
                    fontWeight: isSelected ? 600 : 400,
                  },
                }}
              />
            )}
            {!collapsed && item.badge && (
              <Chip
                label={item.badge}
                size="small"
                color={item.badge === "AI" ? "secondary" : "primary"}
                variant="outlined"
                sx={{ fontSize: "0.7rem", height: 20 }}
              />
            )}
            {!collapsed &&
              hasChildren &&
              (isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
          </StyledListItemButton>
        </ListItem>

        {hasChildren && !collapsed && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map((child) => renderMenuItem(child, depth + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {!collapsed && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CarIcon sx={{ color: "white", fontSize: 20 }} />
            </Box>
            <Typography variant="h6" fontWeight="bold" color="primary">
              AutoPulse
            </Typography>
          </Box>
        )}
        <IconButton onClick={handleToggleCollapsed} size="small">
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      <Divider />

      {/* User Profile */}
      {!collapsed && user && (
        <UserProfileSection>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                bgcolor: theme.palette.primary.main,
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" fontWeight="bold" noWrap>
                {user.firstName} {user.lastName}
              </Typography>
              <Chip
                label={user.role?.toUpperCase()}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ fontSize: "0.7rem", height: 20 }}
              />
            </Box>
          </Box>
        </UserProfileSection>
      )}

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, overflow: "auto" }}>
        {menuSections.map((section) => (
          <Box key={section.title}>
            {!collapsed && (
              <Typography
                variant="overline"
                sx={{
                  px: 2,
                  py: 1,
                  display: "block",
                  color: theme.palette.text.secondary,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                {section.title}
              </Typography>
            )}
            <List dense>
              {section.items.map((item) => renderMenuItem(item))}
            </List>
          </Box>
        ))}
      </Box>

      {/* Footer Actions */}
      <Box>
        <Divider />
        <List>
          <ListItem disablePadding>
            <StyledListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Settings" />}
            </StyledListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <StyledListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Profile" />}
            </StyledListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <StyledListItemButton onClick={handleLogout}>
              <ListItemIcon sx={{ color: theme.palette.error.main }}>
                <LogoutIcon />
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary="Logout"
                  sx={{ color: theme.palette.error.main }}
                />
              )}
            </StyledListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <MobileDrawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawerContent}
      </MobileDrawer>
    );
  }

  return (
    <StyledDrawer variant="permanent" anchor="left" collapsed={collapsed}>
      {drawerContent}
    </StyledDrawer>
  );
};

export default SideDrawer;
