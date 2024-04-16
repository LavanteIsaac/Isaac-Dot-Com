// import React, { useState, useEffect } from "react";

// function Comments() {
//   const [comments, setComments] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredComments, setFilteredComments] = useState([]);
//   const [newCommentText, setNewCommentText] = useState("");
//   const [editingCommentId, setEditingCommentId] = useState(null);
//   const [editedCommentText, setEditedCommentText] = useState("");

//   useEffect(() => {
//     fetch("/comments")
//       .then((resp) => resp.json())
//       .then((data) => {
//         setComments(data);
//         setFilteredComments(data);
//       })
//       .catch((error) => console.error("Error fetching comments:", error));
//   }, []);

//   const addComment = () => {
//     const newComment = { content: newCommentText }; 
//     fetch("/comments", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newComment),
//     })
//       .then((resp) => resp.json())
//       .then((data) => {
//         setComments([...comments, data]); 
//         setFilteredComments([...filteredComments, data]);
//         setNewCommentText("");
//       })
//       .catch((error) => console.error("Error adding comment:", error));
//   };

//   useEffect(() => {
//     const filtered = comments.filter((comment) =>
//       comment.content.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredComments(filtered);
//   }, [searchQuery, comments]);

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   const handleNewCommentChange = (event) => {
//     setNewCommentText(event.target.value);
//   };

//   const handleSubmitComment = (event) => {
//     event.preventDefault();
//     addComment();
//   };

//   const startEdit = (commentId, content) => {
//     setEditingCommentId(commentId);
//     setEditedCommentText(content);
//   };

//   const cancelEdit = () => {
//     setEditingCommentId(null);
//     setEditedCommentText("");
//   };

//   const saveEdit = (commentId) => {
//     fetch(`/comments/${commentId}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ content: editedCommentText }),
//     })
//       .then((resp) => resp.json())
//       .then((data) => {
//         const updatedComments = comments.map((comment) =>
//           comment.id === commentId ? { ...comment, content: data.content } : comment
//         );
//         setComments(updatedComments);
//         setFilteredComments(updatedComments);
//         setEditingCommentId(null);
//         setEditedCommentText("");
//       })
//       .catch((error) => console.error("Error updating comment:", error));
//   };

//   const deleteComment = (commentId) => {
//     fetch(`/comments/${commentId}`, {
//       method: "DELETE"
//     })
//     .then(() => {
//       const updatedComments = comments.filter(comment => comment.id !== commentId);
//       setComments(updatedComments);
//       setFilteredComments(updatedComments);
//     })
//     .catch((error) => console.error("Error deleting comment:", error));
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search Comments"
//         onChange={(e) => handleSearch(e.target.value)}
//       />
    
//       <form onSubmit={handleSubmitComment}>
//         <input
//           type="text"
//           placeholder="Add a new comment"
//           value={newCommentText}
//           onChange={handleNewCommentChange}
//         />
//         <button type="submit">Add Comment</button>
//       </form>
//       <ul>
//         {filteredComments.map((comment) => (
//           <li key={comment.id}>
//             {editingCommentId === comment.id ? (
//               <>
//                 <input
//                   type="text"
//                   value={editedCommentText}
//                   onChange={(e) => setEditedCommentText(e.target.value)}
//                 />
//                 <button onClick={() => saveEdit(comment.id)}>Save</button>
//                 <button onClick={cancelEdit}>Cancel</button>
//               </>
//             ) : (
//               <>
//                 {comment.content}
//                 <button onClick={() => startEdit(comment.id, comment.content)}>Edit</button>
//                 <button onClick={() => deleteComment(comment.id)}>Delete</button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Comments;