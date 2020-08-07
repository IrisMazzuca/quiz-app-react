import React from 'react'
import PropTypes from 'prop-types'

const Question = ({ currentQuestion, data }) => {

    return (
        <>
            <h1>{data[currentQuestion].question}</h1>
        </>
    )
}

Question.propTypes = {
    currentQuestion: PropTypes.number,
    data: PropTypes.array
}

export default Question
