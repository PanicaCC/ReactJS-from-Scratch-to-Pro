import React from "react";
import AnswerList from "./AnswerList/AnswerList";
import './ActiveQuiz.scss'

const ActiveQuiz = props => {
    return (
        <div className={ 'ActiveQuiz' }>
            <p>
                <strong>{ props.answerNum }. &nbsp; <span>{ props.question }</span></strong>
                <span>{ props.answerNum }/{ props.quizLenght }</span>
            </p>
            <AnswerList
                answers = { props.answers }
                onAnswerClick = { props.onAnswerClick }
                status = { props.status }
            />
        </div>
    )
}

export default ActiveQuiz