import React, {Component} from "react"
import "./QuizCreator.scss"
import {createControl, validate, validateForm} from "../../form/formFramework/formFramework";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Select from "../UI/Select/Select";
import axios from "axios";

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
        quiz: [],
        formControls: createFormControls(),
        rightAnswerId: 1,
        isFormValid: false
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = event => {
        event.preventDefault()

        const quiz = this.state.quiz.concat()
        const index = quiz.length
        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: index + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {option1: option1.value, id: option1.id},
                {option1: option2.value, id: option2.id},
                {option1: option3.value, id: option3.id},
                {option1: option4.value, id: option4.id}
            ]
        }

        quiz.push(questionItem)

        this.setState({
            quiz,
            formControls: createFormControls(),
            rightAnswerId: 1,
            isFormValid: false
        })
    }

    createQuizHandler = async event => {
        event.preventDefault()

        try {
            await axios.post('https://quizes-react-default-rtdb.europe-west1.firebasedatabase.app/quizes.json', this.state.quiz)
        } catch (e){
            console.log(e)
        }
    }
    onChangeHandler(value, formControlName) {
        const formControls = { ...this.state.formControls}
        const control = { ...formControls[formControlName] }

        control.value = value
        control.touched = true
        control.valid = validate(control.value, control.validation)

        formControls[formControlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
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
                        touched = {control.touched}
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
                            disabled = {!this.state.isFormValid}
                        >
                            Add question
                        </Button>
                        <Button
                            type={'success'}
                            onClick={this.createQuizHandler}
                            disabled = {this.state.quiz.length === 0}
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
