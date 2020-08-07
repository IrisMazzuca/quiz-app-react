import React from 'react'
import PropTypes from 'prop-types'

const Answer = ({ letter, answer, click, classes, isAnswerDisabled, icons, setSelected }) => {

    const handleClick = () => {
        click();
        setSelected(true);
    };

    return (
        <button
            className={`answer ${classes}`}
            onClick={handleClick}
            disabled={isAnswerDisabled}>
            <span>{`${letter}) `}</span>
            {answer}
            {icons}
        </button>
    )
}

Answer.propTypes = {
    letter: PropTypes.string,
    answer: PropTypes.number,
    click: PropTypes.func,
    classes: PropTypes.string,
    isAnswerDisabled: PropTypes.bool,
    icons: PropTypes.object,
    setSelected: PropTypes.func
}
export default Answer
