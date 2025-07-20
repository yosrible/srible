import { useState } from "react";
import {
  Box,
  Card,
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
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  FormControlLabel,
  Dialog,
  DialogContent,
  DialogActions,
  Tooltip,
  Radio,
  Checkbox,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  border: "1px solid",
  borderColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.12)"
      : "rgba(0, 0, 0, 0.12)",
  borderRadius: 8,
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    borderColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.3)"
        : "rgba(0, 0, 0, 0.3)",
  },
  boxShadow: "none",
}));

const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected?: boolean }>(({ theme, selected }) => ({
  "&:last-child td, &:last-child th": { border: 0 },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  backgroundColor: selected ? theme.palette.action.selected : "inherit",
}));

const StatusBadge = styled("span")<{ status: string }>(({ theme, status }) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "2px 8px",
  borderRadius: 12,
  fontSize: "0.7rem",
  fontWeight: 600,
  whiteSpace: "nowrap",
  backgroundColor:
    status === "published"
      ? "rgba(46, 125, 50, 0.1)"
      : status === "draft"
      ? "rgba(237, 108, 2, 0.1)"
      : "rgba(158, 158, 158, 0.1)",
  color:
    status === "published"
      ? theme.palette.success.main
      : status === "draft"
      ? theme.palette.warning.main
      : theme.palette.text.secondary,
  [theme.breakpoints.down("sm")]: {
    padding: "1px 6px",
    fontSize: "0.65rem",
  },
}));

interface Post {
  id: string;
  title: string;
  status: "published" | "draft" | "archived";
  author: string;
  publishDate: string;
  views: number;
  selected?: boolean;
}

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
];

export default function Posts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "Getting Started with React Development",
      status: "published",
      author: "John Doe",
      publishDate: "2024-01-15",
      views: 1247,
      selected: false,
    },
    {
      id: "2",
      title: "Advanced TypeScript Patterns",
      status: "draft",
      author: "Jane Smith",
      publishDate: "2024-01-20",
      views: 0,
      selected: false,
    },
    {
      id: "3",
      title: "Building Scalable APIs with Node.js",
      status: "published",
      author: "Mike Johnson",
      publishDate: "2024-01-10",
      views: 892,
      selected: false,
    },
    {
      id: "4",
      title: "CSS Grid Layout Mastery",
      status: "archived",
      author: "Sarah Wilson",
      publishDate: "2024-01-05",
      views: 567,
      selected: false,
    },
  ]);
  const navigate = useNavigate();
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const handleSelectPost = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, selected: !post.selected } : post
      )
    );

    setSelectedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const handleSelectAll = () => {
    // If all posts are selected, deselect all. Otherwise, select all.
    const allSelected = selectedPosts.length === posts.length;
    const newSelected = allSelected ? [] : posts.map((post) => post.id);

    setSelectedPosts(newSelected);
    setPosts(
      posts.map((post) => ({
        ...post,
        selected: newSelected.includes(post.id),
      }))
    );
  };

  const handleAction = () => {
    if (!selectedAction || selectedPosts.length === 0) return;

    setPosts(
      posts
        .map((post) => {
          if (selectedPosts.includes(post.id)) {
            if (selectedAction === "delete") {
              return null; // Will be filtered out
            }
            return {
              ...post,
              status: selectedAction as Post["status"],
              selected: false,
            };
          }
          return post;
        })
        .filter(Boolean) as Post[]
    );

    setSelectedPosts([]);
    setSelectedAction("");
    setOpenDialog(false);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box
      sx={{
        width: "100%",
        p: { xs: 2, sm: 3 },
        ...(isMobile
          ? {
              height: "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }
          : {}),
      }}
    >
      <Box sx={{ mb: 3, ...(isMobile ? { flexShrink: 0 } : {}) }}>
        <Typography variant="h5" fontWeight={600} mb={1}>
          Posts
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage your blog posts and content
        </Typography>
      </Box>

      <Box sx={{ mb: 3, ...(isMobile ? { flexShrink: 0 } : {}) }}>
        {/* Search and Filter - Responsive layout */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
            mb: 2,
            alignItems: isMobile ? "stretch" : "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flex: isMobile ? 1 : "none",
              flexDirection: isMobile ? "column" : "row",
              width: isMobile ? "100%" : "auto",
              minWidth: isMobile ? undefined : 250,
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                width: isMobile ? "100%" : 200,
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl
              size="small"
              sx={{
                minWidth: isMobile ? "100%" : 150,
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
            >
              <InputLabel>
                <FilterList fontSize="small" sx={{ mr: 0.5 }} /> Status
              </InputLabel>
              <Select
                value={statusFilter}
                onChange={handleStatusChange}
                label="Status"
                size="small"
                sx={{
                  "& .MuiSelect-select": {
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                  },
                }}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value === "all" ? "All Status" : option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            startIcon={!isMobile && <AddIcon />}
            onClick={() => navigate("/dashboard/posts/new")}
            sx={({ palette }) => ({
              bgcolor: palette.mode === "dark" ? "#ffffff" : "text.primary",
              color:
                palette.mode === "dark"
                  ? "rgba(0, 0, 0, 0.87)"
                  : "background.paper",
              "&:hover": {
                bgcolor:
                  palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.9)"
                    : "rgba(0, 0, 0, 0.8)",
              },
              ...(isMobile
                ? {
                    width: "100%",
                    py: 1,
                  }
                : {
                    ml: "auto",
                    minWidth: 120,
                  }),
            })}
          >
            {isMobile ? "New Post" : "New Post"}
          </Button>
        </Box>

        {/* Actions Bar - Only shows when posts are selected */}
        {selectedPosts.length > 0 && (
          <Box
            sx={{
              bgcolor: "action.hover",
              p: 1.5,
              borderRadius: 1,
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {selectedPosts.length} selected
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
                width: "100%",
                "& .MuiFormGroup-root": {
                  width: "100%",
                },
                "& .MuiFormControlLabel-root": {
                  marginRight: isMobile ? 1 : 2,
                  "&:last-child": {
                    marginRight: 0,
                  },
                },
                "& .MuiButton-root": {
                  height: isMobile ? 32 : 36,
                  minWidth: isMobile ? "auto" : 80,
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'nowrap' }}>
                <Tooltip title="Set as Draft">
                  <FormControlLabel
                    value="draft"
                    control={
                      <Radio 
                        size="small" 
                        checked={selectedAction === 'draft'}
                        onChange={() => setSelectedAction('draft')}
                      />
                    }
                    label="Draft"
                    labelPlacement="end"
                    sx={{
                      m: 0,
                      mr: 1,
                      "& .MuiFormControlLabel-label": { 
                        fontSize: "0.9rem",
                      },
                    }}
                  />
                </Tooltip>
                
                <Tooltip title="Publish">
                  <FormControlLabel
                    value="published"
                    control={
                      <Radio 
                        size="small" 
                        checked={selectedAction === 'published'}
                        onChange={() => setSelectedAction('published')}
                      />
                    }
                    label="Publish"
                    labelPlacement="end"
                    sx={{
                      m: 0,
                      mr: 1,
                      "& .MuiFormControlLabel-label": { 
                        fontSize: "0.9rem",
                      },
                    }}
                  />
                </Tooltip>
                
                <Tooltip title="Archive">
                  <FormControlLabel
                    value="archived"
                    control={
                      <Radio 
                        size="small" 
                        checked={selectedAction === 'archived'}
                        onChange={() => setSelectedAction('archived')}
                      />
                    }
                    label="Archive"
                    labelPlacement="end"
                    sx={{
                      m: 0,
                      mr: 2,
                      "& .MuiFormControlLabel-label": { 
                        fontSize: "0.9rem",
                      },
                    }}
                  />
                </Tooltip>

                {selectedAction && selectedAction !== "delete" && (
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={() => setOpenDialog(true)}
                    sx={{
                      textTransform: "none",
                      px: 2,
                      height: 36,
                      minWidth: 80,
                      mr: 1
                    }}
                  >
                    Apply
                  </Button>
                )}

                <Tooltip title="Delete Selected">
                  <Button
                    variant="outlined"
                    color="error"
                    size="medium"
                    onClick={() => {
                      setSelectedAction("delete");
                      setOpenDialog(true);
                    }}
                    sx={{
                      height: 36,
                      minWidth: 36,
                      px: 1,
                      borderColor: "error.light",
                      "&:hover": {
                        borderColor: "error.main",
                        backgroundColor: "rgba(211, 47, 47, 0.04)",
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <StyledCard
        sx={isMobile ? {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          "& > div": {
            height: "100%",
            display: "flex",
            flexDirection: "column",
          },
        } : {}}
      >
        <TableContainer
          sx={
            isMobile
              ? {
                  flex: 1,
                  overflow: "auto",
                  WebkitOverflowScrolling: "touch",
                  "&::-webkit-scrollbar": {
                    width: "4px",
                    height: "4px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: "4px",
                  },
                  "&:hover::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,0.2)",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "transparent",
                  },
                }
              : {}
          }
        >
          <Table sx={{ minWidth: isMobile ? 700 : "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  padding={isMobile ? "none" : "checkbox"}
                  sx={{ pl: isMobile ? 1 : 2 }}
                >
                  <Checkbox
                    checked={
                      selectedPosts.length === posts.length && posts.length > 0
                    }
                    indeterminate={
                      selectedPosts.length > 0 &&
                      selectedPosts.length < posts.length
                    }
                    onChange={handleSelectAll}
                    onClick={(e) => e.stopPropagation()}
                    size="small"
                    disabled={posts.length === 0}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 20,
                      },
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    minWidth: isMobile ? 200 : "auto",
                  }}
                >
                  Title
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    display: isMobile ? "none" : "table-cell",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    display: isMobile ? "none" : "table-cell",
                  }}
                >
                  Author
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    display: isMobile ? "none" : "table-cell",
                  }}
                >
                  Published
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    pr: isMobile ? 1 : 2,
                  }}
                >
                  Views
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPosts.map((post) => (
                <StyledTableRow
                  key={post.id}
                  selected={post.selected || false}
                  hover
                  onClick={() => !isMobile && handleSelectPost(post.id)}
                  sx={{
                    "&:hover": {
                      cursor: isMobile ? "default" : "pointer",
                    },
                  }}
                >
                  <TableCell
                    padding={isMobile ? "none" : "checkbox"}
                    sx={{ pl: isMobile ? 1 : 2 }}
                  >
                    <Radio
                      checked={post.selected || false}
                      onChange={() => handleSelectPost(post.id)}
                      onClick={(e) => e.stopPropagation()}
                      size="small"
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 20,
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="body2" fontWeight={500} noWrap>
                        {post.title}
                      </Typography>
                      {isMobile && (
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            mt: 0.5,
                            flexWrap: "wrap",
                          }}
                        >
                          <StatusBadge status={post.status}>
                            {post.status.charAt(0).toUpperCase() +
                              post.status.slice(1)}
                          </StatusBadge>
                          <Typography variant="caption" color="text.secondary">
                            {post.author} • {post.publishDate}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ display: isMobile ? "none" : "table-cell" }}>
                    <StatusBadge status={post.status}>
                      {post.status.charAt(0).toUpperCase() +
                        post.status.slice(1)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell sx={{ display: isMobile ? "none" : "table-cell" }}>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {post.author}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ display: isMobile ? "none" : "table-cell" }}>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {post.publishDate}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ pr: isMobile ? 1 : 2 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {post.views.toLocaleString()}
                    </Typography>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledCard>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 2,
            width: "100%",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          {selectedAction === "delete" ? (
            <DeleteIcon color="error" sx={{ mr: 1.5 }} />
          ) : (
            <ArchiveIcon color="primary" sx={{ mr: 1.5 }} />
          )}
          <Typography variant="h6" fontWeight={600}>
            {selectedAction === "delete"
              ? "Delete Posts"
              : `Mark as ${selectedAction}`}
          </Typography>
        </Box>

        <DialogContent sx={{ p: 0, mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {selectedAction === "delete"
              ? `${selectedPosts.length} post(s) will be permanently deleted.`
              : `${selectedPosts.length} post(s) will be marked as ${selectedAction}.`}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 0, gap: 1 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              px: 2,
              borderRadius: 1,
              borderColor: "#e0e0e0",
              color: "text.secondary",
              "&:hover": {
                borderColor: "#bdbdbd",
                backgroundColor: "rgba(0, 0, 0, 0.02)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAction}
            variant="contained"
            size="small"
            color={selectedAction === "delete" ? "error" : "primary"}
            sx={{
              textTransform: "none",
              px: 2,
              borderRadius: 1,
              backgroundColor:
                selectedAction === "delete"
                  ? "#ff4444"
                  : selectedAction === "archived"
                  ? "#6c757d"
                  : selectedAction === "published"
                  ? "#4caf50"
                  : "#ff9800",
              "&:hover": {
                backgroundColor:
                  selectedAction === "delete"
                    ? "#cc0000"
                    : selectedAction === "archived"
                    ? "#5a6268"
                    : selectedAction === "published"
                    ? "#43a047"
                    : "#e68a00",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              },
            }}
          >
            {selectedAction === "delete"
              ? "Delete"
              : selectedAction === "archived"
              ? "Archive"
              : selectedAction === "published"
              ? "Publish"
              : "Save as Draft"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
