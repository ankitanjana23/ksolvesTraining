import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Editor from "./components/Editor";
import Header from "./components/Header";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        {sidebarOpen && <Sidebar />}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/editor" element={<Editor />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
