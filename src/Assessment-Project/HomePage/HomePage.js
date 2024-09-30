import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../CSS/HomePage.css"

function HomePage() {
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState('');

    const handleMouseEnter = (button) => {
        setActiveButton(button);
    };

    const handleMouseLeave = () => {
        setActiveButton('');
    };

    const adminSignUp = (e) => {
        e.preventDefault();
        navigate("/adminSignUp");
    };
    const userSignUp = (e) => {
        e.preventDefault();
        navigate("/userSignUp");
    };
    const adminLogin = (e) => {
        e.preventDefault();
        navigate("/adminLogin");
    };
    const userLogin = (e) => {
        e.preventDefault();
        navigate("/userLogin");
    };

    return (
        <div className="mcqcontainer">
            <div className="button-container">
                <Popup trigger={
                    <button
                        type="button"
                        className={`mcqbutton ${activeButton === 'signup' ? 'active' : ''}`}
                        onMouseEnter={() => handleMouseEnter('signup')}
                        onMouseLeave={handleMouseLeave}
                    >
                        SignUp
                    </button>
                } position="bottom right">
                    <div className="popupcontainer">
                        <button className="signupbutton" onClick={userSignUp}>UserSignUp</button>
                        <button className="signupbutton" onClick={adminSignUp}>AdminSignUp</button>
                    </div>
                </Popup>
                <Popup trigger={
                    <button
                        type="button"
                        className={`mcqbutton ${activeButton === 'login' ? 'active' : ''}`}
                        onMouseEnter={() => handleMouseEnter('login')}
                        onMouseLeave={handleMouseLeave}
                    >
                        LogIn
                    </button>
                } position="bottom right">
                    <div className="popupcontainer">
                        <button className="signupbutton" onClick={userLogin}>UserLogIn</button>
                        <button className="signupbutton" onClick={adminLogin}>AdminLogIn</button>
                    </div>
                </Popup>
            </div>
        </div>
    );
}

export default HomePage;
