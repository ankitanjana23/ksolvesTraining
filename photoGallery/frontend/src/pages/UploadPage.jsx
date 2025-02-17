import { useState, useEffect } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import FullScreenImage from "./FullScreenImage";

const API_URL = import.meta.env.VITE_API_URL;
const PAGE_SIZE = 6;

function UploadPage() {
  const [file, setFile] = useState(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const [search, setSearch] = useState(""); //empty so first search all image
  const [images, setImages] = useState([]); // image id , filename
  const [fullScreenUrl, setFullScreenUrl] = useState(null);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`, {
        params: { pageName: page, pageSize: PAGE_SIZE, sort },
      });
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page, sort]);

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
      await axios.delete(`${API_URL}/image/:${id}`);
      fetchImages(); // Refresh images after delete
    } catch (err) {
      console.error(err);
    }
  };

  //use filter to get image if text exist

  const filteredImages = images.filter((img) =>
    img.filename.toLocaleLowerCase().includes(search)
  );

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

      <select
        className="mt-4 p-2 border rounded-md"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="desc">Newest First</option>
        <option value="asc">Oldest First</option>
      </select>

      <div>
        <input
          type="text"
          className="block mt-2 p-2 border rounded-md w-80"
          placeholder="search image..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
        />
      </div>

      {/* Image Gallery */}
      <h2 className="text-2xl font-semibold mt-6">Uploaded Images</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <LazyLoadImage
              src={`${API_URL}/image/${img.id}`}
              effect="blur"
              alt={img.filename}
              className="w-60 h-40 object-cover mx-auto"
              onClick={() => setFullScreenUrl(`${API_URL}/image/${img.id}`)} //update
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
      {/* full screen mode  */}
      {fullScreenUrl && (
        <FullScreenImage
          url={fullScreenUrl}
          onClose={() => setFullScreenUrl(null)}
        />
      )}

      {/* pagination  */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 rounded-md  "bg-blue-500 text-white"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UploadPage;
