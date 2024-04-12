import React, { useState } from 'react';

const MediaCard = ({ mediaPage }) => {
  const [comments, setComments] = useState([]);

  const handleAddComment = (comment) => {
    setComments([...comments, comment]);
  };

  return (
    <div className="media-card">
      <img src={mediaPage.url} alt={mediaPage.title} />
      <h4>{mediaPage.title}</h4>
      <p>{mediaPage.description}</p>
      
      {/* Display comments */}
      <div>
        <h5>Comments</h5>
        {comments.map((comment, index) => (
          <div key={index}>{comment}</div>
        ))}
      </div>

      {/* Add comment form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const comment = e.target.elements.comment.value;
          if (comment.trim() !== '') {
            handleAddComment(comment);
            e.target.elements.comment.value = '';
          }
        }}
      >
        <input type="text" name="comment" placeholder="Add a comment..." />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MediaCard;