import React from 'react'


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

export default Answer
