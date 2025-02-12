import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [page,setPage] = useState(1);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images?pageName=${page}&pageSize=6`);
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData(); //send data (files) in a multipart/form-data format.
    formData.append("image", file);

    try {
      await axios.post(`${API_URL}/upload`, formData);
      setFile(null);
      fetchImages(); // Refresh images after upload
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/image/${id}`);
      fetchImages(); // Refresh images after delete
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Image Upload & Gallery</h1>

      {/* Upload Form */}
      <form
        onSubmit={handleUpload}
        className="bg-white p-4 rounded-lg shadow-md w-80"
      >
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-2 rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white mt-2 py-2 rounded-md"
        >
          Upload
        </button>
      </form>

      {/* Image Gallery */}
      <h2 className="text-2xl font-semibold mt-6">Uploaded Images</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <img
              src={`${API_URL}/image/${img.id}`}
              alt={img.filename}
              className="w-40 h-40 object-cover mx-auto"
            />
            <p className="text-center mt-2">{img.filename}</p>
            <button
              onClick={() => handleDelete(img.id)}
              className="w-full bg-red-500 text-white py-2 mt-2 rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {/* pagination  */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          // disabled={page * 6 >= total}  infinite
          className={`px-4 py-2 rounded-md  "bg-blue-500 text-white"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UploadPage;
