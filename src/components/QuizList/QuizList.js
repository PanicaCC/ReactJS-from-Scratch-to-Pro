import React, {Component} from "react"
import "./QuizList.scss"
import {NavLink} from "react-router-dom";
import Loader from "../UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizes} from "../../store/actions/quiz";

class QuizList extends Component {

    QuizRenderHandler() {
        return this.props.quizLists.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
                </li>
            )
        })
    }

    componentDidMount(){
        return this.props.fetchQuizes()
    }

    render() {
        return (
            <div className="QuizList">
                <h1>
                    List of Test
                </h1>

                {
                    this.props.loader && this.props.quizLists.length !== 0
                    ? <Loader />
                    : <ul>{this.QuizRenderHandler()}</ul>
                }

            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        quizLists: state.quiz.quizLists,
        loader: state.quiz.loader
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
