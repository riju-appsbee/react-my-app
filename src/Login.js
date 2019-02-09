import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import {Redirect} from "react-router-dom";
import './Login.css';

export default class Login extends Component{

    constructor(props){
        super(props);
        this.state={
          loginData:{email:"",password:""},
          toHome: false,
          email:"",
          emailError:"",
          emailErrorFlag:true,
      };
    }

    componentDidMount(){
      // If already logged in then set the local state as true
      if(typeof localStorage.getItem("user_details")!=="undefined" && localStorage.getItem("user_details")!==null){
        this.setState({
          toHome: true
        });        
      }
    }
    //Validate blank value for email
    validateEmail(email){
      email.trim() === "" ? this.setState({emailErrorFlag:true}) : this.setState({emailErrorFlag:false});
      return email.trim() === "" ? "Blank Username." : "Valid Username!";
    }  
    //Check email error flag
    onEmailBlur(){
      const { email } = this.state;//fetching the typed username
      console.log(email);
      const emailError = this.validateEmail(email );//fetching the message
      return this.setState({ emailError });//set validation message in local state
    };
  
    //Email change handler function
    onEmailChange(event) {
      this.setState({
        email: event.target.value
      });
    }
    //Handler for login form
    loginSubmitHandler(e){
        e.preventDefault();
        //Creating post object carrying username and password
        const items = this.state.loginData;
        items.email = document.loginForm.email.value;
        items.password = document.loginForm.password.value;
        this.setState({loginData:items});
        //Either set state or manually re render/update the component
        // this.forceUpdate();
        console.log("Form submitted: ",this.state.loginData.email);
        //Check login credentials and set redirect flag
        if(this.state.loginData.email==="chatterjeeriju@gmail.com" && this.state.loginData.password==="123456"){
            console.log("Successfully Logged In! Redirecting to home...");
            //Setting user details in localstorage
            let responseJson = {
              id: 474489,
              username: "RC00474489",
              firstName: "Riju",
              lastName: "Chatterjee",
              token: '474489JWTTechM123456'
            };
            localStorage.setItem("user_details",JSON.stringify(responseJson));
            this.setState({toHome:true});
        }else{
          this.setState({toHome:false});
        }
    }

  render(){
    //Redirect to homepage if user is properly logged in.
    if(this.state.toHome){
      return <Redirect to="/home" />;
    }
    /*else{
      return <Redirect to="/logout" />;
    }*/
    return(
      <div className="container">
      <div className="row">
      <div className="col-lg-8 form-div">
        <Form id="loginForm" name="loginForm" method="POST" action="" onSubmit={this.loginSubmitHandler.bind(this)}>
        <FormGroup>
          <div className="text-left"><Label for="email">Email</Label></div>
          <Input className="col-lg-6" type="email" ref="email" name="email" id="email" valid={!this.state.emailErrorFlag?true:false} invalid={this.state.emailErrorFlag?true:false} onChange={this.onEmailChange.bind(this)}
              onBlur={this.onEmailBlur.bind(this)} placeholder="Enter your email address" />
          <FormFeedback className="text-left" valid={!this.state.emailErrorFlag?true:false}>{this.state.emailError}</FormFeedback>    
        </FormGroup>
        <FormGroup>
        <div className="text-left"><Label  for="password">Password</Label></div>
          <Input className="col-lg-6" type="password" ref="password" name="password" id="password" placeholder="Enter a valid passowrd" />
        </FormGroup>
        <div className="text-left"><Button>SIGN IN</Button></div>
      </Form>
      </div>
      </div>
      </div>
        )
    };
}