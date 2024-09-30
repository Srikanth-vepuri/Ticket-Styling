import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Context from "../Context/Context";
import { useNavigate } from "react-router-dom";
import "../CSS/UserLogin.css"

function UserLogIn() {
  const [userData, setuserData] = useState([]);
  const [errorBox, seterrorBox] = useState("");
  const [errorPassword, seterrorPassword] = useState("");
  const [passwordVisible, setpasswordVisible] = useState(false);
  const [errorName, seterrorName] = useState("");
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [errorEmail, seterrorEmail] = useState("");
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const { setGlobalUser } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/UserLoginDetails")
      .then((res) => {
        setuserData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e, keyword) => {
    if (keyword === "name") {
      setName(e.target.value);
    } else if (keyword === "password") {
      setPassword(e.target.value);
    } else if (keyword === "email") {
      setemail(e.target.value);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (name && password && !errorName && !errorPassword && email && !errorEmail) {
      const filteredResult = userData.filter(
        (item) => item.username === name && item.userpassword === password
      );

      if (filteredResult.length === 1) {
        setAdminId(filteredResult[0].id);
        setGlobalUser({
          Username: name,
          Email: email,
        });
        navigate(`/userDashboard`);
      } else {
        const usernameChecking = userData.some(
          (item) => item.username === name
        );
        const passwordChecking = userData.some(
          (item) => item.userpassword === password
        );

        if (!usernameChecking) {
          seterrorName("Please enter correct username");
        } else if (!passwordChecking) {
          seterrorPassword("Please enter the correct password");
        } else {
          navigate("/userSignUp");
        }
      }
    } else {
      if (!name) seterrorName("please enter the name");
      if (!email) seterrorEmail("please enter the email");
      if (!password) seterrorPassword("please enter the password");
    }
  };

  const togglePasswordVisibility = () => {
    setpasswordVisible(!passwordVisible);
  };

  return (
    <>
      <h1 className="login-title">User Login</h1>
      <div className="login-form-wrapper">
        <form onSubmit={handleClick}>
          <div className="login-form">
            <div className="input-group">
              <label className="input-label" htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                className="input-field"
                placeholder="Enter your name"
                onChange={(e) => handleChange(e, "name")}
              />
              {errorName && <p className="error-message">{errorName}</p>}
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                className="input-field"
                placeholder="Enter your email"
                onChange={(e) => handleChange(e, "email")}
              />
              {errorEmail && <p className="error-message">{errorEmail}</p>}
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">Password:</label>
              <div className="password-input">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  className="input-field"
                  placeholder="Enter your password"
                  onChange={(e) => handleChange(e, "password")}
                />
                <span onClick={togglePasswordVisibility} className="toggle-password">
                  {passwordVisible ? "🔐" : "🔓"}
                </span>
              </div>
              {errorPassword && <p className="error-message">{errorPassword}</p>}
            </div>

            <div className="checkbox-group">
              <input type="checkbox" id="remember" />
              <label className="checkbox-label" htmlFor="remember">Remember Me</label>
            </div>

            <div className="button-group">
              <button type="submit" className="login-button">Log In</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserLogIn;
