import React from "react";
import "./Styles/ClosedTickets.css"; // Import CSS file

class ClosedTickets extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<><h1 className="closedhead">CLOSED TICKETS</h1>
            <div className="closed-tickets">
                {this.props.data.map((item) => (
                    <div key={item.id} className={`ticket priority-${item.priority}`}>
                        <p>Ticket-Id: {item.id}</p>
                        <p>Ticket-Status: {item.status}</p>
                        <p>Ticket-Priority: {item.priority}</p>
                        {/* <p>Ticket-Description: {item.description}</p> */}
                        <br />
                    </div>
                ))}
            </div></>
        );
    }
}

export default ClosedTickets;
