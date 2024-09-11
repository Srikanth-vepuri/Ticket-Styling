import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashBoard from "./AdminDashBoard";
import AuthContext from "./AuthContext";
//import "./Styles/Adminlogin.css"; // Import CSS file (if any)

function AdminDashBoardFunction() {
    const navigate = useNavigate();
    const context= useContext(AuthContext)

    return (
        <>
        <AdminDashBoard navigate={navigate} context={context}></AdminDashBoard>
        {/* {console.log(globalUsername)} */}
        </>
    );
}

export default AdminDashBoardFunction;