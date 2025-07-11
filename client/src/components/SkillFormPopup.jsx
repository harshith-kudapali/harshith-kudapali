import React, { useState } from 'react';
import axios from 'axios';

const SkillFormPopup = ({ apiUrl, type, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '', level: '', color: '', category: '', title: '', institution: '', period: '', description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(apiUrl, formData);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const colorPalette = [
    // Reds
    { name: 'Light Pink', value: '#FFB6C1' }, { name: 'Pink', value: '#FFC0CB' }, { name: 'Hot Pink', value: '#FF69B4' }, { name: 'Deep Pink', value: '#FF1493' },
    { name: 'Pale Violet Red', value: '#DB7093' }, { name: 'Medium Violet Red', value: '#C71585' }, { name: 'Light Coral', value: '#F08080' },
    { name: 'Indian Red', value: '#CD5C5C' }, { name: 'Crimson', value: '#DC143C' }, { name: 'Fire Brick', value: '#B22222' }, { name: 'Dark Red', value: '#8B0000' },
    { name: 'Red', value: '#FF0000' }, { name: 'Orange Red', value: '#FF4500' }, { name: 'Tomato', value: '#FF6347' }, { name: 'Coral', value: '#FF7F50' },

    // Oranges
    { name: 'Dark Orange', value: '#FF8C00' }, { name: 'Orange', value: '#FFA500' }, { name: 'Gold', value: '#FFD700' }, { name: 'Dark Golden Rod', value: '#B8860B' },
    { name: 'Golden Rod', value: '#DAA520' }, { name: 'Pale Golden Rod', value: '#EEE8AA' }, { name: 'Dark Khaki', value: '#BDB76B' },
    { name: 'Khaki', value: '#F0E68C' }, { name: 'Olive', value: '#808000' }, { name: 'Yellow', value: '#FFFF00' }, { name: 'Yellow Green', value: '#9ACD32' },

    // Yellows & Greens
    { name: 'Dark Olive Green', value: '#556B2F' }, { name: 'Olive Drab', value: '#6B8E23' }, { name: 'Lawn Green', value: '#7CFC00' },
    { name: 'Chart Reuse', value: '#7FFF00' }, { name: 'Green Yellow', value: '#ADFF2F' }, { name: 'Dark Green', value: '#006400' },
    { name: 'Green', value: '#008000' }, { name: 'Forest Green', value: '#228B22' }, { name: 'Lime', value: '#00FF00' }, { name: 'Lime Green', value: '#32CD32' },
    { name: 'Light Green', value: '#90EE90' }, { name: 'Pale Green', value: '#98FB98' }, { name: 'Dark Sea Green', value: '#8FBC8F' },

    // Greens & Teals
    { name: 'Medium Spring Green', value: '#00FA9A' }, { name: 'Spring Green', value: '#00FF7F' }, { name: 'Sea Green', value: '#2E8B57' },
    { name: 'Medium Sea Green', value: '#3CB371' }, { name: 'Light Sea Green', value: '#20B2AA' }, { name: 'Dark Slate Gray', value: '#2F4F4F' },
    { name: 'Teal', value: '#008080' }, { name: 'Dark Cyan', value: '#008B8B' }, { name: 'Aqua', value: '#00FFFF' }, { name: 'Cyan', value: '#00FFFF' },
    { name: 'Light Cyan', value: '#E0FFFF' }, { name: 'Dark Turquoise', value: '#00CED1' }, { name: 'Turquoise', value: '#40E0D0' },

    // Blues
    { name: 'Medium Turquoise', value: '#48D1CC' }, { name: 'Pale Turquoise', value: '#AFEEEE' }, { name: 'Aqua Marine', value: '#7FFFD4' },
    { name: 'Powder Blue', value: '#B0E0E6' }, { name: 'Cadet Blue', value: '#5F9EA0' }, { name: 'Steel Blue', value: '#4682B4' },
    { name: 'Corn Flower Blue', value: '#6495ED' }, { name: 'Deep Sky Blue', value: '#00BFFF' }, { name: 'Dodger Blue', value: '#1E90FF' },
    { name: 'Light Blue', value: '#ADD8E6' }, { name: 'Sky Blue', value: '#87CEEB' }, { name: 'Light Sky Blue', value: '#87CEFA' },
    { name: 'Midnight Blue', value: '#191970' }, { name: 'Navy', value: '#000080' }, { name: 'Dark Blue', value: '#00008B' },

    // More Blues & Purples
    { name: 'Medium Blue', value: '#0000CD' }, { name: 'Blue', value: '#0000FF' }, { name: 'Royal Blue', value: '#4169E1' },
    { name: 'Blue Violet', value: '#8A2BE2' }, { name: 'Indigo', value: '#4B0082' }, { name: 'Dark Slate Blue', value: '#483D8B' },
    { name: 'Slate Blue', value: '#6A5ACD' }, { name: 'Medium Slate Blue', value: '#7B68EE' }, { name: 'Medium Purple', value: '#9370DB' },
    { name: 'Dark Magenta', value: '#8B008B' }, { name: 'Dark Violet', value: '#9400D3' }, { name: 'Dark Orchid', value: '#9932CC' },
    { name: 'Medium Orchid', value: '#BA55D3' }, { name: 'Purple', value: '#800080' }, { name: 'Thistle', value: '#D8BFD8' },

    // Purples & Magentas
    { name: 'Plum', value: '#DDA0DD' }, { name: 'Violet', value: '#EE82EE' }, { name: 'Magenta', value: '#FF00FF' },
    { name: 'Orchid', value: '#DA70D6' }, { name: 'Medium Violet Red', value: '#C71585' }, { name: 'Pale Violet Red', value: '#DB7093' },
    { name: 'Deep Pink', value: '#FF1493' }, { name: 'Hot Pink', value: '#FF69B4' }, { name: 'Light Pink', value: '#FFB6C1' },
    { name: 'Pink', value: '#FFC0CB' }, { name: 'Antique White', value: '#FAEBD7' }, { name: 'Beige', value: '#F5F5DC' },

    // Neutrals & Browns
    { name: 'Bisque', value: '#FFE4C4' }, { name: 'Blanched Almond', value: '#FFEBCD' }, { name: 'Wheat', value: '#F5DEB3' },
    { name: 'Corn Silk', value: '#FFF8DC' }, { name: 'Lemon Chiffon', value: '#FFFACD' }, { name: 'Light Golden Rod Yellow', value: '#FAFAD2' },
    { name: 'Light Yellow', value: '#FFFFE0' }, { name: 'Saddle Brown', value: '#8B4513' }, { name: 'Sienna', value: '#A0522D' },
    { name: 'Chocolate', value: '#D2691E' }, { name: 'Peru', value: '#CD853F' }, { name: 'Sandy Brown', value: '#F4A460' },
    { name: 'Burly Wood', value: '#DEB887' }, { name: 'Tan', value: '#D2B48C' }, { name: 'Rosy Brown', value: '#BC8F8F' },

    // More Neutrals
    { name: 'Moccasin', value: '#FFE4B5' }, { name: 'Navajo White', value: '#FFDEAD' }, { name: 'Peach Puff', value: '#FFDAB9' },
    { name: 'Misty Rose', value: '#FFE4E1' }, { name: 'Lavender Blush', value: '#FFF0F5' }, { name: 'Linen', value: '#FAF0E6' },
    { name: 'Old Lace', value: '#FDF5E6' }, { name: 'Papaya Whip', value: '#FFEFD5' }, { name: 'Sea Shell', value: '#FFF5EE' },
    { name: 'Mint Cream', value: '#F5FFFA' }, { name: 'Slate Gray', value: '#708090' }, { name: 'Light Slate Gray', value: '#778899' },

    // Grays
    { name: 'Light Steel Blue', value: '#B0C4DE' }, { name: 'Lavender', value: '#E6E6FA' }, { name: 'Floral White', value: '#FFFAF0' },
    { name: 'Alice Blue', value: '#F0F8FF' }, { name: 'Ghost White', value: '#F8F8FF' }, { name: 'Honeydew', value: '#F0FFF0' },
    { name: 'Ivory', value: '#FFFFF0' }, { name: 'Azure', value: '#F0FFFF' }, { name: 'Snow', value: '#FFFAFA' },
    { name: 'Black', value: '#000000' }, { name: 'Dim Gray', value: '#696969' }, { name: 'Gray', value: '#808080' },
    { name: 'Dark Gray', value: '#A9A9A9' }, { name: 'Silver', value: '#C0C0C0' }, { name: 'Light Gray', value: '#D3D3D3' },
    { name: 'Gainsboro', value: '#DCDCDC' }, { name: 'White Smoke', value: '#F5F5F5' }, { name: 'White', value: '#FFFFFF' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-[90%] max-w-md border border-gray-700">
        <h2 className="text-lg font-bold mb-4 text-white">Add {type}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {type === 'Skill' && (
            <>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Level (0-100)"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              />
            </>
          )}

          {(type === 'Education' || type === 'Certification') && (
            <>
              <input
                type="text"
                placeholder="Title"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Institution"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              />
              <input
                type="text"
                placeholder="Period"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              />
              <textarea
                placeholder="Description"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="3"
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </>
          )}

          {type === 'Skill' && (
            <select
              required
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="" className="text-gray-400">Select Category</option>
              <option value="programming">Programming</option>
              <option value="web">Web</option>
              <option value="other">Other</option>
            </select>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Color</label>
            <div className="grid grid-cols-12 gap-1 max-h-40 overflow-y-auto p-2 bg-gray-700 rounded">
              {colorPalette.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                    formData.color === color.value
                      ? 'border-white shadow-lg scale-110'
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                  onClick={() => setFormData({ ...formData, color: color.value })}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillFormPopup;
