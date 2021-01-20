import React from "react"
import "./Input.scss"

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props => {
    const inputType = props.type || 'text'
    const htmlForId = `${inputType}-${Math.random().toFixed(5)}`
    const classes = [
        'Input',
    ]

    if(isInvalid(props)){
        classes.push('invalid')
    }

    return (
        <div className={classes.join(' ')}>
            <label htmlFor={htmlForId}>
                {props.label}
            </label>
            <input
                id={htmlForId}
                type = {inputType}
                defaultValue={ props.value }
                onChange={ props.onChange }
            />
            {
                isInvalid(props) ? <span className={"error"}>{props.errorMessage || "Invalid value"}</span> : null
            }
        </div>
    )
}

export default Input