
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserLoginPageClass from "./UserLoginPageClass";
import AuthContext from "./AuthContext";
//import "./Styles/Adminlogin.css"; // Import CSS file (if any)

function UserLoginPageFunction() {
    const navigate = useNavigate();
    const {globalUsername,setUsername}=useContext(AuthContext)

    return (
        <UserLoginPageClass navigate={navigate} />
    );
}

export default UserLoginPageFunction;