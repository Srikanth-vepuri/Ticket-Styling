import React from "react";
import { useNavigate } from "react-router-dom";
import SignInPage from "./SignInPage";
function SignInPageFunction(){
    let navigate=useNavigate();
    return(
        <>
        <SignInPage navigate={{navigate}}></SignInPage>
        </>
    )
}
export default SignInPageFunction