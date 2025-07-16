import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const StatCard = styled(Card)({
  height: "100%",
  borderRadius: 8,
  boxShadow: "none",
  border: "1px solid",
  borderColor: "rgba(0, 0, 0, 0.12)",
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: "rgba(0, 0, 0, 0.5)",
  },
});

const ChartCard = styled(Card)({
  borderRadius: 8,
  boxShadow: "none",
  border: "1px solid",
  borderColor: "rgba(0, 0, 0, 0.12)",
  padding: 24,
  height: "100%",
});

const stats = [
  {
    title: "Total Views",
    value: "45.2K",
    change: "+12.5%",
    trend: "up",
  },
  {
    title: "Unique Visitors",
    value: "12.8K",
    change: "+8.2%",
    trend: "up",
  },
  {
    title: "Engagement",
    value: "3.24%",
    change: "+2.1%",
    trend: "up",
  },
  {
    title: "Avg. Session",
    value: "4m 32s",
    change: "-0.5%",
    trend: "down",
  },
];

const barData = [
  { name: "Mon", views: 400 },
  { name: "Tue", views: 300 },
  { name: "Wed", views: 500 },
  { name: "Thu", views: 700 },
  { name: "Fri", views: 600 },
  { name: "Sat", views: 800 },
  { name: "Sun", views: 750 },
];

const topPages = [
  { path: "/blog/hello-world", views: 1247, change: 12 },
  { path: "/about", views: 956, change: 5 },
  { path: "/blog/getting-started", views: 843, change: 8 },
  { path: "/contact", views: 721, change: -2 },
  { path: "/blog/react-tips", views: 689, change: 15 },
];

const deviceData = [
  { name: "Mobile", value: 62, color: "#8884d8" },
  { name: "Desktop", value: 30, color: "#82ca9d" },
  { name: "Tablet", value: 8, color: "#ffc658" },
];

const timeRanges = [
  { value: "7d", label: "7D" },
  { value: "14d", label: "14D" },
  { value: "30d", label: "30D" },
  { value: "90d", label: "3M" },
  { value: "1y", label: "1Y" },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d");

  const handleTimeRangeChange = (
    event: React.MouseEvent<HTMLElement>,
    newRange: string | null
  ) => {
    if (newRange !== null) {
      setTimeRange(newRange);
      // Here you would typically fetch new data based on the selected time range
      // For now, we'll just log it
      console.log("Time range changed to:", newRange);
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={600} mb={1}>
          Analytics
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track your blog's performance and audience engagement
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          mb: 4,
        }}
      >
        {stats.map((stat) => (
          <StatCard key={stat.title}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                gutterBottom
                sx={{ fontWeight: 500 }}
              >
                {stat.title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5" fontWeight={700}>
                  {stat.value}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: stat.trend === "up" ? "success.main" : "error.main",
                  }}
                >
                  {stat.trend === "up" ? (
                    <TrendingUpIcon fontSize="small" />
                  ) : (
                    <TrendingDownIcon fontSize="small" />
                  )}
                  <Typography variant="caption" sx={{ ml: 0.5 }}>
                    {stat.change}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </StatCard>
        ))}
      </Box>

      {/* Chart Section */}
      <Box sx={{ mt: 4 }}>
        <ChartCard>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Traffic Overview
            </Typography>
            <ToggleButtonGroup
              value={timeRange}
              exclusive
              onChange={handleTimeRangeChange}
              size="small"
              sx={{
                "& .MuiToggleButtonGroup-grouped": {
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  "&:not(:first-of-type)": {
                    borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
                    marginLeft: "-1px",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                    color: "inherit",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                  },
                },
              }}
            >
              {timeRanges.map((range) => (
                <ToggleButton
                  key={range.value}
                  value={range.value}
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    fontSize: "0.75rem",
                    textTransform: "none",
                    "&.Mui-selected": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  {range.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
          <Box sx={{ height: 300, mt: 2 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    fontSize: '12px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    color: '#1f2937'
                  }}
                  itemStyle={{ padding: 0, margin: 0 }}
                  formatter={(value: number) => [`${value} views`, '']}
                  labelFormatter={() => ''}
                  separator=': '
                />
                <Bar 
                  dataKey="views" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]} 
                  style={{
                    cursor: 'pointer',
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </ChartCard>
      </Box>

      {/* Top Pages Section */}
      <Box sx={{ mt: 4 }}>
        <ChartCard>
          <Typography variant="h6" fontWeight={600} mb={3}>
            Top Pages
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "none",
              border: "1px solid",
              borderColor: "rgba(0, 0, 0, 0.12)",
              borderRadius: 2,
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Page</TableCell>
                  <TableCell align="right">Views</TableCell>
                  <TableCell align="right">Change</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topPages.map((page) => (
                  <TableRow
                    key={page.path}
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {page.path}
                    </TableCell>
                    <TableCell align="right">
                      {page.views.toLocaleString()}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: page.change >= 0 ? "success.main" : "error.main",
                        fontWeight: 500,
                      }}
                    >
                      {page.change > 0 ? "+" : ""}
                      {page.change}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ChartCard>
      </Box>

      {/* Device Analytics */}
      <Box sx={{ mb: 4, mt: 6 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Device Distribution
        </Typography>
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: "none",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
              }}
            >
              <Box
                sx={{ width: "100%", height: 300, maxWidth: 300, mx: "auto" }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ percent = 0 }) =>
                        `${Math.round(percent * 100)}%`
                      }
                      labelLine={false}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, "Percentage"]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {deviceData.map((device, index) => (
                  <Box
                    key={device.name}
                    sx={{ mb: 2, display: "flex", alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        bgcolor: device.color,
                        borderRadius: "2px",
                        mr: 1.5,
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="body2">{device.name}</Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {device.value}%
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          height: 4,
                          bgcolor: "action.hover",
                          borderRadius: 2,
                          mt: 0.5,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            width: `${device.value}%`,
                            height: "100%",
                            bgcolor: device.color,
                            borderRadius: 2,
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
