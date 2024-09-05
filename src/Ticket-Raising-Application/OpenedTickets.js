import React from "react";
import axios from "axios";
import "./Styles/OpenedTickets.css"; // Import CSS file

class OpenedTickets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: ""
        };
    }

    handleUpdate = (e, keyid) => {
        axios.patch(`http://localhost:3000/TicketDetails/${keyid}`, {
            description: e.target.value
        }).then((res) => { console.log(res) })
            .catch((err) => { console.log(err) });
    }

    render() {
        return (<><h1 className="openheading">OPENED TICKETS</h1>
            <div className="opened-tickets">
                {this.props.data.map((item) => (
                    <div key={item.id} className={`ticket priority-${item.priority}`}>
                        <p>Ticket-Issue: {item.issue}</p>
                        <p>Ticket-Status: {item.status}</p>
                        <p>Ticket-Priority: {item.priority}</p>
                        Solotion:
                        <textarea onChange={(e) => this.handleUpdate(e, item.id)}></textarea>
                        <br />
                        <button onClick={() => this.props.prop1(item.id)}>Close</button>
                        <br />
                    </div>
                ))}
            </div></>
        );
    }
}

export default OpenedTickets;
