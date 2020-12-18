import React from 'react';
import {
  Router,
  Route,
  Switch,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Main from './pages/main'
import './App.css';

const customHistory = createBrowserHistory();

class App extends React.Component{
  render() {
    if (!localStorage.getItem('user')) { localStorage.setItem('user', JSON.stringify({id: null, name: null}))}
    return (
      <>
        <Router history={customHistory}>
          <Switch>
            <Route exact path="/"
                render={() => <Main />}>
            </Route>
            <Route exact path="*"
                render={() => <p className="error404">404. this page was not found</p>}>
            </Route>
          </Switch>
      </Router>
    </>
    )
  }
};

export default App;
