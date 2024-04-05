import React, { useState, useEffect } from "react";
import NewMediaForm from "./NewMediaForm";
import MediaList from "./MediaList";
import Search from "./Search";


function MediaPage() {
    const [mediaPages, setMediaPages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredMediaPages, setFilteredMediaPages] = useState(mediaPages);
    

    useEffect(() => {
        fetch("/medias")
        .then((resp) => resp.json())
        .then((data) => setMediaPages(data))
    }, []);

    const addMediaPage = (newMediaPage) => {
        fetch("/medias", {
            method: "POST",
            headers: {"Content-Type": "Application/JSON"},
            body: JSON.stringify(newMediaPage),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setMediaPages([...mediaPages, data]);
        })
    };
    useEffect(() => {
        const filtered = mediaPages.filter((mediaPage) =>
        mediaPage.type.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredMediaPages(filtered);
        console.log(mediaPages)
    }, [searchQuery, mediaPages]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const deleteMediaPage = (mediaPageId) => {
        fetch(`medias/${mediaPageId}`, {
            method:"DELETE",
        })
        .then((resp) => {
            if (resp.ok) {
                setFilteredMediaPages((originalMediaPages) =>
                originalMediaPages.filter((mediaPage) => mediaPage.id !== mediaPageId)
                );
            } else {
                console.error("Failed to delete Media Page");
            }
        });
    };

    return (
        <main className="main-container">
            <NewMediaForm addMedia={addMediaPage}/>
            <br />
            <br />
            <br />
            <br />
            <Search onChange={handleSearch}/>
            <br />
            <br />
            <MediaList mediaPages={filteredMediaPages} deleteMedia={deleteMediaPage} addMediaPage={addMediaPage}/>
            
        </main>
    );
}


export default MediaPage;