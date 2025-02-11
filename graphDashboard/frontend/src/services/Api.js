import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; 

export const fetchGraphData = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data) //log and see data
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
