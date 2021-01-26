import {
    CURRENT_QUIZ_SUCCESS,
    QUIZ_FETCH_ERROR,
    QUIZ_FETCH_START,
    QUIZ_FETCH_SUCCESS,
    QUIZ_FINISH,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY,
    QUIZ_SET_STATE
} from "../actions/actionTypes";

const initialState = {
    quizLists: [],
    loader: false,
    error: null,
    activeQuestion: 0,
    answerStatus: {},
    isFinished: false,
    results: {},
    quiz: null
}

export function quizReducer(state = initialState, action){
    switch (action.type){
        case QUIZ_FETCH_START:
            return {
                ...state, loader: true
            }
        case QUIZ_FETCH_SUCCESS:
            return {
                ...state, loader: false, quizLists: action.quizLists
            }
        case QUIZ_FETCH_ERROR:
            return {
                ...state, loader: false, error: action.error
            }
        case CURRENT_QUIZ_SUCCESS:
            return {
                ...state, loader: false, quiz: action.quiz
            }
        case QUIZ_SET_STATE:
            return {
                ...state, answerStatus: action.answerStatus, results: action.results
            }
        case QUIZ_FINISH:
            return {
                ...state, isFinished: true
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state, activeQuestion: action.numQuestion, answerStatus: null
            }
        case QUIZ_RETRY:
            return {
                ...state, answerStatus: null, isFinished: false, activeQuestion: 0, results: {}
            }
        default:
            return state
    }
}