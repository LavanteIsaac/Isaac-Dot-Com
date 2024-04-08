import React, { useState, useEffect } from "react";

function Comments() {
  const [comments, setComments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredComments, setFilteredComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState(""); // New state for storing the text of the new comment

  useEffect(() => {
    fetch("/comments")
      .then((resp) => resp.json())
      .then((data) => {
        setComments(data);
        setFilteredComments(data);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  const addComment = () => {
    const newComment = { content: newCommentText }; // Create a new comment object
    fetch("/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setComments([...comments, data]); // Add the new comment to the comments array
        setFilteredComments([...filteredComments, data]);
        setNewCommentText(""); // Clear the input field after adding the comment
      })
      .catch((error) => console.error("Error adding comment:", error));
  };

  useEffect(() => {
    const filtered = comments.filter((comment) =>
      comment.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredComments(filtered);
  }, [searchQuery, comments]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleNewCommentChange = (event) => {
    setNewCommentText(event.target.value);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    addComment(); // Call addComment when the form is submitted
  };

  const deleteComment = (commentId) => {
    // Logic for deleting a comment
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Comments"
        onChange={(e) => handleSearch(e.target.value)}
      />
      {/* Form for adding a new comment */}
      <form onSubmit={handleSubmitComment}>
        <input
          type="text"
          placeholder="Add a new comment"
          value={newCommentText}
          onChange={handleNewCommentChange}
        />
        <button type="submit">Add Comment</button>
      </form>
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