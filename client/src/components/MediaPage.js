import React, { useState, useEffect } from "react";
import NewMediaForm from "./NewMediaForm";
import MediaList from "./MediaList";
import Search from "./Search";
import "../index.css";

function MediaPage() {
  const [mediaPages, setMediaPages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMediaPages, setFilteredMediaPages] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState('');
  const [error, setError] = useState(null);

  // Function to toggle dark mode
  const handleModeClick = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    fetch("/users")
      .then(r => {
        if (!r.ok) {
          throw new Error('Failed to fetch users');
        }
        return r.json();
      })
      .then(dbUsers => setUser(dbUsers))
      .catch(error => setError(error.message));
  }, []);

  useEffect(() => {
    fetch("/medias")
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Failed to fetch media');
        }
        return resp.json();
      })
      .then((data) => {
        setMediaPages(data);
        setFilteredMediaPages(data); // Initialize filteredMediaPages with data
      })
      .catch(error => setError(error.message));
  }, []);

  const addMediaPage = (newMediaPage) => {
    fetch("/medias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMediaPage),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Failed to add media page');
        }
        return resp.json();
      })
      .then((data) => {
        setMediaPages([...mediaPages, data]);
        setFilteredMediaPages([...filteredMediaPages, data]);
      })
      .catch(error => setError(error.message));
  };

  useEffect(() => {
    const filtered = mediaPages.filter((mediaPage) =>
      mediaPage.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMediaPages(filtered);
  }, [searchQuery, mediaPages]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const deleteMediaPage = (mediaPageId) => {
    fetch(`medias/${mediaPageId}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Failed to delete media page');
        }
        setMediaPages(mediaPages.filter((mediaPage) => mediaPage.id !== mediaPageId));
        setFilteredMediaPages(filteredMediaPages.filter((mediaPage) => mediaPage.id !== mediaPageId));
      })
      .catch(error => setError(error.message));
  };

  return (
    <main className={`main-container ${darkMode ? 'dark-mode' : ''}`}>
      {error && <div>Error: {error}</div>}
      <h1>Welcome, {user.username}</h1>
      <NewMediaForm addMedia={addMediaPage} />
      <Search onChange={handleSearch} />
      <div className="media-list">
        <MediaList mediaPages={filteredMediaPages} deleteMedia={deleteMediaPage} />
      </div>
      <button className="dark-mode-toggle" onClick={handleModeClick}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
    </main>
  );
}

export default MediaPage;