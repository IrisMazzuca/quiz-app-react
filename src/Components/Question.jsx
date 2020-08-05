import React from 'react'

const Question = ({ currentQuestion, data }) => {

    return (
        <>
            <h1>{data[currentQuestion].question}</h1>
        </>
    )
}

export default Question
