import React, {Component} from "react"
import "./QuizList.scss"
import {NavLink} from "react-router-dom";
import axios from "axios";
import Loader from "../UI/Loader/Loader";

class QuizList extends Component {

    state = {
        quizLists: [],
        loader: true
    }

    QuizRenderHandler() {
        return this.state.quizLists.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
                </li>
            )
        })
    }

    async componentDidMount(){
        try {
           const response = await axios.get('https://quizes-react-default-rtdb.europe-west1.firebasedatabase.app/quizes.json')

            let quizLists = [];
            Object.keys(response.data).map((key, index) => {
                return (
                    quizLists = [{
                        id: key,
                        name: `Test #${index + 1}`
                    }]
                )
            })

            this.setState({
                quizLists, loader: false
            })

        } catch (e){
            console.log(e)
        }
    }

    render() {
        return (
            <div className="QuizList">
                <h1>
                    List of Test
                </h1>

                {
                    this.state.loader
                    ? <Loader />
                    : <ul>{this.QuizRenderHandler()}</ul>
                }

            </div>
        )
    }
}
export default QuizList
