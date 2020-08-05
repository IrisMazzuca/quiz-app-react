import React from 'react'

const Progress = ({ currentQuestion, total }) => {
    return (
        <>
            <p className="quiz-subtitle">Pregunta {currentQuestion}/{total}</p>
        </>
    )
}

export default Progress
