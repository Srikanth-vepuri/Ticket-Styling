import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Context from "../Context/Context";
import { useNavigate } from "react-router-dom";
import "../CSS/JSQuiz.css"

const JsQuiz = () => {
    const [results, setResults] = useState([]);
    const [answer, setAnswer] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const perPage = 1;
    const { globalUser } = useContext(Context);
    const [showResults, setText] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/javascript')
            .then((res) => setResults(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleHome = () => {
        navigate('/');
    };

    const handleAnswer = (e) => {
        setAnswer(e.target.value);
    };

    const handleNext = () => {
        if (answer) {
            handleResult();
            setCurrentPage(currentPage + 1);
        } else {
            alert('Please select an answer');
            if (currentPage === results.length) {
                setText(false);
            }
        }
    };

    const handleResult = () => {
        if (currentPage === results.length) {
            axios.post('http://localhost:3000/results', {
                count: count + 1,
                Username: globalUser.Username,
                Mail: globalUser.Email,
                techno: "js"
            });
            setText(false);
        }

        axios.get(`http://localhost:3000/javascript?Answer=${answer}`)
            .then((res) => {
                if (res.data.length > 0) {
                    setCount(count + 1);
                }
            })
            .catch((err) => console.log(err));
    };

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * perPage;
        return results.slice(startIndex, startIndex + perPage);
    };

    const handleUpdate = () => {
        navigate('/update');
    };

    return (
        <div className="js-quiz-container">
            <div className="user-info">
                <p>Username: {globalUser.Username}</p>
                <p>Email: {globalUser.Email}</p>
                <button className="update-button" onClick={handleUpdate}>Update</button>
            </div>
            <div className="quiz-content">
                {
                    results.length > 0 ? (
                        showResults ? (
                            getPaginatedData().map((item, index) => (
                                <div key={index} className="question-container">
                                    <h1 className="question-title">Question {currentPage}: {item.Question}</h1>
                                    <div className="options-container">
                                        {["Option1", "Option2", "Option3", "Option4"].map((option, i) => (
                                            <label key={i} className="option-label">
                                                <input
                                                    type="radio"
                                                    value={item[option]}
                                                    name="option"
                                                    checked={answer === item[option]}
                                                    onChange={handleAnswer}
                                                    className="option-input"
                                                />
                                                {item[option]}
                                            </label>
                                        ))}
                                    </div>
                                    <button className="submit-button" onClick={handleResult}>Submit</button>
                                    <button className="next-button" onClick={handleNext}>Next</button>
                                </div>
                            ))
                        ) : (
                            <div className="result-summary">
                                <p>Answered {count} of {results.length}</p>
                                <p>Total Score: {count}</p>
                            </div>
                        )
                    ) : (
                        <p className="no-questions-message">No questions available</p>
                    )
                }
            </div>
        </div>
    );
};

export default JsQuiz;
