import { useNavigate } from "react-router-dom";
import LoginPageClass from "./LoginPageClass";

function LoginPageFunction(){
    const navigate=useNavigate()
    
    return(
        <LoginPageClass navigate={navigate}></LoginPageClass>
    )
}
export default LoginPageFunction