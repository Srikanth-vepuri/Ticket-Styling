import React from "react";
import { useNavigate } from "react-router-dom";
import UserTicketClass from "./UserTicketClass";
function UserTicketFunction(){
    let navigate=useNavigate();
    return(
        <>
        <UserTicketClass navigate={{navigate}}></UserTicketClass>
        </>
    )
}
export default UserTicketFunction