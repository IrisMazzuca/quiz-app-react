import React from 'react'
import PropTypes from 'prop-types'


const NewQuestion = ({ setQuestion }) => {
    return (
        <div className="d-flex flex-column">
            <label className="mt-5">Pregunta</label>
            <input type="text" name="question" className="admin-input" placeholder="¿Ejemplo?"
                onChange={(e) => setQuestion(e.target.value)} />
        </div>
    )
}

NewQuestion.propTypes = {
    setQuestion: PropTypes.func
}

export default NewQuestion
