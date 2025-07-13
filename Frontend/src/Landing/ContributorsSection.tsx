import { Box, Typography, Container, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";

const teamMembers = [
  {
    name: "Raj",
    role: "Frontend Engineer",
    avatar: "/static/team/avatars/Raj.png",
    twitter: "@kazedevs",
  },
  {
    name: "Shailesh",
    role: "Backend Engineer",
    avatar: "/static/team/avatars/shailesh.png",
    twitter: "@sh1lezh",
  },
  {
    name: "Rudra",
    role: "Frontend Engineer",
    avatar: "/static/team/avatars/rudra.png",
    twitter: "@SutharRudra_123",
  },
];

const TeamMemberCard = ({
  name,
  role,
  avatar,
  twitter,
}: {
  name: string;
  role: string;
  avatar: string;
  twitter: string;
}) => (
  <Box
    sx={{
      bgcolor: "transparent",
      border: "2px solid #444",
      borderRadius: 4,
      p: { xs: 3, md: 4 },
      width: "100%",
      maxWidth: "100%",
      boxSizing: "border-box",
      textAlign: "center",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "all 0.3s ease",
    }}
  >
    <Avatar
      src={avatar}
      alt={name}
      sx={{
        width: 120,
        height: 120,
        mb: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    />
    <Typography
      variant="h6"
      component="h3"
      color="white"
      fontWeight={700}
      sx={{ mb: 1 }}
    >
      {name}
    </Typography>
    <Typography
      variant="body1"
      sx={{
        fontWeight: 500,
        mb: 2,
        fontSize: "0.95rem",
        color: "white",
      }}
    >
      {role}
    </Typography>
    <Box
      component="a"
      href={`https://x.com/${twitter.replace("@", "")}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        window.open(
          `https://x.com/${twitter.replace("@", "")}`,
          "_blank",
          "noopener,noreferrer"
        );
      }}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        color: "white",
        textDecoration: "none",
        "&:hover": {
          color: "white",
          "& svg": {
            color: "white",
          },
        },
      }}
    >
      <Box
        component="span"
        sx={{
          display: "inline-flex",
          mr: 1,
          "& svg": {
            width: "1.1em",
            height: "1.1em",
            color: "rgba(255,255,255,0.7)",
            transition: "color 0.2s ease",
          },
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            fill="currentColor"
          />
        </svg>
      </Box>
      {twitter}
    </Box>
  </Box>
);

export const ContributorsSection = () => {
  return (
    <Box
      component="section"
      id="team"
      sx={{
        py: { xs: 6, md: 10 },
        bgcolor: "#000000",
        color: "white",
        borderRadius: 4,
        maxWidth: "1400px",
        mx: "auto",
        my: 6,
        px: { xs: 2, sm: 3, md: 4 },
        width: { xs: "100%", sm: "calc(100% - 32px)", md: "calc(100% - 64px)" },
        boxSizing: "border-box",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 0, sm: 2 } }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              lineHeight: 1.2,
            }}
          >
            Team
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              mb: 4,
              maxWidth: "600px",
              mx: "auto",
              fontSize: { xs: "0.95rem", sm: "1.1rem" },
              lineHeight: 1.7,
              color: "#A3A3A3",
              px: { xs: 1, sm: 0 },
            }}
          >
            Meet the talented individuals behind Srible who are dedicated to
            creating the best writing experience.
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(auto-fit, minmax(280px, 1fr))",
            },
            maxWidth: "1200px",
            gap: { xs: 4, md: 6 },
            mx: "auto",
            width: "100%",
            px: { xs: 1, sm: 2 },
            justifyItems: "center",
            "& > *": {
              width: "100%",
              maxWidth: "350px",
              height: "100%",
              display: "flex",
            },
          }}
        >
          {teamMembers.map(
            (
              member: {
                name: string;
                role: string;
                avatar: string;
                twitter: string;
              },
              index: number
            ) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ width: "100%", maxWidth: "350px", display: "flex" }}
              >
                <TeamMemberCard {...member} />
              </motion.div>
            )
          )}
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ textAlign: "center", marginTop: "4rem" }}
        >
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
            Want to join our team?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "600px",
              mx: "auto",
              mb: 4,
              color: "#A3A3A3",
            }}
          >
            We're always looking for talented individuals who are passionate
            about creating amazing writing tools.
          </Typography>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Box
              component="a"
              href="https://github.com/yosrible/srible"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: "#fff",
                color: "#000",
                padding: "12px 24px 12px 20px",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: 500,
                transition: "transform 0.3s ease",
                gap: "8px",
                "&:hover": {
                  transform: "translateY(-2px)",
                  backgroundColor: "#fff",
                  color: "#000",
                },
              }}
            >
              <GitHubIcon sx={{ fontSize: "1.25rem" }} />
              Contribute on GitHub
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ContributorsSection;
