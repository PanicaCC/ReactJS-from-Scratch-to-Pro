import React, {Component} from "react"
import "./Auth.scss"
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import is from 'is_js'
import firebase from "firebase/app";
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAIxJfGOL0cGfmPPKn6hHaeVSNflobCniY",
    authDomain: "quizes-react.firebaseapp.com",
    databaseURL: "https://quizes-react-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "quizes-react",
    storageBucket: "quizes-react.appspot.com",
    messagingSenderId: "836774158327",
    appId: "1:836774158327:web:0a586cbde0c9df7e6b98f2",
    measurementId: "G-KRVBE4MFGG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Email is invalid',
                valid: false,
                touched: false,
                validation: {
                    require: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Password is invalid',
                valid: false,
                touched: false,
                validation: {
                    require: true,
                    minLength: 6
                }
            }
        }
    }

    submitHandler = event => {
        event.preventDefault()
    }

    loginHandler(event) {
        event.preventDefault()
        firebase.auth().signInWithEmailAndPassword(this.state.formControls.email.value, this.state.formControls.password.value)
            .then((userCredential) => {
                var user = userCredential.user;

                console.log(user)

                alert('Authorization successful')

                this.setState({
                    formControls: {
                        email: {
                            value: ''
                        },
                        password: {
                            value: ''
                        }
                    }
                })
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    registerHandler = event => {
        event.preventDefault()
        firebase.auth().createUserWithEmailAndPassword(this.state.formControls.email.value, this.state.formControls.password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)

                this.setState({
                    formControls: {
                        email: {
                            value: ''
                        },
                        password: {
                            value: ''
                        }
                    }
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    validateControl (value, validation) {
        if(!validation){
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler = (event, formControlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[formControlName] }

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[formControlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
             isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }

    renderInputHandler() {
          return  Object.keys(this.state.formControls).map((formControlName, index) => {
             const controlItem = this.state.formControls[formControlName]
             return (
                 <Input
                    key = {formControlName +'_'+ index}
                    type = {controlItem.type}
                    value = {controlItem.value}
                    label = {controlItem.label}
                    touched = {controlItem.touched}
                    valid = {controlItem.valid}
                    shouldValidate = {!!controlItem.validation}
                    errorMessage = {controlItem.errorMessage}
                    onChange = {event => this.onChangeHandler(event, formControlName)}
                 />
            )
        })
    }

    render() {
        return (
            <div className="Auth">
                <h1>Login</h1>

                <form onSubmit={this.submitHandler} className={"Auth__form"}>

                    { this.renderInputHandler() }

                    <div className="Auth__btns">
                        <Button
                            type = {'success'}
                            onClick={event => this.loginHandler(event)}
                            disabled = {!this.state.isFormValid}
                        >
                            Log in
                        </Button>
                        <Button
                            type = {'primary'}
                            onClick={event => this.registerHandler(event)}
                            disabled = {!this.state.isFormValid}
                        >
                            Register now
                        </Button>
                    </div>
                </form>

            </div>
        )
    }
}
export default Auth
