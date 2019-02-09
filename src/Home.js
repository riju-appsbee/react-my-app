import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import {Redirect,Link} from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import $ from 'jquery';

export default class Home extends Component{

  constructor(props) {
    super(props);
    //this.props.userDetails = JSON.parse(localStorage.getItem("user_details"));
    this.state = {
      isAuthenticated:true,
      userData: [],
      showMsg:false,
      modal: false,
      userDetails: {}
    };
    this.updateRecords = this.updateRecords.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleMessage = this.toggleMessage.bind(this);
    this.toggle = this.toggle.bind(this);
    }
  
  //Click handler for 'Launch Modal' button;updating modal's local state vice versa
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  /*
  componentDidMount is executed after the first render only on the client side. This is where AJAX requests and DOM or state updates should occur. This method is also used for integration with other JavaScript frameworks and any functions with delayed execution such as setTimeout or setInterval. 
  */
  componentDidMount(){
    console.log("Lets update the local state and call AJAX!");let self = this;
    //Only for an authenticated user,we'll call ajax
    if(typeof localStorage.getItem("user_details")!=="undefined" && localStorage.getItem("user_details")!==null){
      //Setting logged in user's name,id etc. in localstate
      self.setState({
        userDetails: JSON.parse(localStorage.getItem("user_details")),
        isAuthenticated: true
      });
      //calling ajax and setting the response in a local state
      /*fetch('./sample-data.json').then(response => response.json()).then(json => {
        console.log(json);
        this.setState({userData:json});
      });*/
      $.ajax({
        url:'./sample-data.json',
        type:'GET'
      }).then(function(response){
        console.log("AJAX Response:",response);
        self.setState({userData:response});
      });
      
    }
    //If anyone trying to access this page without logging in,updating a local sate as false
    else{
      self.setState({isAuthenticated:false});
    }
  };

  //Change handler for the editable field in the grid
    handleChange(event,index){
    console.log(event.target.value,index);//updated value and row-number
    const items = this.state.userData;
    items[index].email = event.target.value;//updating a local constant containing previous state
    // re-render the whole component
    //this.forceUpdate();
    this.setState({userData:items});//finally updating the local state to be used later for bulk update
  }

  updateRecords() {
    console.log('Update records in the db from here.',this.state.userData);
    /*
    var url = 'https://localhost:3000/updateUsers';
    var data = this.state.userData;
    fetch(url, {
      method: 'POST', // or 'PUT'
      //body: JSON.stringify(data), // data can be `string` or {object}!
      body: data,
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
    */

 }

  toggleMessage(){
      //setting localstate working as flag for message container as false
      this.setState({showMsg:!this.state.showMsg});
     // ReactDOM.findDOMNode(this.refs.msgDiv).style.display = 'block';
    
        
  }

  render(){
    /*var hideMessage = {
      display: 'none'
    }*/
    //If some one will try to access this page without logging in
    if(this.state.isAuthenticated===false){
      return <Redirect to="/unauth" />
    }
    return(
      <div className="container">
       <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <div className="row">
        <div className="col-lg-2">
          <span className="text-left">Welcome {this.state.userDetails.firstName}!</span>
        </div>
        <div className="col-lg-2">
        {/*Button to open the modal*/}
        <Button color="danger" onClick={this.toggle}>Launch Modal</Button>
        </div>
        <div className="col-lg-2">
        <button className="btn btn-primary" onClick={this.toggleMessage}>Toggle Message</button>
        </div>
        <div className="col-lg-4">        
        {/*Ternary operator to display the content like if-else*/}
        {this.state.showMsg===true?<div ref="msgDiv" className="alert alert-info alert-dismissible">
        Now you see me!</div>:''}
        </div> 
        <div className="col-lg-2 text-right">
        {/*Log out link to redirect to /logout*/}
          <Link to={'/logout'}>Log out</Link>
        </div>   
        </div>    
        <div className="row">
        <h2>Editable Grid In Bootstrap</h2>          
        <table className="table table-bordered" id="myTable">
          <thead>
            <tr>
              <th>UserID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {/*Iterating local state userData containing the json response*/}
          {this.state.userData.map((item,i) => 
          <tr key={i}>
          <td>USR00{item.id}</td>
          <td>{item.name}</td>
          <td><input className="form-control editable-input" defaultValue={item.email} onChange={(e) => this.handleChange(e,i) }></input></td>
          </tr>)}
          </tbody>
        </table>
        </div>
        <div className="row">
          <button className="btn btn-primary pull-left" onClick={this.updateRecords}>Update Records</button>
        </div>
      </div>
    );
   }  
}