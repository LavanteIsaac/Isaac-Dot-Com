import React, { useState, useEffect } from "react";
import NewMediaForm from "./NewMediaForm";
import MediaList from "./MediaList";
import Comments from "./Comments";
import Search from "./Search";
import "../index.css"; 

function MediaPage() {
    const [mediaPages, setMediaPages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredMediaPages, setFilteredMediaPages] = useState([]);
    const [darkMode, setDarkMode] = useState(true);
    const [user, setUser] = useState('');
  
    // Function to toggle dark mode
    const handleModeClick = () => {
      setDarkMode(!darkMode);
    };
  
    useEffect(() => {
      fetch("/users")
        .then(r => r.json())
        .then(dbUsers => setUser(dbUsers));
    }, []);
  
    useEffect(() => {
      fetch("/medias")
        .then((resp) => resp.json())
        .then((data) => {
          setMediaPages(data);
          setFilteredMediaPages(data); // Initialize filteredMediaPages with data
        });
    }, []);
  
    const addMediaPage = (newMediaPage) => {
      fetch("/medias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMediaPage),
      })
        .then((resp) => resp.json())
        .then((data) => {
          setMediaPages([...mediaPages, data]);
          setFilteredMediaPages([...filteredMediaPages, data]);
        });
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
          if (resp.ok) {
            setMediaPages(mediaPages.filter((mediaPage) => mediaPage.id !== mediaPageId));
            setFilteredMediaPages(filteredMediaPages.filter((mediaPage) => mediaPage.id !== mediaPageId));
          } else {
            console.error("Failed to delete Media Page");
          }
        })
        .catch((error) => console.error("Error:", error));
    };
  
    return (
      <main className={`main-container ${darkMode ? 'dark-mode' : ''}`}>
        <h1>Welcome, {user.username}</h1>
        <NewMediaForm addMedia={addMediaPage} />
        <Search onChange={handleSearch} />
        <div className="media-list">
          <MediaList mediaPages={filteredMediaPages} deleteMedia={deleteMediaPage} />
        </div>
        <Comments />
        <button className="dark-mode-toggle" onClick={handleModeClick}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
      </main>
    );
  }
  
  export default MediaPage;