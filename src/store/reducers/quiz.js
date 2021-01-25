import {QUIZ_FETCH_ERROR, QUIZ_FETCH_START, QUIZ_FETCH_SUCCESS} from "../actions/actionTypes";

const initialState = {
    quizLists: [],
    loader: false,
    error: null
}

export default function quizReducer(state = initialState, action){
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
        default:
            return state
    }
}