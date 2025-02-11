const axios = require("axios");
const data = require("../models/data.json");

const displayContent = async (req, res) => {
  try {
    // res.json(data);
    /*
    // const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=RELIANCE.BSE&outputsize=full&apikey=demo';
    // Fetch data using axios
    //alpha - vantage  data 
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'axios' } // Set headers 
    });
    res.json(response.data);
    */

    const url = "https://mocki.io/v1/fb7b1811-0642-49ba-86d7-41afbd009b3e";

    const response = await axios.get(url, {
      headers: { "User-Agent": "axios" },
    });
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Error fetching data from API" });
  }
};

module.exports = { displayContent };
