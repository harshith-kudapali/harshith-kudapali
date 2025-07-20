import { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { backendApi } from '../App';

const AddResumeModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({ name: "", link: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
function extractDriveFileId(url) {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]{10,})/);
  return match ? match[1] : null;
}

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.name || !formData.link) return;

  const fileId = extractDriveFileId(formData.link);
  if (!fileId) {
    alert("Invalid Google Drive link.");
    return;
  }

  const thumbnail = `https://drive.google.com/thumbnail?id=${fileId}`;

  try {
    const res = await axios.post(`${backendApi}/api/resumes`, {
      name: formData.name,
      url: formData.link,
      thumbnail,
    });
    onAdd(res.data);
    onClose();
  } catch (err) {
    console.error("Failed to add resume", err);
  }
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 border border-cyan-700 p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-cyan-300 text-lg font-semibold">Add Resume from Link</h2>
          <button onClick={onClose} className="text-cyan-400 hover:text-red-400">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-cyan-400 mb-1">Resume Name</label>
            <input
              type="text"
              name="name"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-cyan-500/30 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-cyan-400 mb-1">Google Drive Link</label>
            <input
              type="url"
              name="link"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-cyan-500/30 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 rounded text-white font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddResumeModal;
