import React from 'react'
import PropTypes from 'prop-types'

const CorrectAnswer = ({ setAnswer }) => {
    return (
        <div>
            <label className="mt-5">Respuesta Correcta</label>
            <select
                className="admin-input"
                name="answer"
                onChange={(e) => {
                    setAnswer(e.target.value);
                }} >
                <option value=" " name="answer">  </option>
                <option value="A" name="answer">A</option>
                <option value="B" name="answer">B</option>
                <option value="C" name="answer">C</option>
                <option value="D" name="answer">D</option>
            </select>
        </div>
    )
}

CorrectAnswer.propTypes = {
    setAnswer: PropTypes.func
}

export default CorrectAnswer
