import React from "react";
import './AnswerList.scss'
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswerList = props => {
    return (
        <ul
            className={ 'AnswerList' }>
            { props.answers.map((answer, index) => {
                return (
                    <AnswerItem
                        key = { index }
                        answer = { answer }
                        onAnswerClick = { props.onAnswerClick }
                        status = { props.status ? props.status[answer.id] : null }
                    />
                )
            }) }
        </ul>
    )
}

export default AnswerList