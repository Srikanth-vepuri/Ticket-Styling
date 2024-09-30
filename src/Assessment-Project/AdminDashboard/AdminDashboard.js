import { useContext } from "react";
import Context from "../Context/Context";
import { useNavigate, Link } from "react-router-dom";
import "../CSS/Admindashboard.css"

function AdminDashboardFunction() {
    const { globalUser } = useContext(Context);
    const navigate = useNavigate();

    return (
        <>
            <div className="dashboard-container">
                <div className="user-info">
                    <p>Username: {globalUser.Username}</p>
                    <p>Email: {globalUser.Email}</p>
                </div>
                <div className="admin-navigation">
                    <h2><Link to='/createQuiz' className="nav-link">Create a Quiz</Link></h2>
                    <h2><Link to='/viewResults' className="nav-link">View Results</Link></h2>
                </div>
            </div>
        </>
    );
}

export default AdminDashboardFunction;
