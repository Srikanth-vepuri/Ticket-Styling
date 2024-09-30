import { useContext, useState } from "react";
import CreateQuiz2 from "./CreateQuiz2";
import { useNavigate } from "react-router-dom";
import Context from "../Context/Context";
import "../CSS/Quiz1.css"

const CreateQuiz1 = () => {
    const [dropDownValue, setDropDownValue] = useState(null);
    const [pages, setPages] = useState('');
    const [createQuiz, setCreateQuiz] = useState(false);
    const navigate = useNavigate();
    const { globalUser } = useContext(Context);

    let array = Array.from({ length: pages }, (_, i) => i + 1);

    const handledropdown = (e) => {
        setDropDownValue(e.target.value);
    };

    const handleHome = () => {
        navigate('/');
    };

    const handleBack = () => {
        navigate('/admin');
    };

    const handlePage = (e) => {
        e.preventDefault();
        if (dropDownValue) {
            if (pages > 0) {
                setCreateQuiz(true);
            } else {
                alert('Please select Questions');
            }
        } else {
            alert("Please select technology");
        }
    };

    const handleques = (e) => {
        e.preventDefault();
        setPages(e.target.value);
    };

    return (
        <>
            <div className="quiz-container">
                <div className="admin-info">
                    <p>Username: {globalUser.Username}</p>
                    <p>Email: {globalUser.Email}</p>
                </div>
                <div className="quiz-setup">
                    <select onChange={handledropdown} className="tech-dropdown">
                        <option selected>Select Tech</option>
                        <option value="React">React</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="JS">JavaScript</option>
                    </select>
                    <label>
                        How many Questions:
                        <input type="number" onChange={handleques} className="question-input" />
                    </label>
                    <button type="submit" onClick={handlePage} className="submit-btn">Submit</button>
                    {createQuiz && <CreateQuiz2 totalPages={array} perPage={1} dropDownValue={dropDownValue} createQuizValue={() => setCreateQuiz(false)} />}
                </div>
            </div>
        </>
    );
}

export default CreateQuiz1;
