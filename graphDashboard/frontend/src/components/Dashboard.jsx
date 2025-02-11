import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, CircularProgress, Card, Box, Stack } from "@mui/material";
import BarGraph from "./charts/BarGraph";
import PieGraph from "./charts/PieGraph";
import LineGraph from "./charts/LineGraph";
import ScatterGraph from "./charts/ScatterGraph";

//hii

const Dashboard = () => {
  const [graphData, setGraphData] = useState([]);
  const [metaData, setMetaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api");
        const timeSeries = response.data["Time Series (Daily)"];
        const meta = response.data["Meta Data"];

        if (timeSeries && meta) {
          const transformedData = Object.keys(timeSeries).map((date) => ({
            date,
            open: parseFloat(timeSeries[date]["1. open"]),
            high: parseFloat(timeSeries[date]["2. high"]),
            low: parseFloat(timeSeries[date]["3. low"]),
            close: parseFloat(timeSeries[date]["4. close"]),
            volume: parseInt(timeSeries[date]["5. volume"], 10),
          }));
          setGraphData(transformedData.reverse()); // Ensure chronological order
          setMetaData(meta);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchApi();
  }, []);

  return (
    <Container sx={{padding :"40px" , textAlign: "center" }}>
      <Typography variant="h4" sx={{ my: 3 }}>
        Stock Market Dashboard 📊
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Failed to fetch data</Typography>
      ) : (
        <>
          {metaData && (
            <Card sx={{ mb: 3, p: 2 }}>
              <Typography variant="h6">Stock Information</Typography>
              <Typography>Company: {metaData["2. Symbol"]}</Typography>
              <Typography>Last Refreshed: {metaData["3. Last Refreshed"]}</Typography>
              <Typography>Time Zone: {metaData["5. Time Zone"]}</Typography>
            </Card>
          )}

          {/* Graphs */}
          <Stack spacing={4} alignItems="center">
            <BarGraph data={graphData} />
            <LineGraph data={graphData} />
            <PieGraph data={graphData} />
            <ScatterGraph data={graphData} />
          </Stack>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
