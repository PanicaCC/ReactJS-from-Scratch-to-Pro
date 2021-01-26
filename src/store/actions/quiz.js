import axios from "../../axios/axios-quiz";
import {
    CURRENT_QUIZ_SUCCESS,
    QUIZ_FETCH_ERROR,
    QUIZ_FETCH_START,
    QUIZ_FETCH_SUCCESS,
    QUIZ_FINISH,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY,
    QUIZ_SET_STATE
} from "./actionTypes";

export function fetchQuizes(){
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
           const response = await axios.get('/quizes.json')
            let quizLists = [];
            Object.keys(response.data).map((key, index) => {
                return (

                    quizLists.push({
                        id: key,
                        name: `IQ Test - ${index + 1}`
                    })
                )
            })
            dispatch(fetchQuizesSuccess(quizLists))

        } catch (e){
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizesStart(){
    return {
        type: QUIZ_FETCH_START,
    }
}

export function fetchQuizesSuccess(quizLists){
    return {
        type: QUIZ_FETCH_SUCCESS,
        quizLists
    }
}

export function fetchQuizesError(e){
    return {
        type: QUIZ_FETCH_ERROR,
        error: e
    }
}

export function fetchCurrentQuizById(quizId){
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`/quizes/${quizId}.json`)
            const quiz = response.data
            dispatch(fetchCurrentQuizSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function quizSetState(answerStatus, results){
    return {
        type: QUIZ_SET_STATE,
        answerStatus, results
    }
}

export function finishedQuiz(){
   return {
       type: QUIZ_FINISH
   }
}

export function nextQuizQuestion(numQuestion){
    return {
        type: QUIZ_NEXT_QUESTION,
        numQuestion
    }
}

export function onAnswerClickHandler(answerId){
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerStatus){
            const key = Object.keys(state.answerStatus)[0]
            if (state.answerStatus[key] === 'success'){
                return
            }
        }

        const question = state.quiz[state.activeQuestion];
        const results = state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]){
                results[question.id] = 'success'

            }
            dispatch(quizSetState({[answerId]: 'success'}, results))
            const timeout = window.setTimeout(() => {
                (isQuizFinished(state))
                    ? dispatch(finishedQuiz())
                    : dispatch(nextQuizQuestion(state.activeQuestion + 1))
                window.clearTimeout(timeout)
            }, 1000)

        } else {
            console.log("Wrong answer")
            results[question.id] = 'error'
            dispatch(quizSetState({[answerId]: 'error'}, results))
        }
    }
}

export function retryQuizAction (){
    return {
        type: QUIZ_RETRY
    }
}

function isQuizFinished(state) {
   return state.activeQuestion + 1 === state.quiz.length
}

export function fetchCurrentQuizSuccess(quiz){
    return {
        type: CURRENT_QUIZ_SUCCESS,
        quiz
    }
}