import React, { useState, useEffect } from "react";

function Comments() {
  const [comments, setComments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredComments, setFilteredComments] = useState([]);

  useEffect(() => {
    fetch("/comments")
      .then((resp) => resp.json())
      .then((data) => {
        setComments(data);
        setFilteredComments(data);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  const addComment = (newComment) => {
    fetch("/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setComments([...comments, data]);
        setFilteredComments([...filteredComments, data]);
      })
      .catch((error) => console.error("Error adding comment:", error));
  };

  useEffect(() => {
    const filtered = comments.filter((comment) =>
      comment.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredComments(filtered);
  }, [searchQuery, comments]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const deleteComment = (commentId) => {
    fetch(`comments/${commentId}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (resp.ok) {
          setComments(comments.filter((comment) => comment.id !== commentId));
          setFilteredComments(filteredComments.filter((comment) => comment.id !== commentId));
        } else {
          console.error("Failed to delete Comment");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Comments"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <ul>
        {filteredComments.map((comment) => (
          <li key={comment.id}>
            {comment.content}
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;