import React from "react";
import "./MenuToggle.scss"

const MenuToggle = props => {

    const classes = [
        'fa',
        'fa-lg',
        'MenuToggle'
    ]

    props.isOpen ? classes.push('fa-times open') : classes.push('fa-bars')

    return (
        <i
            onClick={props.onToggle}
            className={classes.join(' ')}
        >
        </i>
    )
}

export default MenuToggle