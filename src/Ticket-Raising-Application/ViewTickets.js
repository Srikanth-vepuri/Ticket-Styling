import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Styles/ViewTickets.css'; // Import CSS file if you're using traditional CSS

function ViewTickets() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/TicketDetails")
            .then((res) => setData(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleDashboardClick = () => {
        navigate("/userTicket");
    };

    return (
        <>
            <h1>Tickets</h1>
            <div className="ticket-list">
                {data.map((item) => (
                    <div key={item.id} className={`ticket priority-${item.priority}`}>
                        <p>Ticket Issue: {item.issue}</p>
                        <p>Ticket Status: {item.status}</p>
                        <p>Ticket Priority: {item.priority}</p>
                    </div>
                ))}
            </div>
            <div className="three">
            <button onClick={handleDashboardClick}>Dashboard</button></div>
        </>
    );
}

export default ViewTickets;
