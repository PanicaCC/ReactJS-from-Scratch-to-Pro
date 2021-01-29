import axios from "axios";
import {AUTH_AUTO_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export function authApp (email, password, isLogin) {
    return async dispatch => {

        const authData = {
            email, password, returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAIxJfGOL0cGfmPPKn6hHaeVSNflobCniY'

        if(isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIxJfGOL0cGfmPPKn6hHaeVSNflobCniY'
        }

        const response = await axios.post(url, authData)
        console.log(response.data)

        const userAuthData = response.data
        const expirationTime = new Date(new Date().getTime() + userAuthData.expiresIn * 1000)

        console.log(userAuthData.localId)

        localStorage.setItem('token', userAuthData.idToken)
        localStorage.setItem('userId', userAuthData.localId)
        localStorage.setItem('expires', expirationTime)

        dispatch(authSuccess(userAuthData.idToken))
        dispatch(autoLogout(userAuthData.expiresIn))

    }
}

export function authSuccess(token){
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogout(time){
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function autoLogin(){
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        } else {
            const expirationTime = new Date(localStorage.getItem('expires'))
            if(expirationTime <= new Date()){
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationTime.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expires')
    return {
        type: AUTH_AUTO_LOGOUT
    }
}

