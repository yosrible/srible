import { Box } from "@mui/material";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";

export function OnboardingPage() {
  const handleOnboardingComplete = () => {
    // TODO: Update user state to mark onboarding as complete
    console.log("Onboarding completed!");
  };

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
      <OnboardingForm onComplete={handleOnboardingComplete} />
    </Box>
  );
}

export default OnboardingPage;
