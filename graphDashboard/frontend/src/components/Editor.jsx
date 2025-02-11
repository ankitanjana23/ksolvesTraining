import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill style
import { Container, Typography, Card, Box } from "@mui/material";

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }], // Headers (H1, H2, H3)
  ["bold", "italic", "underline", "strike"], // Text formatting
  [{ list: "ordered" }, { list: "bullet" }], // Lists
  [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
  [{ indent: "-1" }, { indent: "+1" }], // Indentation
  [{ align: [] }], // Text alignment
  ["blockquote", "code-block"], // Block styles
  ["link", "image", "video"], // Media
  ["clean"], // Clear formatting
];

const Editor = () => {
  const [content, setContent] = useState("");

  return (
    <Container sx={{ ml: "100px", maxWidth: "calc(100% - 100px)", mt: 10 }}>
      {/* Title */}
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
        Rich Text Editor ✏️
      </Typography>

      {/* Editor */}
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={{ toolbar: toolbarOptions }}
          style={{ height: "300px" }}
        />
      </Card>

      {/* Preview */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Preview:</Typography>
        <Card sx={{ p: 2, minHeight: "100px", boxShadow: 2 }}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Card>
      </Box>
    </Container>
  );
};

export default Editor;
