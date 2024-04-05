import React, { useState, useEffect } from "react";
import NewMediaForm from "./NewMediaForm";
import MediaList from "./MediaList";
import Comments from "./Comments";
import Search from "./Search";

function MediaPage() {
  const [mediaPages, setMediaPages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMediaPages, setFilteredMediaPages] = useState([]);

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
    <main className="main-container">
      <NewMediaForm addMedia={addMediaPage} />
      <br />
      <br />
      <br />
      <br />
      <Search onChange={handleSearch} />
      <br />
      <br />
      <MediaList mediaPages={filteredMediaPages} deleteMedia={deleteMediaPage} addMediaPage={addMediaPage} />
      <Comments />
    </main>
  );
}

export default MediaPage;