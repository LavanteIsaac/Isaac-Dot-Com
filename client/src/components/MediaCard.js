import React, { useState, useEffect } from 'react';

const MediaCard = ({ mediaPage }) => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    fetch('/comments')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        return response.json();
      })
      .then(data => {
        setComments(data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  };

  const handleAddComment = () => {
    fetch('/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: newCommentText }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add comment');
        }
        return response.json();
      })
      .then(data => {
        setComments([...comments, data]);
        setNewCommentText('');
      })
      .catch(error => {
        console.error('Error adding comment:', error);
      });
  };

  const handleDeleteComment = (id) => {
    fetch(`/comments/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete comment');
        }
        setComments(comments.filter(comment => comment.id !== id));
      })
      .catch(error => {
        console.error('Error deleting comment:', error);
      });
  };

  return (
    <div className="media-card">
      {mediaPage.category === 'video' ? (
        <video controls>
          <source src={mediaPage.url} category="video" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={mediaPage.url} alt={mediaPage.title} />
      )}

      <h4>{mediaPage.title}</h4>
      <p>{mediaPage.description}</p>

      <div>
        <h5>Comments</h5>
        {comments.map((comment) => (
          <div key={comment.id}>
            <span>{comment.description}</span>
            <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddComment();
        }}
      >
        <input
          type="text"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MediaCard;