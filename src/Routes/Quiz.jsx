import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import Loader from 'react-loader-spinner';
import 'bootstrap/dist/css/bootstrap.css';
import Progress from '../Components/Progress';
import Question from '../Components/Question';
import Answers from '../Components/Answers';
import { useHistory } from 'react-router-dom';
import { FaRegCheckCircle, FaTimesCircle } from 'react-icons/fa';


const Quiz = ({ id }) => {

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [message, setMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [answersUser, setAnswersUser] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const history = useHistory();

    useEffect(() => {

        setIsLoading(true);
        setIsError(false);

        Axios

            .get(`https://5f280f4ef5d27e001612ea88.mockapi.io/categories/${id}/questions`)

            .then((response) => {
                console.log(response.data);
                setData(response.data);
                setIsLoading(false);
            })

            .catch(() => {
                setIsLoading(false);
                setIsError(true);
            });
    }, [`${id}`]);



    const renderResultMark = (answer) => {

        if (answer.result === 'correct') {
            return <span className="green"><FaRegCheckCircle /></span>;//Ok icon
        } else {
            return <span className="red"><FaTimesCircle /></span>; //Failed icon
        }

    }


    const renderResultsData = () => {
        const percentage = score / data.length * 100;

        const detail = () => {
            if (percentage < 50) {
                return 'A Practicar!'
            }
            if (percentage > 50 && percentage < 60) {
                return 'Regular'
            } else {
                return 'Muy Bien!'
            }
        }

        const questionStatus = answersUser.map(answer => {
            return (
                <div key={answer.id} >
                    <ul>
                        <li className="answer">
                            Pregunta {answer.id} {renderResultMark(answer)}
                        </li>
                    </ul>
                </div>
            );
        });

        return (
            <div>
                {questionStatus}
                <h4>Puntaje</h4>
                <h4>{percentage}% - {detail()}</h4>
            </div>
        )
    };


    const restart = () => {
        setAnswersUser([]);
        setCurrentAnswer('');
        setCurrentQuestion(0);
        setShowResults(false);
    }

    const next = () => {

        const answerObject = {
            id: data[currentQuestion].id,
            answer: currentAnswer,
            result: currentAnswer === data[currentQuestion].answer ? 'correct' : 'incorrect'
        };

        if (answerObject.result === 'correct') {
            setScore(score + 1);
        }

        setAnswersUser([...answersUser, answerObject]);
        console.log(answerObject)
        setCurrentAnswer('');


        if (!currentAnswer) {
            setIsDisabled(true);
            setMessage('Por favor, elija una opción');
            return
        } else {
            setIsDisabled(false);
            setMessage('');
        }

        if (currentQuestion + 1 < data.length) {
            setCurrentQuestion(currentQuestion + 1)
            return;
        } else {
            setShowResults(true)
        }

    }

    if (showResults) {
        return (
            <div className="quiz-container">
                <h1>Resultados</h1>
                {renderResultsData()}
                <button className="result-btn btn" onClick={restart}>Reintentar</button>
                <br />
                <button className="result-btn btn" onClick={() => history.push('/home')}>Home</button>
            </div>
        )
    } else {

        return (
            <div className="quiz-container">

                {isError && (
                    <div className="alert alert-danger" role="alert">
                        Error
                    </div>
                )}

                {isLoading && (
                    <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
                )}


                {(id === "1") && <h1 className="quiz-title">Matemática</h1>}
                {(id === "2") && <h1 className="quiz-title">Programación</h1>}
                {(id === "3") && <h1 className="quiz-title">Geografía</h1>}
                {(id === "4") && <h1 className="quiz-title">Cine</h1>}

                {data && !isLoading && !isError && (

                    <div>
                        <Progress currentQuestion={currentQuestion + 1} total={data.length} />
                        <Question currentQuestion={currentQuestion} data={data} />
                        <Answers currentQuestion={currentQuestion} setCurrentAnswer={setCurrentAnswer} currentAnswer={currentAnswer} data={data} setIsDisabled={setIsDisabled} isDisabled={isDisabled} nextFunction={next} />
                        {message}
                    </div>
                )

                }
            </div>
        )
    }
}

export default Quiz
