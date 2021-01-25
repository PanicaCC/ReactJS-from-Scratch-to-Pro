import axios from "../../axios/axios-quiz";
import {QUIZ_FETCH_ERROR, QUIZ_FETCH_START, QUIZ_FETCH_SUCCESS} from "./actionTypes";

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