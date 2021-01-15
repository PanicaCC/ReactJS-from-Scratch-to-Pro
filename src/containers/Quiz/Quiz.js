import React, {Component} from "react";
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import './Quiz.scss'

class Quiz extends Component {

    state = {
        activeQuestion: 0,
        answerStatus: {}, //{[answerId] : 'success' or 'error'}
        isFinished: false,
        results: {}, //{[question] : 'success' or 'error'}
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
        if (this.state.answerStatus){
            const key = Object.keys(this.state.answerStatus)[0]
            if (this.state.answerStatus[key] === 'success'){
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;
        if (question.currentAnswerId === answerId) {
            if (!results[question.id]){
                results[question.id] = 'success'

            }
            this.setState({
                answerStatus: {[answerId]: 'success'},
                results
            })
            const timeout = window.setTimeout(() => {
                (this.isQuizFinished()) ?
                    this.setState({
                        isFinished: true
                    })
                    : this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerStatus: {}
                    })

                window.clearTimeout(timeout)
            }, 1000)

        } else {
            console.log("Wrong answer")
            results[question.id] = 'error'
            this.setState({
                answerStatus: {[answerId]: 'error'},
                results
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    onRetryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerStatus: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return (
            <div className={'Quiz'}>
                <div className={ 'Quiz__Wrapper' }>
                    <h1>Answer to all questions</h1>
                    {this.state.isFinished ?
                        <FinishedQuiz
                            quiz = { this.state.quiz }
                            results = { this.state.results }
                            onRetry = { this.onRetryHandler }
                        /> :
                        <ActiveQuiz
                            answers = { this.state.quiz[this.state.activeQuestion].answers }
                            question = { this.state.quiz[this.state.activeQuestion].question }
                            onAnswerClick = { this.onAnswerClickHandler }
                            quizLenght = { this.state.quiz.length }
                            answerNum = { this.state.activeQuestion + 1 }
                            status = { this.state.answerStatus }
                        />
                    }

                </div>
            </div>
        )
    }
}

export default Quiz