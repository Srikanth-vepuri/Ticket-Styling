import React from "react";
import axios from "axios";
import ClosedTickets from "./ClosedTickets";
import OpenedTickets from "./OpenedTickets";
//import "./Styles/AdminDashBoardInOrder.css"; // Import CSS file

class AdminDashBoardInOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:3000/TicketDetails")
            .then((res) => this.setState({ data: res.data.sort((a, b) => a.priority - b.priority) }))
            .catch((err) => { console.log(err) });
    }

    handleClosed = () => {
        const closed = this.state.data.filter((item) => item.status === "closed");
        return closed;
    }

    handleOpened = () => {
        const open = this.state.data.filter((item) => item.status === "open");
        return open;
    }

    closeTicket = (idd) => {
        const temp = this.state.data;
        const obj = temp.find((item) => item.id === idd);
        obj.status = "closed";
        this.setState({ data: temp });
    }

    render() {
        return (
            <div className="admin-dashboard-in-order">
                <OpenedTickets data={this.handleOpened()} prop1={this.closeTicket} prop2={this.state.data} />
                <ClosedTickets data={this.handleClosed()} />
            </div>
        );
    }
}

export default AdminDashBoardInOrder;
