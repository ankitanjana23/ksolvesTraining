import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, Typography, Box, MenuItem, Select, InputLabel, FormControl, OutlinedInput, Chip } from "@mui/material";

const options = [
  { key: "open", label: "Open Price", color: "#8884d8" },
  { key: "close", label: "Close Price", color: "#82ca9d" },
  { key: "high", label: "High Price", color: "#FFBB28" },
  { key: "low", label: "Low Price", color: "#FF8042" },
];

const LineGraph = ({ data }) => {
  const [selectedOptions, setSelectedOptions] = useState(["close"]); // Default selection

  const handleChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  return (
    <Card sx={{ width: "80%", p: 2, textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>Stock Price Trend</Typography>

      {/* Multi-Select Dropdown */}
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>Select Data</InputLabel>
        <Select
          multiple
          value={selectedOptions}
          onChange={handleChange}
          input={<OutlinedInput label="Select Data" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={options.find((opt) => opt.key === value)?.label} />
              ))}
            </Box>
          )}
        >
          {options.map((option) => (
            <MenuItem key={option.key} value={option.key}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Line Chart */}
      <Box height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" tickFormatter={(tick) => tick.slice(5)} minTickGap={15} />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Dynamically Render Lines Based on Selection */}
            {selectedOptions.map((optionKey) => {
              const option = options.find((opt) => opt.key === optionKey);
              return <Line key={option.key} type="monotone" dataKey={option.key} stroke={option.color} strokeWidth={2} name={option.label} />;
            })}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default LineGraph;
