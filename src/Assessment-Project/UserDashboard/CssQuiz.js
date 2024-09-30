import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Context from "../Context/Context";
import { useNavigate } from "react-router-dom";
import "../CSS/CSSquiz.css"

const CssQuiz = () => {
    const [results, setResults] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [correctCount, setCorrectCount] = useState(0);
    const itemsPerPage = 1;
    const { globalUser } = useContext(Context);
    const [showResults, setShowResults] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/css')
            .then((res) => setResults(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleHome = () => {
        navigate('/');
    };

    const handleAnswerSelection = (e) => {
        setSelectedAnswer(e.target.value);
    };

    const handleNext = () => {
        if (selectedAnswer) {
            handleResult();
            setCurrentPage(currentPage + 1);
        } else {
            alert('Please select an answer before proceeding.');
        }
    };

    const handleResult = () => {
        if (currentPage === results.length) {
            axios.post('http://localhost:3000/results', {
                count: correctCount,
                Username: globalUser.Username,
                Mail: globalUser.Email,
                techno: "css",
            });
            setShowResults(false);
        }

        axios.get(`http://localhost:3000/css?Answer=${selectedAnswer}`)
            .then((res) => {
                if (res.data.length) {
                    setCorrectCount(correctCount + 1);
                }
            })
            .catch((err) => console.log(err));
    };

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return results.slice(startIndex, endIndex);
    };

    return (
        <>
            <div className="header-container">
                <h2 className="header-title">CSS Quiz</h2>
            </div>
            <hr />
            <div className="navigation">
                <p className="nav-item" onClick={handleHome}>Home</p>
            </div>
            <div className="quiz-container">
                <div className="user-info">
                    <p>Username: {globalUser.Username}</p>
                    <p>Email: {globalUser.Email}</p>
                </div>
                <div className="quiz-content">
                    {results.length > 0 && showResults ? (
                        getPaginatedData().map((item, index) => (
                            <div key={index} className="question-container">
                                <h1 className="question-text">Question {currentPage}: {item.Question}</h1>
                                <div className="options-container">
                                    {['Option1', 'Option2', 'Option3', 'Option4'].map((option, idx) => (
                                        <label key={idx} className="option-label">
                                            <input 
                                                type="radio" 
                                                value={item[option]} 
                                                name="option" 
                                                checked={selectedAnswer === item[option]} 
                                                onChange={handleAnswerSelection} 
                                                className="option-radio" 
                                            />
                                            {item[option]}
                                        </label>
                                    ))}
                                </div>
                                <button onClick={handleResult} className="submit-button">Submit</button>
                                <button onClick={handleNext} className="next-button">Next</button>
                            </div>
                        ))
                    ) : (
                        <p className="result-message">Total correct answers: {correctCount}</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default CssQuiz;
