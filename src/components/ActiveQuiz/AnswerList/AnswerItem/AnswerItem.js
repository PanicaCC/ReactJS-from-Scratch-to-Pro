import React from "react";
import './AnswerItem.scss'

const AnswerItem = props => {
    const cls = ['AnswerItem']

    if (props.status) {
        cls.push('bg-' + [props.status])
    }

    return (
        <li
            className={cls.join(' ')}
            onClick={ props.onAnswerClick.bind(this, props.answer.id) }
        >
            { props.answer.text }
        </li>
    )
}

export default AnswerItem