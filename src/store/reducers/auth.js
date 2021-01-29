import {AUTH_AUTO_LOGOUT, AUTH_SUCCESS} from "../actions/actionTypes";

const initialState = {
    token: null
}

export function authReducer(state = initialState, action){
    switch (action.type){

        case AUTH_SUCCESS:
            return {
                ...state, token: action.token
            }
        case AUTH_AUTO_LOGOUT:
            return {
                ...state, token: null
            }

        default:
            return state
    }
}