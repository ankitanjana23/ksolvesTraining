import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, Typography, Box } from "@mui/material";

const LineGraph = ({ data }) => {
  return (
    <Card sx={{ width: "80%", p: 2, textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>Stock Price Trend</Typography>
      <Box height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" hide />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="close" stroke="#ff7300" strokeWidth={2} name="Closing Price" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default LineGraph;
