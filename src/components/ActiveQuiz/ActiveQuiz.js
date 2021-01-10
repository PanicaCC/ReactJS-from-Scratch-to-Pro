import React from "react";
import AnswerList from "./AnswerList/AnswerList";
import './ActiveQuiz.scss'

const ActiveQuiz = props => {
    return (
        <div className={ 'ActiveQuiz' }>
            <p>
                <strong>2. &nbsp; <span>How are you?</span></strong>
                <span>2/12</span>
            </p>
            <AnswerList answers = { props.answers } />
        </div>
    )
}

export default ActiveQuiz