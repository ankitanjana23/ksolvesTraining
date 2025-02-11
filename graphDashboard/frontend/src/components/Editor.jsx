import React from "react";
import { Container, Typography } from "@mui/material";

const Editor = () => {
  return (
    <Container sx={{ marginLeft: "100px", padding: "20px" ,paddingTop : "40px"}}>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 5 }}>
        Editor Page ✏️
      </Typography>
    </Container>
  );
};

export default Editor;
