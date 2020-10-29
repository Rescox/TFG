import React, { Component } from 'react';
import { BrowserRouter as Router,  Route } from 'react-router-dom'
import Header from './components/layout/Header';
import Suscribe from './components/Suscribe';
import About from './components/About';
import Login from './components/Login';
import Welcome from './components/Welcome';
import './App.css';

class App extends Component{
  state = {
    todos: []
  }
  constructor() {
    super();

    this.state = { 
      loggedInStatus: "NOT_LOGGED",
      user: {}
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED:_in",
      user: data.user
    })
  }

  render() { 
    return (
      <Router>
        <div className="App">
          <div className="container">
          <Header/>
          </div>
          
            <div>
            <Route exact path='/' render={props=> (
              <Welcome {... props} handleLogin = {this.handleLogin} loggedInStatus={this.state.loggedInStatus}/>
            )}>
            </Route>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/register' component={Suscribe}></Route>
            <Route exact path='/about' component={About}></Route>
            </div>
          
        </div>
      </Router>
    );
  }
}

export default App;