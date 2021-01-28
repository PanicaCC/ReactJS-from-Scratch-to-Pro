import React, {Component} from "react"
import "./QuizCreator.scss"
import {createControl, validate, validateForm} from "../../form/formFramework/formFramework";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Select from "../UI/Select/Select";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";
import {connect} from "react-redux";

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
        formControls: createFormControls(),
        rightAnswerId: 1,
        isFormValid: false
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = event => {
        event.preventDefault()

        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }

        this.props.createQuizQuestion(questionItem)

        this.setState({
            formControls: createFormControls(),
            rightAnswerId: 1,
            isFormValid: false
        })
    }

    createQuizHandler = event => {
        event.preventDefault()

        this.props.finishCreateQuiz()
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
                {text: 'answer 1', value: 1},
                {text: 'answer 2', value: 2},
                {text: 'answer 3', value: 3},
                {text: 'answer 4', value: 4}
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
                            disabled = {this.props.quiz.length === 0}
                        >
                            Create test
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch){
    return {
        createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)
