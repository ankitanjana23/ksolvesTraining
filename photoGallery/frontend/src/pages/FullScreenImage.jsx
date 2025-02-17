import React from "react";

const FullScreenImage = ({ url, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      onClick={onClose} // Close when clicking anywhere
    >
      <img src={url} alt="Fullscreen mode" className="max-w-full max-h-full" />
    </div>
  );
};

export default FullScreenImage;
