import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Editor from "./components/Editor";

function App() {
  return (
    <Router>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Stock Market Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Sidebar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </Router>
  );
}

export default App;
