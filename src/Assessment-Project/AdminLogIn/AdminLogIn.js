import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Context from "../Context/Context";
import { useNavigate } from "react-router-dom";
import "../CSS/AdminLogin.css";

function AdminLogIn() {
  const [adminData, setAdminData] = useState([]);
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setGlobalUser } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/AdminLoginDetails")
      .then((res) => setAdminData(res.data))
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e, field) => {
    const value = e.target.value;
    switch (field) {
      case "name": setName(value); break;
      case "email": setEmail(value); break;
      case "password": setPassword(value); break;
      default: break;
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (name && password && email) {
      const filteredResult = adminData.filter(item =>
        item.adminname === name && item.adminpassword === password
      );

      if (filteredResult.length === 1) {
        setGlobalUser({ Username: name, Email: email });
        navigate("/adminDashboard");
      } else {
        setErrorName("Invalid username or password");
      }
    } else {
      if (!name) setErrorName("Please enter your name");
      if (!email) setErrorEmail("Please enter your email");
      if (!password) setErrorPassword("Please enter your password");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <h1 className="admin-login-title">Admin Login</h1>
      <form className="admin-login-form">
        <div className="admin-form-group">
          <label className="admin-form-label" htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className="admin-form-input"
            placeholder="Enter your name"
            onChange={(e) => handleChange(e, "name")}
          />
          {errorName && <p className="admin-error-message">{errorName}</p>}
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="admin-form-input"
            placeholder="Enter your email"
            onChange={(e) => handleChange(e, "email")}
          />
          {errorEmail && <p className="admin-error-message">{errorEmail}</p>}
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label" htmlFor="password">Password:</label>
          <div className="admin-password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="admin-form-input"
              placeholder="Enter your password"
              onChange={(e) => handleChange(e, "password")}
            />
            <span className="admin-toggle-password" onClick={togglePasswordVisibility}>
              {passwordVisible ? "🔐" : "🔓"}
            </span>
          </div>
          {errorPassword && <p className="admin-error-message">{errorPassword}</p>}
        </div>
        <div className="admin-button-container">
          <button className="admin-login-button" onClick={handleClick}>
            Log In
          </button>
        </div>
      </form>
    </>
  );
}

export default AdminLogIn;
