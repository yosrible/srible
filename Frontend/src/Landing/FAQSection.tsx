import { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Container, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'How does Srible work?',
    answer: 'Srible provides a simple platform to write and publish your content. Just sign up, start writing in Markdown, and publish with one click.'
  },
  {
    question: 'Can I use my own domain?',
    answer: 'Yes, you can connect your custom domain to your Srible blog in just a few clicks.'
  },
  {
    question: 'Is there a free plan?',
    answer: 'Yes, we offer a free plan with basic features. Check our pricing section for more details.'
  },
  {
    question: 'How do I export my content?',
    answer: 'You can export all your content in Markdown format at any time.'
  }
];

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: '16px !important',
  border: 'none',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:before': { display: 'none' },
  '&.Mui-expanded': {
    margin: theme.spacing(0, 0, 3, 0),
    transform: 'translateY(0)',
  },
  '&:hover': {
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
    transform: 'translateY(-2px)',
  },
  '&.Mui-focusVisible, &:focus, &:focus-visible, & *:focus-visible': {
    outline: 'none !important',
    boxShadow: 'none !important',
  },
  '& .MuiButtonBase-root': {
    '&:focus, &:focus-visible': {
      outline: 'none !important',
      boxShadow: 'none !important',
    },
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: theme.spacing(3, 4),
  minHeight: 'auto',
  '&:focus, &:focus-visible, &:active': {
    outline: 'none !important',
    boxShadow: 'none !important',
  },
  '& .MuiAccordionSummary-content': {
    margin: '0 !important',
    '&.Mui-expanded': {
      margin: '0 !important',
    },
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
    fontSize: '2rem',
  },
  '&.MuiButtonBase-root': {
    '&:focus, &:focus-visible, &:active': {
      outline: 'none !important',
      boxShadow: 'none !important',
    },
  },
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0, 4, 4, 4),
  '& p': {
    fontSize: '1.1rem',
    lineHeight: 1.7,
    color: theme.palette.text.secondary,
  },
}));

export const FAQSection = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const theme = useTheme();

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box 
      component="section"
      sx={{ 
        py: { xs: 8, md: 12 },
        bgcolor: 'background.default',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Box textAlign="center" mb={{ xs: 6, md: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography 
                variant="overline"
                color="primary"
                sx={{
                  display: 'inline-block',
                  mb: 2,
                  fontSize: '1rem',
                  fontWeight: 600,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}
              >
                Got Questions?
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography 
                variant="h2" 
                sx={{ 
                  mb: 3,
                  fontSize: { xs: '2.8rem', md: '4rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: 'text.primary',
                  '& span': {
                    color: 'primary.main',
                  },
                }}
              >
                Frequently Asked <span>Questions</span>
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  maxWidth: '700px',
                  mx: 'auto',
                  color: 'text.secondary',
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                  lineHeight: { xs: 1.5, sm: 1.6 },
                  px: { xs: 1, sm: 0 },
                }}
              >
                Everything you need to know about Srible. Can't find the answer you're looking for? Contact us.
              </Typography>
            </motion.div>
          </Box>
        </motion.div>
        
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          sx={{ maxWidth: '900px', mx: 'auto' }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.01 }}
            >
              <StyledAccordion 
                expanded={expanded === `panel${index}`} 
                onChange={handleChange(`panel${index}`)}
              >
              <StyledAccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
              >
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    color: expanded === `panel${index}` ? theme.palette.primary.main : 'text.primary',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {faq.question}
                </Typography>
              </StyledAccordionSummary>
              <StyledAccordionDetails>
                <Typography>{faq.answer}</Typography>
              </StyledAccordionDetails>
              </StyledAccordion>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
