import axios from "axios";

const API_URL = "http://localhost:3000/api";

const fetchImages = async () => {
  try {
    const res = await axios.get(`${API_URL}/images`);
    return res.data;
  } catch (err) {
    console.error("Error fetching images:", err);
  }
};

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    await axios.post(`${API_URL}/upload`, formData);
  } catch (err) {
    console.error("Error uploading image:", err);
  }
};

const deleteImage = async (id) => {
  try {
    await axios.delete(`${API_URL}/image/${id}`);
  } catch (err) {
    console.error("Error deleting image:", err);
  }
};

export {fetchImages, uploadImage, deleteImage}