import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter } from "recharts";

function Dashboard() {
  const [graphData, setGraphData] = useState([]);
  const [metaData, setMetaData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api");
        const apiData = response.data["Time Series (Daily)"];
        const meta = response.data["Meta Data"];

        if (apiData && meta) {
          const transformedData = Object.entries(apiData).map(([date, values]) => ({
            date,
            open: parseFloat(values["1. open"]),
            high: parseFloat(values["2. high"]),
            low: parseFloat(values["3. low"]),
            close: parseFloat(values["4. close"]),
            volume: parseInt(values["5. volume"]),
          }));

          setGraphData(transformedData.slice(0, 30)); // Take last 30 entries
          setMetaData(meta);
          setError(false);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(true);
      }
    };

    fetchApi();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3, textAlign: "center" }}>
        Stock Market Dashboard 📊
      </Typography>

      {metaData && (
        <Card sx={{ mb: 3, p: 2 }}>
          <Typography variant="h6">Stock Information</Typography>
          <Typography>Symbol: {metaData["2. Symbol"]}</Typography>
          <Typography>Last Refreshed: {metaData["3. Last Refreshed"]}</Typography>
          <Typography>Time Zone: {metaData["5. Time Zone"]}</Typography>
        </Card>
      )}

      {error && <Typography color="error">Failed to fetch data</Typography>}

      {!error && graphData.length > 0 && (
        <Grid container spacing={3}>
          {/* Bar Chart */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Bar Chart (Closing Prices)</Typography>
                <BarChart width={500} height={300} data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="close" fill="#8884d8" />
                </BarChart>
              </CardContent>
            </Card>
          </Grid>

          {/* Line Chart */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Line Chart (Stock Prices)</Typography>
                <LineChart width={500} height={300} data={graphData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="close" stroke="#82ca9d" />
                </LineChart>
              </CardContent>
            </Card>
          </Grid>

          {/* Scatter Plot */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Scatter Plot (High vs Low)</Typography>
                <ScatterChart width={500} height={300}>
                  <XAxis type="number" dataKey="high" name="High" />
                  <YAxis type="number" dataKey="low" name="Low" />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter name="Stock Data" data={graphData} fill="#8884d8" />
                </ScatterChart>
              </CardContent>
            </Card>
          </Grid>

          {/* Pie Chart */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pie Chart (Closing Prices)</Typography>
                <PieChart width={400} height={400}>
                  <Pie
                    data={graphData.slice(0, 5)}
                    dataKey="close"
                    nameKey="date"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {graphData.slice(0, 5).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff4500"][index]} />
                    ))}
                  </Pie>
                </PieChart>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Dashboard;
