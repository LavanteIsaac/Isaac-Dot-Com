import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Wall = () => {
  const [fanMailList, setFanMailList] = useState([]);
  const [newFanMail, setNewFanMail] = useState('');

  useEffect(() => {
    fetchFanMail();
  }, []);

  const fetchFanMail = () => {
    axios.get('/api/fanmail')
      .then(response => {
        setFanMailList(response.data);
      })
      .catch(error => {
        console.error('Error fetching fan mail:', error);
      });
  };

  const handleNewFanMailSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/fanmail', { content: newFanMail })
      .then(response => {
        setFanMailList([...fanMailList, response.data]);
        setNewFanMail('');
      })
      .catch(error => {
        console.error('Error adding fan mail:', error);
      });
  };

  const deleteFanMail = (id) => {
    axios.delete(`/api/fanmail/${id}`)
      .then(() => {
        setFanMailList(fanMailList.filter(fanMail => fanMail.id !== id));
      })
      .catch(error => {
        console.error('Error deleting fan mail:', error);
      });
  };

  return (
    <div>
      <h2>Fan Mail Wall</h2>
      <form onSubmit={handleNewFanMailSubmit}>
        <textarea value={newFanMail} onChange={(e) => setNewFanMail(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <div>
        {fanMailList.map(fanMail => (
          <div key={fanMail.id}>
            <p>{fanMail.content}</p>
            <p>{fanMail.created_at}</p>
            <button onClick={() => deleteFanMail(fanMail.id)}>Delete</button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wall;