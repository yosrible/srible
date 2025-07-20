import { Box } from "@mui/material";
import { SignUpForm } from "@/components/auth/SignUpForm";

const SignUpPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.background.default,
        p: 3,
      }}
    >
      <SignUpForm />
    </Box>
  );
};

export default SignUpPage;
