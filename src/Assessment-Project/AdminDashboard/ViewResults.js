import { useContext, useEffect, useState } from "react";
import Context from "../Context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/ViewResults.css"

const ViewResults = () => {
    const { globalUser } = useContext(Context);
    const [results, setResults] = useState([]);
    const [sortedResults, setSortedResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/results")
            .then((res) => setResults(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleSortBy = (e) => {
        const keyword = e.target.value;
        let sortedData = [...results];

        if (keyword === 'Score') {
            sortedData.sort((a, b) => a.count - b.count);
        } else if (keyword === 'Name') {
            sortedData.sort((a, b) => a.Username.localeCompare(b.Username));
        } else if (keyword === 'Techno') {
            sortedData.sort((a, b) => a.techno.localeCompare(b.techno));
        }

        setSortedResults(sortedData);
    };

    return (
        <>
            <hr />
            <div className="results-container">
                <div className="admin-info">
                    <p>Username: {globalUser.Username}</p>
                    <p>Email: {globalUser.Email}</p>
                </div>
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Mail</th>
                            <th>Score</th>
                            <th>Techno</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.length > 0 ? 
                            (sortedResults.length > 0 ? sortedResults : results).map((item) => (
                                <tr key={item.id}>
                                    <td>{item.Username}</td>
                                    <td>{item.Mail}</td>
                                    <td>{item.count}</td>
                                    <td>{item.techno}</td>
                                </tr>
                            )) 
                        : <tr><td colSpan="4">No data available</td></tr>}
                    </tbody>
                </table>
                <div className="sort-dropdown">
                    <select onChange={handleSortBy} className="sort-select">
                        <option value="">Sort by</option>
                        <option value="Score">Score</option>
                        <option value="Name">Name</option>
                        <option value="Techno">Techno</option>
                    </select>
                </div>
            </div>
        </>
    );
};

export default ViewResults;
