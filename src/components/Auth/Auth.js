import React, {Component} from "react"
import "./Auth.scss"
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import is from 'is_js'

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

    loginHandler() {
        return false
    }

    registerHandler() {
        return false
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
                            onClick={this.loginHandler}
                            disabled = {!this.state.isFormValid}
                        >
                            Log in
                        </Button>
                        <Button
                            type = {'primary'}
                            onClick={this.loginHandler}
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
