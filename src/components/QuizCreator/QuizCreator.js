import React, {Component} from "react"
import "./QuizCreator.scss"
import Button from "../UI/Button/Button";
import {createControl} from "../../form/formFramework/formFramework";
import Input from "../UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../UI/Select/Select";

function createOptionControl(num){
    return createControl({
        label: `Possible answer ${num}`,
        errorMessage: "Field is not be blank",
        id: num
    }, {required: true})
}

function createFormControls(){
    return {
        question: createControl({
            label: "Write your question",
            errorMessage: "Field is not be blank"
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends Component {

    state = {
        formControls: createFormControls()
    }

    //const select = <Select />
    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler() {

    }

    createQuizHandler() {

    }

    onChangeHandler(value, formControlName) {
        const formControls = { ...this.state.formControls}
        const control = { ...formControls[formControlName] }

        control.value = value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[formControlName] = control
    }

    renderInputControls() {
        return Object.keys(this.state.formControls).map((formControlName, index) => {
            const control = this.state.formControls[formControlName]

            return (
                <Auxiliary key = {formControlName +'_'+ index}>
                    <Input
                        value = {control.value}
                        label = {control.label}
                        valid = {control.valid}
                        shouldValidate = {!!control.validation}
                        errorMessage = {control.errorMessage}
                        onChange = {event => this.onChangeHandler(event.target.value, formControlName)}
                    />
                    { index === 0 ? <hr /> : null }
                </Auxiliary>
            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {

        const select = <Select
            label={'Chose right answer'}
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 'text 1', value: 1},
                {text: 'text 2', value: 2},
                {text: 'text 3', value: 3},
                {text: 'text 4', value: 4}
            ]}
        />
        return (
            <div className="QuizCreator">
                <div className="QuizCreator__wrap">
                    <h1>Create new Test</h1>

                    <form onSubmit={ this.submitHandler }>

                        {this.renderInputControls()}

                        { select }

                        <Button
                            type={'primary'}
                            onClick={this.addQuestionHandler}
                        >
                            Add question
                        </Button>
                        <Button
                            type={'success'}
                            onClick={this.createQuizHandler}
                        >
                            Create test
                        </Button>
                    </form>

                </div>
            </div>
        )
    }
}
export default QuizCreator
