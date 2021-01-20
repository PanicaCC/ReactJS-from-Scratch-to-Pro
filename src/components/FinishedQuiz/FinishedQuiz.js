import React from 'react'
import './FinishedQuiz.scss'
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";

const FinishedQuiz = props => {

    const countWriteAnswer = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success'){
            total++
        }
        return total
    }, 0)

    return (
        <div className="FinishedQuiz">
            <h1>Finished</h1>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        `c-${props.results[quizItem.id]}`
                    ]

                    return (
                        <li key={index}>
                            <b>{index + 1}.</b>&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')}> </i>
                        </li>
                    )
                })}
            </ul>
            <p>Right answers is {countWriteAnswer} of {props.quiz.length}</p>

            <div className="FinishedQuiz__btn">
                <Button
                    type="primary"
                    onClick={props.onRetry}
                >
                    Try again
                </Button>
                <Link to={"/"}>
                    <Button type="success">
                        Move to another tests
                    </Button>
                </Link>

            </div>
        </div>
    )
}

export default FinishedQuiz