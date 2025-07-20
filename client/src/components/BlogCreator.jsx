import React, { useState } from "react";
import axios from "axios";

// Simple dark mode styles
const styles = {
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
    zIndex: 100,
  },
  modalContent: {
    backgroundColor: '#2d3748',
    color: '#e2e8f0',
    padding: '24px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflowY: 'auto',
    border: '1px solid #4a5568',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #4a5568',
    paddingBottom: '16px',
    marginBottom: '24px',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#a0aec0',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  input: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#1a202c',
    border: '1px solid #4a5568',
    borderRadius: '4px',
    color: 'white',
    marginTop: '8px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#1a202c',
    border: '1px solid #4a5568',
    borderRadius: '4px',
    color: 'white',
    marginTop: '8px',
    minHeight: '120px',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  button: {
    padding: '10px 15px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: '#3182ce',
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: '#4a5568',
    color: 'white',
  },
  formGroup: {
    marginBottom: '20px',
  },
  checkboxGroup: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  checkbox: {
    marginRight: '8px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #4a5568',
  },
  selectorContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
  },
  selectorButton: {
    padding: '20px',
    border: '1px solid #4a5568',
    borderRadius: '8px',
    textAlign: 'center',
    cursor: 'pointer',
    flex: 1,
    backgroundColor: '#4a5568',
  }
};

const BlogCreator = ({ onClose = () => {}, onBlogCreated = () => {} }) => {
  const [creationType, setCreationType] = useState(""); // 'manual' or 'url'
  const [loading, setLoading] = useState(false);

  const initialManual = {
    title: "", excerpt: "", content: "", image: "",
    categories: "", tags: "",
    author: { name: "", bio: "", avatar: "" },
    featured: false, trending: false,
  };

  const initialUrl = {
    url: "", customTitle: "", customExcerpt: "",
    categories: "", tags: "",
    featured: false, trending: false,
  };

  const [manualForm, setManualForm] = useState(initialManual);
  const [urlForm, setUrlForm] = useState(initialUrl);

  const handleManualChange = (e) => {
    const { name, value, type, checked } = e.target;
    setManualForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAuthorChange = (e) => {
    const { name, value } = e.target;
    setManualForm(prev => ({ ...prev, author: { ...prev.author, [name]: value } }));
  };

  const handleUrlChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUrlForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    setLoading(true);

    const isManual = type === 'manual';
    const endpoint = isManual ? "/api/blog-posts" : "/api/blog-posts/from-url";
    const data = isManual ? manualForm : urlForm;

    try {
      const payload = {
        ...data,
        categories: data.categories.split(",").map(c => c.trim()).filter(Boolean),
        tags: data.tags.split(",").map(t => t.trim()).filter(Boolean),
      };
      const response = await axios.post(`http://localhost:3000${endpoint}`, payload);

      onBlogCreated(response.data);
      alert(`Blog post created successfully!`);
      onClose();
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message || 'An unknown error occurred.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSelector = () => {
    setCreationType("");
    setManualForm(initialManual);
    setUrlForm(initialUrl);
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };
  
  const isManualFormValid = manualForm.title && manualForm.excerpt && manualForm.content;
  const isUrlFormValid = urlForm.url;

  return (
    <div style={styles.modalOverlay} onClick={handleBackgroundClick}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            {creationType === "manual" ? "Create Manually" :
             creationType === "url" ? "Create from URL" :
             "Create New Blog Post"}
          </h2>
          <button style={styles.closeButton} onClick={onClose} disabled={loading}>&times;</button>
        </div>

        {!creationType && (
          <div style={styles.selectorContainer}>
            <button style={styles.selectorButton} onClick={() => setCreationType("manual")}>
              <h3>Add Manually</h3>
              <p>Write your own blog post.</p>
            </button>
            <button style={styles.selectorButton} onClick={() => setCreationType("url")}>
              <h3>From URL</h3>
              <p>Extract content from a link.</p>
            </button>
          </div>
        )}

        {creationType === "manual" && (
          <form onSubmit={(e) => handleSubmit(e, 'manual')}>
            <div style={styles.formGroup}>
              <label>Title *</label>
              <input
                style={styles.input}
                type="text"
                name="title"
                value={manualForm.title}
                onChange={handleManualChange}
                required
                placeholder="How to use React useState Hook effectively"
                maxLength={200}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Excerpt *</label>
              <textarea
                style={styles.textarea}
                name="excerpt"
                value={manualForm.excerpt}
                onChange={handleManualChange}
                required
                placeholder="A brief overview of useState in React for beginners."
                maxLength={500}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Content *</label>
              <textarea
                style={{...styles.textarea, minHeight: '200px'}}
                name="content"
                value={manualForm.content}
                onChange={handleManualChange}
                required
                placeholder="Write your full blog content here. HTML is supported."
              />
            </div>
            <div style={styles.formGroup}>
              <label>Featured Image URL</label>
              <input
                style={styles.input}
                type="url"
                name="image"
                value={manualForm.image}
                onChange={handleManualChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div style={styles.formGroup}>
              <label>Categories (comma-separated)</label>
              <input
                style={styles.input}
                type="text"
                name="categories"
                value={manualForm.categories}
                onChange={handleManualChange}
                placeholder="Technology, Web Development"
              />
            </div>
            <div style={styles.formGroup}>
              <label>Tags (comma-separated)</label>
              <input
                style={styles.input}
                type="text"
                name="tags"
                value={manualForm.tags}
                onChange={handleManualChange}
                placeholder="react, javascript, tutorial"
              />
            </div>
            <div style={styles.formGroup}>
              <label>Author Name</label>
              <input
                style={styles.input}
                type="text"
                name="name"
                value={manualForm.author.name}
                onChange={handleAuthorChange}
                placeholder="Jane Doe"
              />
            </div>
            <div style={styles.formGroup}>
              <label>Author Bio</label>
              <input
                style={styles.input}
                type="text"
                name="bio"
                value={manualForm.author.bio}
                onChange={handleAuthorChange}
                placeholder="Senior React developer and blogger."
                maxLength={150}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Author Avatar URL</label>
              <input
                style={styles.input}
                type="url"
                name="avatar"
                value={manualForm.author.avatar}
                onChange={handleAuthorChange}
                placeholder="https://example.com/avatar.png"
              />
            </div>

            <div style={{...styles.formGroup, ...styles.checkboxGroup}}>
                <label style={styles.checkboxLabel}>
                  <input
                    style={styles.checkbox}
                    type="checkbox"
                    name="featured"
                    checked={manualForm.featured}
                    onChange={handleManualChange}
                  /> Featured Post
                </label>
                <label style={styles.checkboxLabel}>
                  <input
                    style={styles.checkbox}
                    type="checkbox"
                    name="trending"
                    checked={manualForm.trending}
                    onChange={handleManualChange}
                  /> Trending Post
                </label>
            </div>
            
            <div style={styles.buttonGroup}>
              <button type="button" style={{ ...styles.button, ...styles.secondaryButton }} onClick={handleBackToSelector} disabled={loading}>Back</button>
              <button type="submit" style={{ ...styles.button, ...styles.primaryButton }} disabled={loading || !isManualFormValid}>
                {loading ? "Creating..." : "Create Post"}
              </button>
            </div>
          </form>
        )}

        {creationType === "url" && (
           <form onSubmit={(e) => handleSubmit(e, 'url')}>
            <div style={styles.formGroup}>
              <label>Article URL *</label>
              <input
                style={styles.input}
                type="url"
                name="url"
                value={urlForm.url}
                onChange={handleUrlChange}
                required
                placeholder="https://example.com/article"
              />
            </div>
            <div style={styles.formGroup}>
              <label>Custom Title (Optional)</label>
              <input
                style={styles.input}
                type="text"
                name="customTitle"
                value={urlForm.customTitle}
                onChange={handleUrlChange}
                placeholder="Override the extracted title"
                maxLength={200}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Custom Excerpt (Optional)</label>
              <textarea
                style={styles.textarea}
                name="customExcerpt"
                value={urlForm.customExcerpt}
                onChange={handleUrlChange}
                placeholder="Override excerpt from the URL (one or two lines)"
                maxLength={500}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Categories (comma-separated)</label>
              <input
                style={styles.input}
                type="text"
                name="categories"
                value={urlForm.categories}
                onChange={handleUrlChange}
                placeholder="Technology, Web Development"
              />
            </div>
            <div style={styles.formGroup}>
              <label>Tags (comma-separated)</label>
              <input
                style={styles.input}
                type="text"
                name="tags"
                value={urlForm.tags}
                onChange={handleUrlChange}
                placeholder="react, javascript, tutorial"
              />
            </div>

            <div style={{...styles.formGroup, ...styles.checkboxGroup}}>
                <label style={styles.checkboxLabel}>
                  <input
                    style={styles.checkbox}
                    type="checkbox"
                    name="featured"
                    checked={urlForm.featured}
                    onChange={handleUrlChange}
                  /> Featured Post
                </label>
                <label style={styles.checkboxLabel}>
                  <input
                    style={styles.checkbox}
                    type="checkbox"
                    name="trending"
                    checked={urlForm.trending}
                    onChange={handleUrlChange}
                  /> Trending Post
                </label>
            </div>

            <div style={styles.buttonGroup}>
              <button type="button" style={{ ...styles.button, ...styles.secondaryButton }} onClick={handleBackToSelector} disabled={loading}>Back</button>
              <button type="submit" style={{ ...styles.button, ...styles.primaryButton }} disabled={loading || !isUrlFormValid}>
                {loading ? "Extracting..." : "Extract & Create"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogCreator;
