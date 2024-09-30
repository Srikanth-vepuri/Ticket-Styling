import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../Context/Context";
import "../CSS/Userdashboard.css"

function UserDashboard() {
    const { globalUser } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>User Dashboard</h1>
                <div className="user-details">
                    <p><strong>Username:</strong> {globalUser.Username}</p>
                    <p><strong>Email:</strong> {globalUser.Email}</p>
                </div>
            </header>
            <div className="dashboard-content">
                <div className="user-links">
                    <Link to='/reactQuiz' className="link">React Quiz</Link>
                    <Link to='/htmlQuiz' className="link">HTML Quiz</Link>
                    <Link to='/CssQuiz' className="link">CSS Quiz</Link>
                    <Link to='/jsQuiz' className="link">JavaScript Quiz</Link>
                </div>
            </div>
            <footer className="footer">
                <button className="button button-secondary" onClick={() => navigate('/')}>Home</button>
            </footer>
        </div>
    );
}

export default UserDashboard;
