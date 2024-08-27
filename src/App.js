import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './Ticket.css';
import Ticket from './Components/Ticket';

const App = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tickets');
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets tickets", error);
      }
    };
    fetchTickets();
  }, []);

  const handleCommentAdd = async (id, comment) => {
    try {
      await axios.patch(`http://localhost:5000/tickets/${id}`, {
        comments: [...tickets.find(ticket => ticket.id === id).comments, comment]
      });
      setTickets(tickets.map(ticket => 
        ticket.id === id ? { ...ticket, comments: [...ticket.comments, comment] } : ticket
      ));
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  const handleTicketClose = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/tickets/${id}`, { status: 'closed' });
      setTickets(tickets.map(ticket => 
        ticket.id === id ? { ...ticket, status: 'closed' } : ticket
      ));
    } catch (error) {
      console.error("Error closing ticket", error);
    }
  };

  const sortedTickets = tickets.sort((a, b) => b.priority - a.priority);

  return (
    <div className="app">
      <h1>Ticket Raising Application</h1>
      <div className="ticket-list">
        {sortedTickets.map(ticket => (
          <Ticket 
            key={ticket.id} 
            ticket={ticket} 
            onCommentAdd={handleCommentAdd} 
            onClose={handleTicketClose} 
          />
        ))}
      </div>
    </div>
  );
};

export default App;