import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, Typography, Box } from "@mui/material";

const BarGraph = ({ data }) => {
  return (
    <Card sx={{ width: "80%", p: 2, textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>Open vs Close Prices </Typography>
      <Box height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            {/* also use here hide  */}
            <XAxis dataKey="date"  
            tickFormatter={(tick) => tick.slice(5)} // Show only MM-DD
            minTickGap={15}
            /> 
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="open" fill="#8884d8" name="Open Price" />
            <Bar dataKey="close" fill="#82ca9d" name="Close Price" />
            <Bar dataKey="high" fill="#FFBB28" name="High Price" />
            <Bar dataKey="low" fill="#FF8042" name="Low Price" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default BarGraph;
