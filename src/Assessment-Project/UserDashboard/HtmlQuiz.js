import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Context from "../Context/Context";
import { useNavigate } from "react-router-dom";
import "../CSS/HTMLquiz.css"

const HtmlQuiz = () => {
    const [results, setResults] = useState([]);
    const [answer, setAnswer] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const perPage = 1;
    let noOfPages = results.length;
    const { globalUser } = useContext(Context);
    const [showResults, setText] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/html')
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
            if (currentPage === noOfPages) {
                setText(false);
            }
        }
    };

    const handleBack = () => {
        navigate('/user');
    };

    const handleResult = () => {
        if (currentPage === noOfPages) {
            axios.post('http://localhost:3000/results', {
                count: count + 1,
                Username: globalUser.Username,
                Mail: globalUser.Email,
                techno: "html"
            });
            setText(false);
        }
        if (answer) {
            axios.get(`http://localhost:3000/html?Answer=${answer}`)
                .then((res) => {
                    const answerData = res.data.find(item => item.Answer === answer);
                    if (answerData) {
                        setCount(count + 1);
                    }
                })
                .catch((err) => console.log(err));
        } else {
            alert("Please select an option");
        }
    };

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;
        return results.slice(startIndex, endIndex);
    };

    const handleUpdate = () => {
        navigate('/update');
    };

    return (
        <div className="html-quiz-container">
            <div className="user-info">
                <p>Username: {globalUser.Username}</p>
                <p>Email: {globalUser.Email}</p>
                <button className="update-button" onClick={handleUpdate}>Update</button>
            </div>
            <div className="quiz-content">
                {
                    results.length > 0 ?
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
                            <p className="result-message">Total correct answers: {count}</p>
                        ) : (
                            <p className="no-questions-message">No questions available</p>
                        )
                }
            </div>
        </div>
    );
};

export default HtmlQuiz;
