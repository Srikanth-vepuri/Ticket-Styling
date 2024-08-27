import React from "react";
import { useNavigate } from "react-router-dom";
import AdminLoginClass from "./AdminLoginClass";
//import "./Styles/Adminlogin.css"; // Import CSS file (if any)

function AdminLoginPageFunction() {
    const navigate = useNavigate();

    return (
        <AdminLoginClass navigate={navigate} />
    );
}

export default AdminLoginPageFunction;
