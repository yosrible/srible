import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Tabs,
  Tab,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Sample Data
const barData = [
  { name: "Mon", views: 400 },
  { name: "Tue", views: 300 },
  { name: "Wed", views: 500 },
  { name: "Thu", views: 700 },
  { name: "Fri", views: 600 },
  { name: "Sat", views: 800 },
  { name: "Sun", views: 750 },
];

const pieData = [
  { name: "Direct", value: 40 },
  { name: "Search", value: 30 },
  { name: "Social", value: 20 },
  { name: "Referral", value: 10 },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

export default function Analytics() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", p: { xs: 1, sm: 2 } }}>
      {/* Page Title */}
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        Analytics
      </Typography>
      {/* Metrics */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mb: 3,
        }}
      >
        {[{
          title: "Total Views",
          value: "45.2K",
          change: "+12.5% this week",
          icon: <TrendingUpIcon color="success" />,
        }, {
          title: "Unique Visitors",
          value: "12.8K",
          change: "+8.2% this week",
          icon: <TrendingUpIcon color="success" />,
        }, {
          title: "Click-through Rate",
          value: "3.24%",
          change: "+2.1% this week",
          icon: <TrendingUpIcon color="success" />,
        }, {
          title: "Avg. Session Duration",
          value: "4m 32s",
          change: "-0.5% this week",
          icon: <TrendingDownIcon color="error" />,
        }].map((stat, i) => (
          <Box key={stat.title} sx={{ flex: { xs: "1 1 100%", sm: "1 1 48%", md: "1 1 23%" }, minWidth: 220 }}>
            <Card elevation={3}>
              <CardHeader
                title={<Typography variant="subtitle2">{stat.title}</Typography>}
                action={stat.icon}
                sx={{ pb: 0 }}
              />
              <CardContent>
                <Typography variant="h5" fontWeight={700}>{stat.value}</Typography>
                <Typography variant="caption" color="text.secondary">{stat.change}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Time Tabs */}
      <Box sx={{ mt: 4 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Last 7 days" />
          <Tab label="Last 30 days" />
          <Tab label="Last 90 days" />
          <Tab label="Last year" />
        </Tabs>
      </Box>

      {/* Charts */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mt: 1,
        }}
      >
        <Box sx={{ flex: { xs: "1 1 100%", lg: "1 1 48%" }, minWidth: 320 }}>
          <Card elevation={3}>
            <CardHeader
              title={<Typography variant="subtitle1">Page Views</Typography>}
              subheader={<Typography variant="body2" color="text.secondary">This week</Typography>}
            />
            <CardContent>
              <Box sx={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: { xs: "1 1 100%", lg: "1 1 48%" }, minWidth: 320 }}>
          <Card elevation={3}>
            <CardHeader
              title={<Typography variant="subtitle1">Traffic Sources</Typography>}
              subheader={<Typography variant="body2" color="text.secondary">Breakdown by source</Typography>}
            />
            <CardContent>
              <Box sx={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Top Pages */}
      <Box sx={{ mt: 4 }}>
        <Card elevation={3}>
          <CardHeader title={<Typography variant="h6">Top Pages</Typography>} />
          <CardContent sx={{ p: 0 }}>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 0 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Page</TableCell>
                    <TableCell>Views</TableCell>
                    <TableCell>Change</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>/dashboard</TableCell>
                    <TableCell>1,247</TableCell>
                    <TableCell sx={{ color: "success.main" }}>+12%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>/posts/react-guide</TableCell>
                    <TableCell>892</TableCell>
                    <TableCell sx={{ color: "success.main" }}>+8%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>/analytics</TableCell>
                    <TableCell>756</TableCell>
                    <TableCell sx={{ color: "success.main" }}>+15%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
