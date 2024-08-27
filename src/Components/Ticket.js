import React, { useState } from 'react';
//import './Ticket.css';

const Ticket = ({ ticket, onCommentAdd, onClose }) => {
  const [comment, setComment] = useState('');
  const priorityColors = {
    1: 'lightgrey',
    2: 'lightblue',
    3: 'lightgreen',
    4: 'yellow',
    5: 'orange'
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      onCommentAdd(ticket.id, comment);
      setComment('');
    }
  };

  return (
    <div 
      className="ticket" 
      style={{ backgroundColor: priorityColors[ticket.priority] || 'white' }}
    >
      <h2>Ticket ID: {ticket.id}</h2>
      <p>Timestamp: {new Date(ticket.timestamp).toLocaleString()}</p>
      <p>Priority: {ticket.priority}</p>
      <p>Description: {ticket.description}</p>
      <p>Status: {ticket.status}</p>
      {ticket.status === 'open' && (
        <div>
          <input 
            type="text" 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            placeholder="Add comment"
          />
          <button onClick={handleAddComment}>Add Comment</button>
          <button onClick={() => onClose(ticket.id)}>Close Ticket</button>
        </div>
      )}
      <div>
        <h3>Comments</h3>
        <ul>
          {ticket.comments.map((c, index) => (
            <li key={index}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Ticket;