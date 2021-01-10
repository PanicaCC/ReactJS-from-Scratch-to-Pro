import React, {Component} from "react";
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import './Quiz.scss'

class Quiz extends Component {

    state = {
        quiz: [
            {
                answers: [
                    {text: 'Test answer 1'},
                    {text: 'Test answer 2'},
                    {text: 'Test answer 3'},
                    {text: 'Test answer 4'}
                ]
            }
        ]
    }

    render() {
        return (
            <div className={'Quiz'}>
                <div className={ 'Quiz__Wrapper' }>
                    <h1>Answer to all questions</h1>
                    <ActiveQuiz answers = { this.state.quiz[0].answers} />
                </div>
            </div>
        )
    }
}

export default Quiz