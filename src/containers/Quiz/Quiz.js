import React, {Component} from "react";
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";
import './Quiz.scss'

class Quiz extends Component {

    state = {
        activeQuestion: 0,
        answerStatus: {},
        isFinished: false,
        results: {},
        quiz: [],
        loader: true
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

        if (question.rightAnswerId === answerId) {
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

    async componentDidMount() {
        try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
            const quiz = response.data

            this.setState({
                quiz: quiz,
                loader: false
            })

        } catch (e) {
            console.log(e)
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
                    {
                        this.state.loader
                        ? <Loader />
                        : this.state.isFinished
                            ? <FinishedQuiz
                                quiz = { this.state.quiz }
                                results = { this.state.results }
                                onRetry = { this.onRetryHandler }
                            />
                            : <ActiveQuiz
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