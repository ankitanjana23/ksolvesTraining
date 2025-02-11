import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, Typography, Box } from "@mui/material";

const ScatterGraph = ({ data }) => {
  return (
    <Card sx={{ width: "80%", p: 2, textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Stock Volatility (High vs. Low)
      </Typography>
      <Box height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <XAxis dataKey="high" name="High Price" />
            <YAxis dataKey="low" name="Low Price" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="High vs Low" data={data} fill="#d32f2f" />
          </ScatterChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default ScatterGraph;
