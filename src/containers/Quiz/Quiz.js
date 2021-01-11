import React, {Component} from "react";
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import './Quiz.scss'

class Quiz extends Component {

    state = {
        activeQuestion: 0,
        answerStatus: {}, //{[answerId] : 'success' or 'error'}
        quiz: [
            {
                id: 1,
                question: 'Test question 1 ?',
                currentAnswerId: 2,
                answers: [
                    {text: 'Test answer 1', id: 1},
                    {text: 'Test answer 2', id: 2},
                    {text: 'Test answer 3', id: 3},
                    {text: 'Test answer 4', id: 4}
                ]
            },
            {
                id: 2,
                question: 'Test question 2 ?',
                currentAnswerId: 4,
                answers: [
                    {text: 'Test Q2 answer 1', id: 1},
                    {text: 'Test Q2 answer 2', id: 2},
                    {text: 'Test Q2 answer 3', id: 3},
                    {text: 'Test Q2 answer 4', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHandler = answerId => {
        const question = this.state.quiz[this.state.activeQuestion];
        if (question.currentAnswerId === answerId) {

            this.setState({
                answerStatus: {[answerId]: 'success'}
            })
            const timeout = window.setTimeout(() => {
                (this.isQuizFinished()) ?
                    console.log("Quiz Finished")
                    : this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerStatus: {}
                    })

                window.clearTimeout(timeout)
            }, 1000)

        } else {
            console.log("Wrong answer")
            this.setState({
                answerStatus: {[answerId]: 'error'}
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        return (
            <div className={'Quiz'}>
                <div className={ 'Quiz__Wrapper' }>
                    <h1>Answer to all questions</h1>
                    <ActiveQuiz
                        answers = { this.state.quiz[this.state.activeQuestion].answers }
                        question = { this.state.quiz[this.state.activeQuestion].question }
                        onAnswerClick = { this.onAnswerClickHandler }
                        quizLenght = { this.state.quiz.length }
                        answerNum = { this.state.activeQuestion + 1 }
                        status = { this.state.answerStatus }
                    />
                </div>
            </div>
        )
    }
}

export default Quiz