import React, {Component} from "react";

class Sec extends Component {
    constructor(props) {
        super(props);

        this.timer = null;

        this.state = {
            seconds: 0,
        };
    }

    counterSec() {
        this.setState({
            seconds: this.state.seconds + 1,
        })
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.counterSec();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return <p>{this.state.seconds} sec.</p>
    }
}

export default Sec