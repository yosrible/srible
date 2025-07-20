import { Box, Typography, Card, CardContent, Stack, SvgIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const StatCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: 8,
  boxShadow: 'none',
  border: '1px solid',
  borderColor: 'rgba(0, 0, 0, 0.12)',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
}));

const stats = [
  {
    title: 'Total Posts',
    value: '42',
    change: '+5',
    trend: 'up',
  },
  {
    title: 'Active Users',
    value: '1,234',
    change: '+5.2%',
    trend: 'up',
  },
  {
    title: 'Engagement',
    value: '78.5%',
    change: '+2.1%',
    trend: 'up',
  },
  {
    title: 'Avg. Session',
    value: '4m 23s',
    change: '-0.5%',
    trend: 'down',
  },
];

export default function Overview() {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={600} mb={1}>
          Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back! Here's what's happening with your blog today.
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
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
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" fontWeight={700}>
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  color={stat.trend === 'up' ? 'success.main' : 'error.main'}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 500,
                  }}
                >
                  {stat.change}
                  <SvgIcon
                    fontSize="small"
                    color={stat.trend === 'up' ? 'success' : 'error'}
                    sx={{ ml: 0.5 }}
                  >
                    {stat.trend === 'up' ? <TrendingUpIcon /> : <TrendingUpIcon style={{ transform: 'rotate(180deg)' }} />}
                  </SvgIcon>
                </Typography>
              </Box>
            </CardContent>
          </StatCard>
        ))}
      </Box>

      {/* Recent Activity & Quick Stats */}
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            lg: '2fr 1fr',
          },
        }}
      >
        {/* Recent Posts */}
        <StatCard>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Recent Activity
            </Typography>
            <Stack spacing={2}>
              {[1, 2, 3].map((item) => (
                <Box
                  key={item}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'action.hover',
                    '&:hover': {
                      bgcolor: 'action.selected',
                    },
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={500}>
                    New post published
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your post "Getting Started with Blogging" was published
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    2 hours ago
                  </Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </StatCard>

        {/* Quick Stats */}
        <StatCard>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={3}>
              Quick Stats
            </Typography>
            <Stack spacing={2}>
              {[
                { label: 'Posts', value: '24' },
                { label: 'Drafts', value: '3' },
                { label: 'Comments', value: '156' },
                { label: 'Subscribers', value: '1,234' },
              ].map((stat) => (
                <Box
                  key={stat.label}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 1,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {stat.value}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </StatCard>
      </Box>
    </Box>
  );
}