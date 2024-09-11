import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashBoardInOrder from "./AdminDashBoardInOrder";
import AuthContext from "./AuthContext";
//import "./Styles/Adminlogin.css"; // Import CSS file (if any)

function AdminDashBoardInOrderFunction() {
    const navigate = useNavigate();
    const context= useContext(AuthContext)

    return (
        <>
        <AdminDashBoardInOrder navigate={navigate} context={context}></AdminDashBoardInOrder>
        {/* {console.log(globalUsername)} */}
        </>
    );
}

export default AdminDashBoardInOrderFunction;