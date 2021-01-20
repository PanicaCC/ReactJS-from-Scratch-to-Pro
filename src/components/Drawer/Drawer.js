import React, {Component} from "react";
import "./Drawer.scss"
import Backdrop from "../UI/Backdrop/Backdrop";
import { NavLink } from 'react-router-dom';

const links = [
    {
        to: '/quiz',
        exact: false,
        label: 'Quiz'
    },
    {
        to: '/',
        exact: true,
        label: 'List of Quiz'
    },
    {
        to: '/auth',
        exact: false,
        label: 'Login'
    },
    {
        to: '/quiz-creator',
        exact: false,
        label: 'Create test'
    },
]

class Drawer extends Component {

    clickHandler = () => {
        this.props.isClose()
    }

    renderLinks = () => {
        return links.map((link, index) => {
            return (
                <li key={ index }>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={'active'}
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const classes = ["Drawer"];
        if (!this.props.isOpen){
            classes.push("open")
        }

        return (
            <React.Fragment>
                <ul className={classes.join(' ')}>
                    {this.renderLinks()}
                </ul>
                {this.props.isOpen ? <Backdrop onClick={this.props.isClose} /> : null}
            </React.Fragment>
        )
    }
}

export default Drawer