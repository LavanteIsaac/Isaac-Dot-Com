import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';


const Wall = () => {
 
  const [fanMailList, setFanMailList] = useState([]);
  const [newFanMail, setNewFanMail] = useState('');
  const [editId, setEditId] = useState(null); // State variable to store the ID of the fan mail being edited
  const [editContent, setEditContent] = useState(''); // State variable to store the updated content
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    fetchFanMail();
  }, []);

  
  const fetchFanMail = () => {
    setLoading(true); 
    axios.get('/fanmail')
      .then(response => {
        setFanMailList(response.data);
        setError(null); 
      })
      .catch(error => {
        console.error('Error fetching fan mail:', error);
        setError('Error fetching fan mail'); 
      })
      .finally(() => setLoading(false)); 
  };

  
  const handleNewFanMailSubmit = (e) => {
    e.preventDefault();
    setLoading(true); 
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
      .finally(() => setLoading(false)); 
  };

 
  const handleEditFanMailSubmit = (id) => {
    setLoading(true); // Set loading state
    axios.put(`/fanmail/${id}`, { content: editContent })
      .then(() => {
        setFanMailList(fanMailList.map(fanMail => {
          if (fanMail.id === id) {
            return { ...fanMail, content: editContent };
          }
          return fanMail;
        }));
        setEditId(null);
        setEditContent('');
        setError(null); 
      })
      .catch(error => {
        console.error('Error editing fan mail:', error);
        setError('Error editing fan mail'); // Set error message
      })
      .finally(() => setLoading(false)); 
  };

 
  const deleteFanMail = (id) => {
    setLoading(true); 
    axios.delete(`/fanmail/${id}`)
      .then(() => {
        setFanMailList(fanMailList.filter(fanMail => fanMail.id !== id));
        setError(null); 
      })
      .catch(error => {
        console.error('Error deleting fan mail:', error);
        setError('Error deleting fan mail'); 
      })
      .finally(() => setLoading(false)); 
  };

  const logoutUser = () => {
   
    localStorage.removeItem("token");
  
    window.location.href = "/login";
  };

 
  return (
    <div>
      <Header logoutUser={logoutUser} />
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
      {loading && <p>Loading...</p>} 
      {error && <p>{error}</p>}
      <div>
        {fanMailList.map(fanMail => (
          <div key={fanMail.id}>
            {editId === fanMail.id ? (
              <div>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button onClick={() => handleEditFanMailSubmit(fanMail.id)}>Save</button>
              </div>
            ) : (
              <div>
                <p>{fanMail.content}</p>
                <p>{new Date(fanMail.created_at).toLocaleString()}</p> 
                <button onClick={() => setEditId(fanMail.id)}>Edit</button>
                <button onClick={() => deleteFanMail(fanMail.id)}>Delete</button>
              </div>
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};


export default Wall;