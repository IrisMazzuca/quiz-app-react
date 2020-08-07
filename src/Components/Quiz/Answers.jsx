import React, { useState, useEffect } from 'react'
import Answer from './Answer'
import { FaRegDotCircle, FaRegCircle } from 'react-icons/fa';
import PropTypes from 'prop-types'

const Answers = ({ currentQuestion, data, setCurrentAnswer, currentAnswer, setIsDisabled, isDisabled, nextFunction }) => {

    const [isAnswerDisabled, setIsAnswerDisabled] = useState(false)
    const [selected, setSelected] = useState(false);
    const newAnswers = data[currentQuestion].options;
    // console.log(newAnswers)


    useEffect(() => {
        if (currentAnswer) {
            setIsDisabled(false);
            setIsAnswerDisabled(true);
        }
    }, [currentAnswer])

    const icons = (option) => {

        if ((selected) && (option === currentAnswer)) {
            return <span><FaRegDotCircle /></span>
        }
        return <span><FaRegCircle /></span>

    }


    const getStatusClass = (option) => {
        if (!currentAnswer) return "";
        if (option === currentAnswer) {
            return option === data[currentQuestion].answer ? "correct" : "incorrect";
        }
        return option === data[currentQuestion].answer ? "correct" : "";
    }

    const enableAnswers = () => {
        setIsAnswerDisabled(false);
    }

    return (
        <>
            <div className="quiz-answers-container">
                <Answer
                    letter="A"
                    answer={newAnswers.A}
                    click={() => setCurrentAnswer("A")}
                    classes={getStatusClass("A")}
                    isAnswerDisabled={isAnswerDisabled}
                    setSelected={setSelected}
                    icons={icons("A")}
                />
                <Answer
                    letter="B"
                    answer={newAnswers.B}
                    click={() => setCurrentAnswer("B")}
                    classes={getStatusClass("B")}
                    isAnswerDisabled={isAnswerDisabled}
                    setSelected={setSelected}
                    icons={icons("B")}
                />
                <Answer
                    letter="C"
                    answer={newAnswers.C}
                    click={() => setCurrentAnswer("C")}
                    classes={getStatusClass("C")}
                    isAnswerDisabled={isAnswerDisabled}
                    setSelected={setSelected}
                    icons={icons("C")}
                />
                <Answer
                    letter="D"
                    answer={newAnswers.D}
                    click={() => setCurrentAnswer("D")}
                    classes={getStatusClass("D")}
                    isAnswerDisabled={isAnswerDisabled}
                    setSelected={setSelected}
                    icons={icons("D")}
                />
            </div>
            <button
                className="quiz-btn btn"
                disabled={isDisabled}
                onClick={() => {
                    nextFunction();
                    enableAnswers();
                    setSelected(false);
                }}>NEXT</button>
        </>
    )
}

Answers.propTypes = {
    currentQuestion: PropTypes.number,
    data: PropTypes.array,
    currentAnswer: PropTypes.string,
    isDisabled: PropTypes.bool,
    nextFunction: PropTypes.func,
    setCurrentAnswer: PropTypes.func,
    setIsDisabled: PropTypes.func
}

export default Answers
