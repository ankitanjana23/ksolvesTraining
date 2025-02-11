import React, { useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";
import { Card, Typography, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

const options = [
  { key: "high", label: "High Price" },
  { key: "low", label: "Low Price" },
  { key: "open", label: "Open Price" },  // Changed 'start' to 'open' (consistent with stock data)
  { key: "close", label: "Close Price" }, // Changed 'end' to 'close'
  { key: "volume", label: "Volume" }
];

const PieGraph = ({ data }) => {
    const [selectedMetric, setSelectedMetric] = useState("volume"); // Default selection: Volume

  return (
    <Card sx={{ width: "80%", p: 2, textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>Volume Distribution</Typography>

      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel>Select Metric</InputLabel>
        <Select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)}>
          {options.map((option) => (
            <MenuItem key={option.key} value={option.key}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey={selectedMetric} nameKey="date" outerRadius={100}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default PieGraph;