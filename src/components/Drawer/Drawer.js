import React, {Component} from "react";
import "./Drawer.scss"
import Backdrop from "../UI/Backdrop/Backdrop";
import { NavLink } from 'react-router-dom';

class Drawer extends Component {

    clickHandler = () => {
        this.props.isClose()
    }

    renderLinks = links => {
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
        const links = []

        if (!this.props.isOpen){
            classes.push("open")
        }

        if(this.props.isAuthenticated) {
            links.push({ to: '/', exact: true, label: 'List of Quiz' })
            links.push({ to: '/quiz-creator', exact: false, label: 'Create test' })
            links.push({ to: '/logout', exact: false, label: 'Logout' })
        } else {
            links.push({ to: '/auth', exact: false, label: 'Login' })
        }


        return (
            <React.Fragment>
                <ul className={classes.join(' ')}>
                    {this.renderLinks(links)}
                </ul>
                {this.props.isOpen ? <Backdrop onClick={this.props.isClose} /> : null}
            </React.Fragment>
        )
    }
}

export default Drawer