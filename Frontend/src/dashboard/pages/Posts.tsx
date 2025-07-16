import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface Post {
  id: string;
  title: string;
  status: "published" | "draft" | "archived";
  author: string;
  publishDate: string;
  views: number;
}

const posts: Post[] = [
  {
    id: "1",
    title: "Getting Started with React Development",
    status: "published",
    author: "John Doe",
    publishDate: "2024-01-15",
    views: 1247,
  },
  {
    id: "2",
    title: "Advanced TypeScript Patterns",
    status: "draft",
    author: "Jane Smith",
    publishDate: "2024-01-20",
    views: 0,
  },
  {
    id: "3",
    title: "Building Scalable APIs with Node.js",
    status: "published",
    author: "Mike Johnson",
    publishDate: "2024-01-10",
    views: 892,
  },
  {
    id: "4",
    title: "CSS Grid Layout Mastery",
    status: "archived",
    author: "Sarah Wilson",
    publishDate: "2024-01-05",
    views: 567,
  },
  {
    id: "5",
    title: "State Management with Redux Toolkit",
    status: "published",
    author: "Alex Brown",
    publishDate: "2024-01-18",
    views: 1103,
  },
];

const statusColor = {
  published: "success.main",
  draft: "warning.main",
  archived: "text.secondary",
};

export default function Posts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ width: "100%", maxWidth: 900, mx: "auto", p: { xs: 1, sm: 2 } }}>
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardHeader
          title={<Typography variant="h5" fontWeight={700}>Posts</Typography>}
          action={
            <Button variant="contained" startIcon={<AddIcon />} size="medium">
              Create New Post
            </Button>
          }
        />
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, alignItems: { sm: "center" } }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 200, flex: 1 }}
            />
            <TextField
              select
              label="Status"
              size="small"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ minWidth: 140 }}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="published">Published</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="archived">Archived</MenuItem>
            </TextField>
          </Box>
        </CardContent>
      </Card>
      {isMobile ? (
        <Stack spacing={2}>
          {filteredPosts.map((post) => (
            <Card key={post.id} sx={{ boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {post.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography
                    color={statusColor[post.status]}
                    fontWeight={600}
                    variant="body2"
                    textTransform="capitalize"
                    sx={{ mr: 1 }}
                  >
                    {post.status}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {post.publishDate}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Author: <b>{post.author}</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Views: <b>{post.views.toLocaleString()}</b>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Card sx={{ boxShadow: 3 }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ width: "100%", overflowX: "auto" }}>
              <TableContainer component={Paper} elevation={0} sx={{ boxShadow: "none", minWidth: 600 }}>
                <Table size="small" aria-label="posts table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Author</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Published</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Views</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPosts.map((post) => (
                      <TableRow key={post.id} hover>
                        <TableCell>{post.title}</TableCell>
                        <TableCell>
                          <Typography color={statusColor[post.status]} fontWeight={600} variant="body2" textTransform="capitalize">
                            {post.status}
                          </Typography>
                        </TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>{post.publishDate}</TableCell>
                        <TableCell>{post.views.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
} 