import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Context from "../Context/Context";
import { useNavigate } from "react-router-dom";
import "../CSS/ReactQuiz.css"

const ReactQuiz = () => {
    const [results, setResults] = useState([]);
    const [answer, setAnswer] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const perPage = 1;
    const { globalUser } = useContext(Context);
    const [showResults, setShowResults] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/react')
            .then((res) => setResults(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleHome = () => navigate('/');
    const handleBack = () => navigate('/user');
    const handleUpdate = () => navigate('/update');

    const handleAnswer = (e) => setAnswer(e.target.value);

    const handleNext = () => {
        if (!answer) {
            alert('Please select an answer before proceeding.');
            return;
        }
        handleResult();
        setCurrentPage(prev => prev + 1);
    };

    const handleResult = () => {
        if (currentPage === results.length) {
            axios.post('http://localhost:3000/results', {
                count: count + 1,
                Username: globalUser.Username,
                Mail: globalUser.Email,
                techno: "react"
            });
            setShowResults(false);
            return;
        }

        if (answer) {
            axios.get(`http://localhost:3000/react?Answer=${answer}`).then((res) => {
                const answerData = res.data.find(item => item.Answer === answer);
                if (answerData) {
                    setCount(prev => prev + 1);
                }
            }).catch((err) => console.log(err));
        }
    };

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * perPage;
        return results.slice(startIndex, startIndex + perPage);
    };

    return (
        <div className="react-quiz-container">
            <div className="user-details">
                <p>Username: {globalUser.Username}</p>
                <p>Email: {globalUser.Email}</p>
                <button className="update-button" onClick={handleUpdate}>Update</button>
            </div>
            <div className="quiz-content">
                {results.length > 0 ? (
                    showResults ? (
                        getPaginatedData().map((item) => (
                            <div key={item.id} className="question-container">
                                <h1 className="question-title">Question {currentPage}: {item.Question}</h1>
                                <div className="options-container">
                                    {[item.Option1, item.Option2, item.Option3, item.Option4].map((option, index) => (
                                        <label key={index} className="option-label">
                                            <input
                                                type="radio"
                                                value={option}
                                                name="option"
                                                checked={answer === option}
                                                onChange={handleAnswer}
                                                className="option-input"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                                <button className="submit-button" onClick={handleResult}>Submit</button>
                                <button className="next-button" onClick={handleNext}>Next</button>
                            </div>
                        ))
                    ) : (
                        <div className="result-summary">
                            <p>Total Score: {count}</p>
                        </div>
                    )
                ) : (
                    <p>No questions available</p>
                )}
            </div>
        </div>
    );
};

export default ReactQuiz;
