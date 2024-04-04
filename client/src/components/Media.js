import React, { useState, useEffect } from "react";
import NewMediaForm from "./NewMediaForm";
import MediaList from "./MediaList"
import Search from "./Search";

function Media() {
    const [medias, setMedias] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredMedias, setFilteredMedias] = useState(medias);

    useEffect(() => {
        fetch("http://localhost:5555/medias")
        .then((resp) => resp.json())
        .then((data) => setMedias(data))
    }, []);

    const addMedia = (newMedia) => {
        fetch("http://localhost:5555/media", {
            method: "POST",
            headers: {"Content-Type": "Application/JSON"},
            body: JSON.stringify(newMedia),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setMedias([...medias, data]);
        })
    };
    useEffect(() => {
        const filtered = medias.filter((media) =>
        media.color.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredMedias(filtered);
        console.log(medias)
    }, [searchQuery, medias]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const deleteMedia = (mediaId) => {
        fetch(`http://localhost:5555/mustangs/${mediaId}`, {
            method:"DELETE",
        })
        .then((resp) => {
            if (resp.ok) {
                setFilteredMedias((originalMedias) =>
                originalMedias.filter((media) => media.id !== mediaId)
                );
            } else {
                console.error("Failed to delete Media");
            }
        });
    };

    return (
        <main className="main-container">
            <NewMediaForm addMedia={addMedia}/>
            <br />
            <br />
            <br />
            <br />
            <Search onChange={handleSearch}/>
            <br />
            <br />
            <MediaList media={filteredMedias} deleteMedia={deleteMedia} addMedia={addMedia}/>
            
        </main>
    );
}


export default Media;