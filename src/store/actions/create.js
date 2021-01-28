import {CREATE_QUESTION, QUIZ_RESET_CREATE} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export function createQuizQuestion(item) {
    return {
        type: CREATE_QUESTION,
        item
    }
}

export function resetQuizCreation() {
    return {
        type: QUIZ_RESET_CREATE,
    }
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        await axios.post('/quizes.json', getState().create.quiz)
        dispatch(resetQuizCreation())
    }
}