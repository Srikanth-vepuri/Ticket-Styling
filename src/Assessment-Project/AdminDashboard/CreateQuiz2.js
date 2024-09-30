import axios from "axios";
import { useState } from "react";
import "../CSS/Quiz2.css"

const CreateQuiz2 = (props) => {
    const { totalPages, perPage, dropDownValue, createQuizValue } = props;
    const totalPagesInNumber = totalPages.length;
    const [currentPage, setCurrentPage] = useState(1);
    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [answer, setAnswer] = useState('');
    const [updateValue, setUpdateValue] = useState(totalPagesInNumber + 1);

    const getPaginatedData = (currentPage) => {
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;
        return totalPages.slice(startIndex, endIndex);
    };

    const handleNextPage = (e) => {
        if (currentPage < totalPagesInNumber) {
            setCurrentPage(currentPage + 1);
        } else {
            createQuizValue();
        }
    };

    const handleTextValues = (e, keyword) => {
        e.preventDefault();
        switch (keyword) {
            case 'question': setQuestion(e.target.value); break;
            case 'option1': setOption1(e.target.value); break;
            case 'option2': setOption2(e.target.value); break;
            case 'option3': setOption3(e.target.value); break;
            case 'option4': setOption4(e.target.value); break;
            case 'answer': setAnswer(e.target.value); break;
            default: break;
        }
    };

    const resetFun = () => {
        setQuestion('');
        setAnswer('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
    };

    const handleSubmitQues = (e) => {
        const obj = {
            Question: question,
            Option1: option1,
            Option2: option2,
            Option3: option3,
            Option4: option4,
            Answer: answer
        };
        
        const endpoint = dropDownValue.toLowerCase(); // Simplifying endpoint selection
        axios.post(`http://localhost:3000/${endpoint}`, obj)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        resetFun();
        handleNextPage(e);
    };

    const paginatedData = getPaginatedData(currentPage);

    return (
        <>
            <div className="quiz-container">
                <h2>Current Page: {currentPage} / Total Pages: {totalPagesInNumber}</h2>
                {
                    paginatedData.map((item, index) => (
                        <form className="question-form" key={index}>
                            <label>Question {currentPage}</label>
                            <input type="text" value={question} placeholder="Enter your question" onChange={(e) => handleTextValues(e, "question")} className="input-question" />
                            <label>Create Options</label>
                            <input type="text" className="input-option" value={option1} placeholder="Option 1" onChange={(e) => handleTextValues(e, "option1")} />
                            <input type="text" className="input-option" value={option2} placeholder="Option 2" onChange={(e) => handleTextValues(e, "option2")} />
                            <input type="text" className="input-option" value={option3} placeholder="Option 3" onChange={(e) => handleTextValues(e, "option3")} />
                            <input type="text" className="input-option" value={option4} placeholder="Option 4" onChange={(e) => handleTextValues(e, "option4")} />
                            <label>Answer</label>
                            <input type="text" className="input-answer" value={answer} placeholder="Enter your answer" onChange={(e) => handleTextValues(e, "answer")} />
                        </form>
                    ))
                }
                <button onClick={handleSubmitQues} className="btn-submit" disabled={currentPage === updateValue}>Submit</button>
                <button onClick={handleNextPage} className="btn-next" disabled={currentPage === totalPagesInNumber || currentPage === updateValue}>Next</button>
            </div>
        </>
    );
};

export default CreateQuiz2;
