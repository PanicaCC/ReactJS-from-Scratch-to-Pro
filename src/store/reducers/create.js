import {CREATE_QUESTION, QUIZ_RESET_CREATE} from "../actions/actionTypes";

const initialState = {
    quiz: []
}

export function createReducer (state = initialState, action){
    switch (action.type) {
        case CREATE_QUESTION:
            return {
                ...state, quiz: [...state.quiz, action.item]
            }
        case QUIZ_RESET_CREATE:
            return {
                ...state, quiz: []
            }

        default:
            return state
    }
}