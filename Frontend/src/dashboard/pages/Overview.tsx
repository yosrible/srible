import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Tabs,
  Tab,
  Box,
  Stack,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function Overview() {
  const [tab, setTab] = React.useState(0);
  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", p: { xs: 1, sm: 2 } }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        Dashboard
      </Typography>
      {/* Stat Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mb: 3,
        }}
      >
        {[{
          title: "Total Revenue",
          value: "$1,250.00",
          desc: "Trending up this month",
          icon: <ArrowUpwardIcon color="success" />,
        }, {
          title: "New Customers",
          value: "1,234",
          desc: "Down 20% this period",
          icon: <ArrowDownwardIcon color="error" />,
        }, {
          title: "Active Accounts",
          value: "45,678",
          desc: "Strong user retention",
          icon: <ArrowUpwardIcon color="success" />,
        }, {
          title: "Growth Rate",
          value: "4.5%",
          desc: "Steady performance increase",
          icon: <ArrowUpwardIcon color="success" />,
        }].map((stat) => (
          <Box key={stat.title} sx={{ flex: { xs: "1 1 100%", sm: "1 1 48%", md: "1 1 23%" }, minWidth: 220 }}>
            <Card elevation={3}>
              <CardHeader
                title={<Typography variant="subtitle2">{stat.title}</Typography>}
                action={stat.icon}
                sx={{ pb: 0 }}
              />
              <CardContent>
                <Typography variant="h5" fontWeight={700}>{stat.value}</Typography>
                <Typography variant="caption" color="text.secondary">{stat.desc}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Tabs for time range */}
      <Box sx={{ mt: 4 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Last 3 months" />
          <Tab label="Last 30 days" />
          <Tab label="Last 7 days" />
        </Tabs>
      </Box>

      {/* Example: Total Visitors Card */}
      <Box sx={{ mt: 4 }}>
        <Card elevation={3}>
          <CardHeader
            title={<Typography variant="h6">Total Visitors</Typography>}
            subheader={<Typography variant="body2" color="text.secondary">Total for the last 3 months</Typography>}
          />
          <CardContent>
            <Typography variant="h4" fontWeight={700}>12,345</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
} 