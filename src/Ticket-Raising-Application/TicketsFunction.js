import React from "react";
import { useNavigate } from "react-router-dom";
import TicketsPageClass from "./TicketsPageClass";
//import "./TicketsFunction.css"; // Import CSS file (if any)

function TicketsFunction() {
    const navigate = useNavigate();

    return (
        <TicketsPageClass navigate={navigate} />
    );
}

export default TicketsFunction;
