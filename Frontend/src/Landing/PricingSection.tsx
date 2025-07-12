import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

const PricingGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: "1fr",
  width: "calc(100% - 16px)",
  margin: `${theme.spacing(4)} 8px`,
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing(3),
    width: "calc(100% - 16px)",
    margin: `${theme.spacing(4)} 8px`,
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: theme.spacing(3),
    width: "calc(100% - 16px)",
    margin: `${theme.spacing(4)} 8px`,
  },
  justifyItems: "stretch",
}));

const PlanCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5, 4),
  height: "100%",
  width: "100%",
  maxWidth: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: 16,
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5, 4),
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(5, 5),
  },
}));

const plans = [
  {
    name: "Starter",
    price: "7",
    period: "per month",
    description: "For individual creators",
    features: [
      "Basic writing tools",
      "3 published blogs",
      "Basic analytics",
      "Community support",
      "Custom domain support",
    ],
    buttonText: "Coming Soon",
    comingSoon: true,
    highlighted: false,
  },
  {
    name: "Free",
    price: "0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "Basic writing tools",
      "1 published blog",
      "Basic analytics",
      "Community support",
    ],
    buttonText: "Get Started",
    comingSoon: false,
    highlighted: true,
  },
  {
    name: "Pro",
    price: "25",
    period: "per month",
    description: "For serious creators",
    features: [
      "Everything in Starter",
      "Unlimited blogs",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
    ],
    buttonText: "Coming Soon",
    comingSoon: true,
    highlighted: false,
  },
];

export const PricingSection = () => (
  <Box component="section" sx={{ py: 10, bgcolor: "#fff", width: "100%" }}>
    <Container maxWidth="lg" sx={{ width: "100%", px: { xs: 2, md: 4 } }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 700 }}>
          Simple, transparent pricing
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{
            mb: 6,
            maxWidth: 600,
            mx: "auto",
            fontSize: { xs: "0.95rem", sm: "1rem" },
            lineHeight: { xs: 1.5, sm: 1.6 },
          }}
        >
          Choose the perfect plan for your needs. No hidden fees, cancel
          anytime.
        </Typography>
      </motion.div>

      <PricingGrid>
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <PlanCard
              elevation={plan.highlighted ? 3 : 1}
              sx={{
                border: plan.highlighted
                  ? "2px solid #000"
                  : "1px solid rgba(0, 0, 0, 0.1)",
                position: "relative",
                overflow: "hidden",
                opacity: plan.highlighted ? 1 : 0.7,
                transition: "opacity 0.3s ease, transform 0.3s ease",
                width: "100%",
                "&:hover": {
                  opacity: plan.highlighted ? 1 : 0.85,
                  transform: plan.highlighted ? "translateY(-4px)" : "none",
                },
              }}
            >
              {plan.highlighted && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bgcolor: "black",
                    color: "white",
                    px: 2,
                    py: 0.5,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    borderBottomLeftRadius: 8,
                  }}
                >
                  POPULAR
                </Box>
              )}

              <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                {plan.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
                <Typography variant="h3" fontWeight={800}>
                  ${plan.price}
                </Typography>
                <Typography color="text.secondary" sx={{ ml: 1, mb: 0.5 }}>
                  {plan.period}
                </Typography>
              </Box>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                {plan.description}
              </Typography>

              <Box sx={{ flexGrow: 1, mb: 3 }}>
                {plan.features.map((feature, i) => (
                  <Box
                    key={i}
                    sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                  >
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        mr: 1.5,
                        color: "primary.main",
                      }}
                    >
                      ✓
                    </Box>
                    <Typography>{feature}</Typography>
                  </Box>
                ))}
              </Box>

              <Button
                component="a"
                href="/signup"
                fullWidth
                variant={plan.highlighted ? "contained" : "outlined"}
                size="large"
                disabled={plan.comingSoon}
                sx={{
                  mt: "auto",
                  py: 1.5,
                  borderRadius: "50px",
                  borderWidth: "1.5px",
                  opacity: plan.highlighted ? 1 : 0.8,
                  textDecoration: "none",
                  "&:hover": {
                    borderWidth: "1.5px",
                    opacity: plan.highlighted ? 0.9 : 0.7,
                  },
                  ...(plan.comingSoon && {
                    position: "relative",
                    overflow: "hidden",
                  }),
                }}
              >
                {plan.buttonText}
              </Button>
            </PlanCard>
          </motion.div>
        ))}
      </PricingGrid>
    </Container>
  </Box>
);
