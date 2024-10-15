import React, { useState, useEffect } from 'react';
import './Messages.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      const response = await fetch('https://group-13-jtix.vercel.app/api/adminAllMessages', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="messages-container">
      <h2>Internal Messages</h2>
      <ul className="messages-list">
        {messages.map((message) => (
          <li key={message._id} className="message-item">
            <div className="message-header">
              <div><strong>From:</strong> {message.name}</div> <br />
              <div><strong>Email:</strong> {message.email}</div> <br />
              <div><strong>Responded:</strong> {message.responded ? 'Yes' : 'No'}</div> <br />
              <span>{new Date(message.createdAt).toLocaleString()}</span> 
            </div>
            <div className="message-body">
              <strong>Contents:</strong>
              <p>{message.message}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
