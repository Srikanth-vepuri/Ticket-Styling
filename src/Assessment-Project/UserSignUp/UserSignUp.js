import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/UserSignUp.css"

function UserSignUp() {
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

  useEffect(() => {
    axios
      .get("http://localhost:3001/UserLoginDetails")
      .then((res) => {
        setadminData(res.data);
        console.log("res", res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const navigate = useNavigate();

  const handleChange = (e, keyword) => {
    e.preventDefault();
    if (keyword === "name") setName(e.target.value);
    if (keyword === "password") setPassword(e.target.value);
    if (keyword === "email") setemail(e.target.value);
    if (keyword === "number") setnumber(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (name && password && email && number && !errorName && !errorPassword && !errorEmail && !errorNumber) {
      if (number.length === 10 && password.length === 6) {
        axios
          .post("http://localhost:3001/UserLoginDetails", {
            username: name,
            userpassword: password,
            useremail: email,
            phonenumber: number,
          })
          .then((res) => {
            console.log(res.data);
            setSuccessfulmsg("You've created your account successfully!");
            navigate("/adminLogin");
          })
          .catch((error) => console.log(error));
      } else {
        if (number.length !== 10) {
          seterrorNumber(`The phone number must be 10 digits. You entered ${number.length}`);
        }
        if (password.length !== 6) {
          setErrorPassword(`The password must be 6 digits. You entered ${password.length}`);
        }
      }
    } else {
      if (!name) setErrorName("Please enter the name.");
      if (!password) setErrorPassword("Please enter the password.");
      if (!email) seterrorEmail("Please enter the email.");
      if (!number) seterrorNumber("Please enter the Phone Number.");
    }
  };

  return (
    <div className="signuppage">
      <h1 className="errormsg">{create}</h1>
      <form>
        <div className="container">
          <div className="form">
            <h1 className="signupheading">Sign Up</h1>
            <div className="input-group">
              <label htmlFor="name">Name:</label>
              <input type="text" placeholder="Enter your name" onChange={(e) => handleChange(e, "name")} />
              {errorName && <p className="error">{errorName}</p>}
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input type="text" placeholder="Enter your email" onChange={(e) => handleChange(e, "email")} />
              {errorEmail && <p className="error">{errorEmail}</p>}
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input type="password" placeholder="Enter your Password" onChange={(e) => handleChange(e, "password")} />
              {errorPassword && <p className="error">{errorPassword}</p>}
            </div>
            <div className="input-group">
              <label htmlFor="number">Phone Number:</label>
              <input type="text" placeholder="Enter Your Phone Number" onChange={(e) => handleChange(e, "number")} />
              {errorNumber && <p className="error">{errorNumber}</p>}
            </div>
            <div className="button-box">
              <button className="createbutton" onClick={(e) => handleClick(e)}>Create Account</button>
            </div>
            {successfulmsg && <p className="success">{successfulmsg}</p>}
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserSignUp;
