import React from 'react'
import PropTypes from 'prop-types'

const Progress = ({ currentQuestion, total }) => {
    return (
        <>
            <p className="quiz-subtitle">Pregunta {currentQuestion}/{total}</p>
        </>
    )
}

Progress.propTypes = {
    currentQuestion: PropTypes.number,
    total: PropTypes.number
}

export default Progress
