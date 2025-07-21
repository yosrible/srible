import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme } from "./theme/theme";
import LandingPage from "./Landing/LandingPage";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardLayout from "./dashboard/DashboardLayout";
import Overview from "./dashboard/pages/Overview";
import Posts from "./dashboard/pages/Posts";
import Analytics from "./dashboard/pages/Analytics";
import Themes from "./dashboard/pages/Themes";
import Settings from "./dashboard/pages/Settings";
import PostCreate from "./dashboard/pages/PostCreate";

function App() {
  return (
    <Router>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Dashboard Routes - Uses its own ThemeProvider */}
          <Route
            path="/dashboard/*"
            element={
              <DashboardLayout>
                <Routes>
                  <Route index element={<Overview />} />
                  <Route path="posts" element={<Posts />} />
                  <Route path="posts/create" element={<PostCreate />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="themes" element={<Themes />} />
                  <Route path="settings" element={<Settings />} />
                </Routes>
              </DashboardLayout>
            }
          />

          {/* 404 - Not Found Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
