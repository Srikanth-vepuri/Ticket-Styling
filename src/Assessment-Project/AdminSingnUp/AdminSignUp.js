import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/AdminSignUp.css";

function AdminSignUp() {
    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [errorName, setErrorName] = useState("");
    const [errorEmail, seterrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [number, setnumber] = useState("");
    const [errorNumber, seterrorNumber] = useState("");
    const [successfulmsg, setSuccessfulmsg] = useState("");
    const [create, setCreate] = useState("Please create an account!");
    const [adminData, setadminData] = useState([]);
    const [adminPhoto, setAdminPhoto] = useState();

    useEffect(() => {
        axios
            .get("http://localhost:3000/AdminLoginDetails")
            .then((res) => {
                setadminData(res.data);
                console.log("res", res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const navigate = useNavigate();
    const handleChange = (e, keyword) => {
        e.preventDefault();
        if (keyword === "name") {
            setName(e.target.value);
        } else if (keyword === "password") {
            setPassword(e.target.value);
        } else if (keyword === "email") {
            setemail(e.target.value);
        } else if (keyword === "number") {
            setnumber(e.target.value);
        } else if (keyword === "photo") {
            console.log(e.target.files);
            setAdminPhoto(e.target.files[0]);
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        const mobilenumrgx = /^[7-9]\d{9}$/;
        const passwordrgx = /^\d{6}$/;
        adminData.map((item) => {
            const isin = item.adminpassword === password;
            if (!isin) {
                if (mobilenumrgx.test(number) && passwordrgx.test(password)) {
                    if (name && password && email && number && !errorName && !errorPassword && !errorEmail && !errorNumber) {
                        if (number.length === 10 && password.length === 6) {
                            axios
                                .post("http://localhost:3000/AdminLoginDetails", {
                                    adminname: name,
                                    adminpassword: password,
                                    adminemail: email,
                                    phonenumber: number,
                                })
                                .then((res) => {
                                    console.log(res.data);
                                })
                                .catch((error) => console.log(error));
                            setSuccessfulmsg("You've created your account successfully!");
                            navigate("/adminLogin");
                        } else {
                            if (number.length !== 10) {
                                seterrorNumber(`The phone number must be 10 digits. You entered ${number.length}.`);
                            } else {
                                seterrorNumber("");
                            }
                            if (password.length !== 6) {
                                setErrorPassword(`The password must be 6 digits. You entered ${password.length}.`);
                            } else {
                                setErrorPassword("");
                            }
                        }
                    } else {
                        if (!name) setErrorName("Please enter your name.");
                        if (!password) setErrorPassword("Please enter your password.");
                        if (!email) seterrorEmail("Please enter your email.");
                        if (!number) seterrorNumber("Please enter your phone number.");
                    }
                } else {
                    if (!mobilenumrgx.test(number)) {
                        seterrorNumber("Mobile number is invalid.");
                    } else {
                        seterrorNumber("");
                    }
                    if (!passwordrgx.test(password)) {
                        setErrorPassword("Password is invalid.");
                    } else {
                        setErrorPassword("");
                    }
                }
            }
        });
    };

    return (
        <div className="signup-container">
            <h1 className="signup-title">{create}</h1>
            <div>
                <form>
                    <div className="signup-card">
                        
                        <div className="input-group">
                            <label className="input-label" htmlFor="name">Name:</label>
                            <input type="text" id="signupname" placeholder="Enter your name" onChange={(e) => handleChange(e, "name")} />
                            <p className="error-message">{errorName}</p>
                        </div>
                        <div className="input-group">
                            <label className="input-label" htmlFor="email">Email:</label>
                            <input type="text" id="signupemail" placeholder="Enter your email" onChange={(e) => handleChange(e, "email")} />
                            <p className="error-message">{errorEmail}</p>
                        </div>
                        <div className="input-group">
                            <label className="input-label" htmlFor="password">Password:</label>
                            <input type="password" id="signuppassword" placeholder="Enter your password" onChange={(e) => handleChange(e, "password")} />
                            <p className="error-message">{errorPassword}</p>
                        </div>
                        <div className="input-group">
                            <label className="input-label" htmlFor="number">Phone Number:</label>
                            <input type="text" id="signupnumber" placeholder="Enter your phone number" onChange={(e) => handleChange(e, "number")} />
                            <p className="error-message">{errorNumber}</p>
                        </div>
                        <div className="input-group">
                            <label className="input-label" htmlFor="file">Choose Photo:</label>
                            <input type="file" id="file" onChange={(e) => handleChange(e, "photo")} />
                        </div>
                        <div className="button-box">
                            <button className="submit-button" onClick={handleClick}>Create Account</button>
                        </div>
                        <p className="success-message">{successfulmsg}</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminSignUp;
