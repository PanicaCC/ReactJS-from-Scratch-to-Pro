import React, { Component} from "react";
import "./Layout.scss"
import MenuToggle from "../../components/MenuToggle/MenuToggle";
import Drawer from "../../components/Drawer/Drawer";
import {connect} from "react-redux";

class Layout extends Component {
    state = {
        menu: false
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    isCloseHandler = () => {
        this.setState({
            menu: false
        })
    }

    render() {
        return (
            <div className={'Layout'}>

                <Drawer
                    isAuthenticated = { this.props.isAuthenticated }
                    isOpen = { this.state.menu }
                    isClose = { this.isCloseHandler }
                />

                <MenuToggle
                    onToggle = { this.toggleMenuHandler }
                    isOpen = { this.state.menu }
                />

                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout)