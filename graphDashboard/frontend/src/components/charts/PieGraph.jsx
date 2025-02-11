import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { Card, Typography, Box } from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

const PieGraph = ({ data }) => {
  return (
    <Card sx={{ width: "80%", p: 2, textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>Volume Distribution</Typography>
      <Box height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="volume" nameKey="date" outerRadius={100}>
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
