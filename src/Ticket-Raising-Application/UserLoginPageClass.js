import React from "react";
import axios from "axios";
import "./Styles/UserLogin.css"; // Import CSS file

class UserLoginPageClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errusername: "",
            errpassword: "",
        };
    }

    handleSubmit = (e) => {
        const { navigate } = this.props;
        console.log("dfghjk")
        axios.get(`http://localhost:3000/UserLoginDetails?username=${this.state.username}&&password=${this.state.password}`)
            .then((res) => {
                const response = res.data[0];
                if (this.state.username!=="" && this.state.password!=="") {
                    if (!response) {
                        navigate("/userSignIn");
                    }
                    if (response.username === this.state.username && response.password === this.state.password) {
                        navigate('/userTicket');
                    }
                } else {
                    navigate("/userSignIn");
                }
            }).catch((err) => console.log(err));
    }

    handleChange = (e, keyword) => {
        if (keyword === "username") {
            if (e.target.value!=="") {
                this.setState({ username: e.target.value });
            } 
            if(e.target.value===""){
                this.setState({ errusername: "please enter username" });
            }
        } else {
            if (e.target.value!=="") {
                this.setState({ password: e.target.value });
            }
            if(e.target.value===""){
                this.setState({ errpassword: "please enter password" });
            }
        }
    }

    render() {
        return (
            <div className="user-container">
            <div className="user-login">
                UserName:<input type="text" placeholder="please enter username" onBlur={(e) => this.handleChange(e, "username")} />
                <div className="error">{this.state.errusername}</div>
                Password:<input type="password" placeholder="please enter password" onBlur={(e) => this.handleChange(e, "password")} />
                <div className="error">{this.state.errpassword}</div>
                <button onClick={()=>this.handleSubmit()}>login/Signup</button>
            </div></div>
        );
    }
}

export default UserLoginPageClass;