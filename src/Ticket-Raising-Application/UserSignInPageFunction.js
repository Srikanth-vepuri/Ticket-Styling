
import React from "react";
import { useNavigate } from "react-router-dom";
import UserSignInPageClass from "./UserSignPageClass";
function UserSignInPageFunction(){
    let navigate=useNavigate();
    return(
        <>
        <UserSignInPageClass navigate={{navigate}}></UserSignInPageClass>
        </>
    )
}
export default UserSignInPageFunction