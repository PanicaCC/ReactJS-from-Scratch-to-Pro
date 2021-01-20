import React, {Component} from "react";
import Layout from "./hoc/Layout/Layout";
import {Route, Switch} from "react-router";
import Quiz from "./containers/Quiz/Quiz";
import Auth from "./components/Auth/Auth";
import QuizCreator from "./components/QuizCreator/QuizCreator";
import QuizList from "./components/QuizList/QuizList";

class App extends Component {

  render() {
    return (
        <Layout>
            <Switch>
                <Route path={'/'} exact={true} component={QuizList} />
                <Route path={'/auth'} component={Auth} />
                <Route path={'/quiz-creator'} component={QuizCreator} />
                <Route path={'/quiz'} component={Quiz} />
            </Switch>
        </Layout>
    );
  }
}

export default App