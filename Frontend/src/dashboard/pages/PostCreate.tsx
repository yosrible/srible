import React from 'react';
import Container from '@mui/material/Container';
import TiptapEditor from '../../components/editor/TiptapEditor';

const PostCreate: React.FC = () => {
  const handleSaveDraft = (content: string) => {
    // Implement your save logic
    alert('Draft saved!\n\n' + content);
  };

  const handlePublish = (content: string) => {
    // Implement your publish logic
    alert('Post published!\n\n' + content);
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ minHeight: "100vh", p: 0 }}>
      <TiptapEditor onSaveDraft={handleSaveDraft} onPublish={handlePublish} />
    </Container>
  );
};

export default PostCreate;
