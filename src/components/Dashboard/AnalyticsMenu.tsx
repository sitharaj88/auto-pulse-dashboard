import React from "react";
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Timeline as TimelineIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  Compare as CompareIcon,
  Insights as InsightsIcon,
} from "@mui/icons-material";

interface AnalyticsMenuProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const analyticsViews = [
  {
    id: "overview",
    label: "Overview",
    icon: <AssessmentIcon />,
    description: "General dashboard overview",
  },
  {
    id: "sales-trends",
    label: "Sales Trends",
    icon: <TimelineIcon />,
    description: "Time-based sales analysis",
  },
  {
    id: "performance",
    label: "Performance",
    icon: <TrendingUpIcon />,
    description: "Sales performance metrics",
  },
  {
    id: "comparison",
    label: "Comparison",
    icon: <CompareIcon />,
    description: "Comparative analysis",
  },
  {
    id: "detailed-charts",
    label: "Detailed Charts",
    icon: <BarChartIcon />,
    description: "Advanced chart analytics",
  },
  {
    id: "distribution",
    label: "Distribution",
    icon: <PieChartIcon />,
    description: "Data distribution analysis",
  },
  {
    id: "insights",
    label: "AI Insights",
    icon: <InsightsIcon />,
    description: "Intelligent data insights",
  },
];

const AnalyticsMenu: React.FC<AnalyticsMenuProps> = ({
  activeView,
  onViewChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    onViewChange(newValue);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        mb: 3,
        background:
          "linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(220, 0, 78, 0.05) 100%)",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box sx={{ px: 3, py: 2, borderBottom: "1px solid rgba(0, 0, 0, 0.08)" }}>
        <Typography variant="h6" fontWeight="bold" color="primary.main">
          📊 Analytics Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Comprehensive sales data analysis and insights
        </Typography>
      </Box>

      <Tabs
        value={activeView}
        onChange={handleTabChange}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons="auto"
        sx={{
          px: 2,
          "& .MuiTab-root": {
            minWidth: isMobile ? 120 : 140,
            textTransform: "none",
            fontWeight: 500,
            gap: 1,
            "&.Mui-selected": {
              color: "primary.main",
              fontWeight: "bold",
            },
          },
          "& .MuiTabs-indicator": {
            height: 3,
            borderRadius: "3px 3px 0 0",
            background: "linear-gradient(90deg, #1976d2 0%, #dc004e 100%)",
          },
        }}
      >
        {analyticsViews.map((view) => (
          <Tab
            key={view.id}
            value={view.id}
            label={view.label}
            icon={view.icon}
            iconPosition="start"
            title={view.description}
          />
        ))}
      </Tabs>
    </Paper>
  );
};

export default AnalyticsMenu;
