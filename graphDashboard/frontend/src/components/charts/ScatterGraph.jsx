import React, { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const options = [
  { key: "open", label: "Open Price" },
  { key: "close", label: "Close Price" },
  { key: "high", label: "High Price" },
  { key: "low", label: "Low Price" },
];

const ScatterGraph = ({ data }) => {
  const [xAxis, setXAxis] = useState("high"); // Default X-Axis
  const [yAxis, setYAxis] = useState("low"); // Default Y-Axis

  return (
    <Card sx={{ width: "80%", p: 2, textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Stock Volatility (Scatter Plot)
      </Typography>

      {/* X-Axis Selector */}
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel>X-Axis</InputLabel>
        <Select value={xAxis} onChange={(e) => setXAxis(e.target.value)}>
          {options.map((option) => (
            <MenuItem key={option.key} value={option.key}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Y-Axis Selector */}
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel>Y-Axis</InputLabel>
        <Select value={yAxis} onChange={(e) => setYAxis(e.target.value)}>
          {options.map((option) => (
            <MenuItem key={option.key} value={option.key}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Scatter Chart */}
      <Box height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <XAxis dataKey={xAxis} name={options.find((o) => o.key === xAxis)?.label} />
            <YAxis dataKey={yAxis} name={options.find((o) => o.key === yAxis)?.label} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            <Scatter name="Stock Data" data={data} fill="#d32f2f" />
          </ScatterChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default ScatterGraph;
