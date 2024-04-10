import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

// Define Wall component
const Wall = () => {
  // State variables
  const [fanMailList, setFanMailList] = useState([]);
  const [newFanMail, setNewFanMail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch fan mail on component mount
  useEffect(() => {
    fetchFanMail();
  }, []);

  // Function to fetch fan mail
  const fetchFanMail = () => {
    setLoading(true); // Set loading state
    axios.get('/fanmail')
      .then(response => {
        setFanMailList(response.data);
        setError(null); // Clear any previous errors
      })
      .catch(error => {
        console.error('Error fetching fan mail:', error);
        setError('Error fetching fan mail'); // Set error message
      })
      .finally(() => setLoading(false)); // Clear loading state
  };

  // Function to handle new fan mail submission
  const handleNewFanMailSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state
    axios.post('/fanmail', { content: newFanMail })
      .then(response => {
        setFanMailList([...fanMailList, response.data]);
        setNewFanMail('');
        setError(null); // Clear any previous errors
      })
      .catch(error => {
        console.error('Error adding fan mail:', error);
        setError('Error adding fan mail'); // Set error message
      })
      .finally(() => setLoading(false)); // Clear loading state
  };

  // Function to delete fan mail
  const deleteFanMail = (id) => {
    setLoading(true); // Set loading state
    axios.delete(`/fanmail/${id}`)
      .then(() => {
        setFanMailList(fanMailList.filter(fanMail => fanMail.id !== id));
        setError(null); // Clear any previous errors
      })
      .catch(error => {
        console.error('Error deleting fan mail:', error);
        setError('Error deleting fan mail'); // Set error message
      })
      .finally(() => setLoading(false)); // Clear loading state
  };

  // Render component
  return (
    <div>
      <Header />
      <h2>Fan Mail Wall</h2>
      <form onSubmit={handleNewFanMailSubmit}>
        <textarea
          id="fanMailInput"
          value={newFanMail}
          onChange={(e) => setNewFanMail(e.target.value)}
          placeholder="Write your fan mail here..."
        />
        <button type="submit">Submit</button>
      </form>
      {loading && <p>Loading...</p>} {/* Display loading indicator */}
      {error && <p>{error}</p>} {/* Display error message if present */}
      <div>
        {fanMailList.map(fanMail => (
          <div key={fanMail.id}>
            <p>{fanMail.content}</p>
            <p>{new Date(fanMail.created_at).toLocaleString()}</p> {/* Format date */}
            <button onClick={() => deleteFanMail(fanMail.id)}>Delete</button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

// Export Wall component
export default Wall;