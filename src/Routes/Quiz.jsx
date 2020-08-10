import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import Loader from 'react-loader-spinner';
import 'bootstrap/dist/css/bootstrap.css';
import Progress from '../Components/Quiz/Progress';
import Question from '../Components/Quiz/Question';
import Answers from '../Components/Quiz/Answers';
import { useHistory, useParams } from 'react-router-dom';
import { FaRegCheckCircle, FaTimesCircle } from 'react-icons/fa';
import PropTypes from 'prop-types'


const Quiz = ({ dataCategories, data, setData, isError, setIsError, isLoading, setIsLoading }) => {
    const { id } = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [message, setMessage] = useState('');
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
    }, [id]);



    const renderResultMark = (answer) => {

        if (answer.result === 'correct') {
            return <span className="results-icons" ><FaRegCheckCircle /></span>;//Ok icon
        } else {
            return <span className="results-icons" ><FaTimesCircle /></span>; //Failed icon
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
                            Pregunta {answersUser.indexOf(answer) + 1} {renderResultMark(answer)}
                        </li>
                    </ul>
                </div>
            );
        });

        return (
            <div>
                {questionStatus}
                <div className="results-score">
                    <h3>Puntaje</h3>
                    <h3>{percentage}% - {detail()}</h3>
                </div>
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
            <div className="quiz-container container">
                <h1>Resultados</h1>
                {renderResultsData()}
                <button className="result-btn btn" onClick={restart}>Reintentar</button>
                <br />
                <button className="result-btn btn" onClick={() => history.push('/home')}>Home</button>
            </div>
        )
    } else {

        return (
            <>
                {isError && (
                    <div className="alert alert-danger mt-3" role="alert">
                        Error 404: Not Found.
                        API error: There was an error please refresh the page and try again.
                    </div>
                )}
                <div className="quiz-container container">



                    {isLoading && (
                        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
                    )}

                    {dataCategories && (
                        <>
                            {dataCategories.map(category => {
                                if (category.id === id) {
                                    return (<h1 key={category.id} className="quiz-title">{category.name}</h1>)
                                }
                            }
                            )}
                        </>
                    )}


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
            </>
        )
    }
}

Quiz.propTypes = {
    dataCategories: PropTypes.array,
    data: PropTypes.array,
    setData: PropTypes.func,
    isError: PropTypes.bool,
    setIsError: PropTypes.func,
    isLoading: PropTypes.bool,
    setIsLoading: PropTypes.func
}

export default Quiz
