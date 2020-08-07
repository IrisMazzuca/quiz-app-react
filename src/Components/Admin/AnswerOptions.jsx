import React from 'react'
import PropTypes from 'prop-types'


const AnswerOptions = ({ setOptions, options }) => {
    return (
        <div className="d-flex flex-column">
            <label className="mt-5 text-decoration-">Respuestas</label>

            <span>A: </span>
            <input
                type="text"
                name="A"
                className="admin-input"
                onChange={(e) => {
                    const { name, value } = e.target;
                    setOptions({ ...options, [name]: value })
                }} />

            <span>B: </span>
            <input
                type="text"
                name="B"
                className="admin-input"
                onChange={(e) => {
                    const { name, value } = e.target;
                    setOptions({ ...options, [name]: value })
                }} />

            <span>C: </span>
            <input
                type="text"
                name="C"
                className="admin-input"
                onChange={(e) => {
                    const { name, value } = e.target;
                    setOptions({ ...options, [name]: value })
                }} />

            <span>D: </span>
            <input
                type="text"
                name="D"
                className="admin-input"
                onChange={(e) => {
                    const { name, value } = e.target;
                    setOptions({ ...options, [name]: value })
                }} />

        </div>
    )
}

AnswerOptions.propTypes = {
    setOptions: PropTypes.func,
    options: PropTypes.object
}

export default AnswerOptions
