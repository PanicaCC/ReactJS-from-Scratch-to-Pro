import React, { Component} from "react";
import "./Layout.scss"
import MenuToggle from "../../components/MenuToggle/MenuToggle";
import Drawer from "../../components/Drawer/Drawer";

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

export default Layout