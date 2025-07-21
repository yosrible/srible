import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditorContent, useEditor, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import CharacterCount from '@tiptap/extension-character-count';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

interface TiptapEditorProps {
  content?: string;
  onSaveDraft?: (content: string) => void;
  onPublish?: (content: string) => void;
}

const HeadingDropdown: React.FC<{ editor: Editor }> = ({ editor }) => (
  <select
    value={
      editor.isActive('heading', { level: 1 })
        ? 'h1'
        : editor.isActive('heading', { level: 2 })
        ? 'h2'
        : editor.isActive('heading', { level: 3 })
        ? 'h3'
        : editor.isActive('paragraph')
        ? 'p'
        : ''
    }
    onChange={e => {
      const value = e.target.value;
      if (value === 'p') {
        editor.chain().focus().setParagraph().run();
      } else {
        const level = parseInt(value.replace('h', ''), 10) as 1 | 2 | 3;
        editor.chain().focus().toggleHeading({ level }).run();
      }
    }}
    style={{ marginRight: 8, height: 32, borderRadius: 4 }}
    aria-label="Select heading level"
  >
    <option value="p">Normal</option>
    <option value="h1">Heading 1</option>
    <option value="h2">Heading 2</option>
    <option value="h3">Heading 3</option>
  </select>
);

const Toolbar: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) return null;
  return (
    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ p: 1, bgcolor: 'background.paper', borderBottom: '1px solid #eee', flexWrap: 'wrap' }}>
      <HeadingDropdown editor={editor} />
      <IconButton size="small" onClick={() => editor.chain().focus().toggleBold().run()} color={editor.isActive('bold') ? 'primary' : 'default'}><FormatBoldIcon /></IconButton>
      <IconButton size="small" onClick={() => editor.chain().focus().toggleItalic().run()} color={editor.isActive('italic') ? 'primary' : 'default'}><FormatItalicIcon /></IconButton>
      <IconButton size="small" onClick={() => editor.chain().focus().toggleUnderline().run()} color={editor.isActive('underline') ? 'primary' : 'default'}><FormatUnderlinedIcon /></IconButton>
      <Divider flexItem orientation="vertical" sx={{ mx: 1 }} />
      <IconButton size="small" onClick={() => editor.chain().focus().toggleBulletList().run()} color={editor.isActive('bulletList') ? 'primary' : 'default'}><FormatListBulletedIcon /></IconButton>
      <IconButton size="small" onClick={() => editor.chain().focus().toggleOrderedList().run()} color={editor.isActive('orderedList') ? 'primary' : 'default'}><FormatListNumberedIcon /></IconButton>
      <IconButton size="small" onClick={() => editor.chain().focus().toggleTaskList().run()} color={editor.isActive('taskList') ? 'primary' : 'default'}><CheckBoxIcon /></IconButton>
      <Divider flexItem orientation="vertical" sx={{ mx: 1 }} />
      <IconButton size="small" onClick={() => editor.chain().focus().setTextAlign('left').run()} color={editor.isActive({ textAlign: 'left' }) ? 'primary' : 'default'}><FormatAlignLeftIcon /></IconButton>
      <IconButton size="small" onClick={() => editor.chain().focus().setTextAlign('center').run()} color={editor.isActive({ textAlign: 'center' }) ? 'primary' : 'default'}><FormatAlignCenterIcon /></IconButton>
      <IconButton size="small" onClick={() => editor.chain().focus().setTextAlign('right').run()} color={editor.isActive({ textAlign: 'right' }) ? 'primary' : 'default'}><FormatAlignRightIcon /></IconButton>
      <IconButton size="small" onClick={() => editor.chain().focus().setTextAlign('justify').run()} color={editor.isActive({ textAlign: 'justify' }) ? 'primary' : 'default'}><FormatAlignJustifyIcon /></IconButton>
      <Divider flexItem orientation="vertical" sx={{ mx: 1 }} />
      <IconButton size="small" component="label">
        <ImageIcon />
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                editor.chain().focus().setImage({ src: reader.result as string }).run();
              };
              reader.readAsDataURL(file);
              e.target.value = '';
            }
          }}
        />
      </IconButton>
      <IconButton size="small" onClick={() => {
        const url = window.prompt('Enter URL');
        if (url) editor.chain().focus().setLink({ href: url }).run();
      }} color={editor.isActive('link') ? 'primary' : 'default'}><LinkIcon /></IconButton>
      <Divider flexItem orientation="vertical" sx={{ mx: 1 }} />
      <IconButton size="small" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}><UndoIcon /></IconButton>
      <IconButton size="small" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}><RedoIcon /></IconButton>
    </Stack>
  );
};

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onSaveDraft, onPublish }) => {
  const navigate = useNavigate();
  const [count, setCount] = useState({ characters: 0, words: 0 });
  const editor = useEditor({
    extensions: [
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      TaskList,
      TaskItem,
      Underline,
      Image,
      Link,
      CharacterCount.configure(),
    ],
    content,
    editorProps: {
      attributes: { style: 'min-height:400px; padding:16px; font-size:1.1rem;' },
    },
    onUpdate({ editor }) {
      setCount({
        characters: editor.storage.characterCount.characters(),
        words: editor.storage.characterCount.words(),
      });
    },
  });

  // Update count on mount (for initial content)
  useEffect(() => {
    if (editor) setCount({
      characters: editor.storage.characterCount.characters(),
      words: editor.storage.characterCount.words(),
    });
  }, [editor]);

  const handleSaveDraft = () => {
    if (onSaveDraft) onSaveDraft(editor?.getHTML() ?? '');
  };
  const handlePublish = () => {
    if (onPublish) onPublish(editor?.getHTML() ?? '');
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      <Toolbar editor={editor} />
      <Box sx={{ flex: 1, px: { xs: 0.5, sm: 3 }, py: 2, width: '100%', '& .tiptap': { minHeight: 250 }, position: 'relative' }}>
        <EditorContent editor={editor} />
        {/* Word/char counter */}
        <div className="absolute bottom-2 right-4 text-xs text-zinc-500 dark:text-zinc-400 select-none">
          {count.words} words &middot; {count.characters} chars
        </div>
      </Box>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          p: 2,
          justifyContent: 'flex-end',
          flexShrink: 0,
          borderTop: '1px solid #eee',
          background: 'background.paper',
        }}
      >
        <Button variant="outlined" onClick={() => navigate('/dashboard/posts')}>Back</Button>
        <Button variant="outlined" onClick={handleSaveDraft}>Save Draft</Button>
        <Button variant="contained" color="primary" onClick={handlePublish}>Publish</Button>
      </Stack>
    </Box>
  );
};

export default TiptapEditor;
