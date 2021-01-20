import React, {Component} from "react"
import "./QuizList.scss"
import {NavLink} from "react-router-dom";

const quizLists = [1, 2, 3];

class QuizList extends Component {

    QuizRenderHandler() {
        return quizLists.map((quiz, index) => {
            return (
                <li key={index}>
                    <NavLink to={"/quiz/" + quiz}>Test {quiz}</NavLink>
                </li>
            )
        })
    }

    render() {
        return (
            <div className="QuizList">
                <h1>
                    List of Test
                </h1>
                <ul>
                    {this.QuizRenderHandler()}
                </ul>
            </div>
        )
    }
}
export default QuizList
