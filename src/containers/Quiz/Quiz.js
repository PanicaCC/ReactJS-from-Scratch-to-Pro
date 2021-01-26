import React, {Component} from "react";
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import './Quiz.scss'
import {connect} from "react-redux";
import {fetchCurrentQuizById, onAnswerClickHandler, retryQuizAction} from "../../store/actions/quiz";

class Quiz extends Component {

    componentDidMount() {
        this.props.fetchCurrentQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuizAction()
    }

    render() {
        return (
            <div className={'Quiz'}>
                <div className={ 'Quiz__Wrapper' }>
                    <h1>Answer to all questions</h1>
                    {
                        this.props.loader || !this.props.quiz
                        ? <Loader />
                        : this.props.isFinished
                            ? <FinishedQuiz
                                quiz = { this.props.quiz }
                                results = { this.props.results }
                                onRetry = { this.props.retryQuizAction }
                            />
                            : <ActiveQuiz
                                answers = { this.props.quiz[this.props.activeQuestion].answers }
                                question = { this.props.quiz[this.props.activeQuestion].question }
                                onAnswerClick = { this.props.onAnswerClickHandler }
                                quizLenght = { this.props.quiz.length }
                                answerNum = { this.props.activeQuestion + 1 }
                                status = { this.props.answerStatus }
                            />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeQuestion: state.quiz.activeQuestion,
        answerStatus: state.quiz.answerStatus,
        isFinished: state.quiz.isFinished,
        results: state.quiz.results,
        quiz: state.quiz.quiz,
        loader: state.quiz.loader
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchCurrentQuizById: id => dispatch(fetchCurrentQuizById(id)),
        onAnswerClickHandler: answerId => dispatch(onAnswerClickHandler(answerId)),
        retryQuizAction: () => dispatch(retryQuizAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)