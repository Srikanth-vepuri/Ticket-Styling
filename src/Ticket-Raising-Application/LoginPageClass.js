import React from "react";
import "./Styles/LoginPageClass.css";
class LoginPageClass extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <>
            <div className="experiments">
            <div className="login-class">
           <button onClick={()=>this.props.navigate("./adminLogin")}>Admin DashBoard</button>
           <button onClick={()=>this.props.navigate("./userLogin")}>User DashBoard</button>
           </div></div>
           </>
        )
    }
}
export default LoginPageClass