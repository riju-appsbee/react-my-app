/*Route component of the application */
import React, { Component } from 'react';
  //import ReactDOM from 'react-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MyForm from './Form.js';
import Home from './Home.js';
import Login from './Login.js';
import Logout from './Logout.js';
import Unauth from './Unauth.js';
import logo from './logo.svg';
import './App.css';

//Routing component of the app - route.js
function AppRouter(){  
    return(
      /*Define routing of the app through Link component which is a replacement for <a> tag.*/
      <Router>
          <div>
          <Breadcrumb>
          <BreadcrumbItem active><Link to={'/'}>Home</Link></BreadcrumbItem>
          <BreadcrumbItem><Link to={'/form'}>Show Form</Link></BreadcrumbItem>
          </Breadcrumb>
          <Switch>
          < Route exact path='/' component={Login} />
          < Route exact path='/login' component={Login} />
          < Route exact path='/logout' component={Logout} />
          < Route exact path='/unauth' component={Unauth} />
          < Route exact path='/home' component={Home} />
          < Route exact path='/form' component={MyForm} />
          </Switch>
          </div>
      </Router>
        )
    
}

//Main component of the app including header,footer and body
export default class App extends Component {
  render() {
    var marginTop = {"marginTop":50};
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React+Bootsrap=Reactstrap!!!</h1>
        </header>
        <p className="App-intro">
          Single Page Application In React JS
        </p>
        <AppRouter/>
        <footer className="footer">
        <div className="row" style={marginTop}>
        <div className="col-lg-12 text-left">
        <a className="btn btn-link" href="https://code.visualstudio.com/docs/nodejs/reactjs-tutorial">Click here to know how this app is made in Visual Studio Code with create-react-app generator!</a>
        </div>
        </div>
        </footer>
      </div>
    );
  }
}