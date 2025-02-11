import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, Typography, Box, MenuItem, Select, InputLabel, FormControl, OutlinedInput, Chip } from "@mui/material";

const options = [
  { key: "open", label: "Open Price", color: "#8884d8" },
  { key: "close", label: "Close Price", color: "#82ca9d" },
  { key: "high", label: "High Price", color: "#FFBB28" },
  { key: "low", label: "Low Price", color: "#FF8042" },
];

const BarGraph = ({ data }) => {
  const [selectedOptions, setSelectedOptions] = useState(["open", "close"]); // Default selected

  const handleChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  return (
    <Card sx={{ width: "80%", p: 2, textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>Open vs Close Prices</Typography>

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

      {/* Bar Chart */}
      <Box height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="date"
              tickFormatter={(tick) => tick.slice(5)} // Show MM-DD
              minTickGap={15}
            />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Dynamically Render Bars Based on Selection */}
            {selectedOptions.map((optionKey) => {
              const option = options.find((opt) => opt.key === optionKey);
              return <Bar key={option.key} dataKey={option.key} fill={option.color} name={option.label} />;
            })}
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default BarGraph;
