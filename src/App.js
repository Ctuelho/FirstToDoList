import React, { Component } from "react";

import {ToastContainer, ToastStore} from 'react-toasts';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// /import Assignment from './components/assignment.js'
import HomePage from './components/homePage.js'
import RegisterPage from './components/registerPage.js'
import LoginPage from './components/loginPage.js'

import './App.css';

const dbUrl = 'http://localhost:3050/people'
var data = fetchData();
var currentUser = localStorage.getItem('toDoList_currentUser') || null;

const history = window.history;

function fetchData(){

    console.log("FETCHING DATA");
    fetch(dbUrl, {
        headers: {
            "Accept": "application/json"
        },
        method: 'GET',
        mode: 'cors',
    })
    .then(function(response) {
        var contentType = response.headers.get("content-type");
        if(contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then(function(json) {
                data = json;
            });
        } else {
            console.log("Oops, we haven't got JSON!");
        }
    });
};


class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentUser: currentUser
        }

        this.openAddAssignmentDialogue = this.openAddAssignmentDialogue.bind(this);
        this.sendToDB = this.sendToDB.bind(this);
        this.addAssignment = this.addAssignment.bind(this);
        this.deleteAssignment = this.deleteAssignment.bind(this);

        this.onLogin = this.onLogin.bind(this);
        // this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount(){
        // /this.fetchData();
    }

    componentDidUpdate(){
        console.log("did update");
        this.sendToDB();
    }    

    openAddAssignmentDialogue(){
        const textValue = window.prompt("Assignment name", "New Assingment");
        this.addAssignment(textValue);
    }

    addAssignment(title){
        var assignments = this.state.assignments;
        assignments.push({title: title})
        console.log("title/assingments in add", title, assignments);
        this.setState({assignments});
        console.log("depois de add");
    }

    sendToDB(){
        localStorage.setItem('assignments', JSON.stringify(this.state.assignments));
    }

    renderCreateMessage(){
        //console.log("renderCreateMessage");
        return (<div>No Assignments, try creating one!</div>);
    }

    deleteAssignment(title){
        const assignments = this.state.assignments.filter (assigment => {
            return assigment.title !== title 
        });
        this.setState({assignments});
    }

    onLogin(username, pasword){
        //console.log("onLogin", username, pasword);
        if(username === '' || pasword === ''){
            ToastStore.error('Invalid username or password');
            return;
        }
        const filteredUserNames = data.filter(person => {
            return person.name === username
        });
        //console.log('filteredUserNames', filteredUserNames);
        if(filteredUserNames.length === 1){
            //console.log('has found', filteredUserNames[0])
            if(filteredUserNames[0].password === pasword){
                currentUser = filteredUserNames[0];
                localStorage.setItem('toDoList_currentUser', currentUser);
                ToastStore.success('Welcome, ' + username + '!');
                this.setState({currentUser: currentUser});
                this.forceUpdate();
                history.pushState({urlPath:'/'},"",'/');
            }
        }
    }

    onRegister(username, pasword){
        console.log("onRegister", username, pasword);
        const filteredUserNames = data.filter(person => {
            return person.name === username
        });
        console.log('filteredUserNames', filteredUserNames);
    }

    render(){
        //const assignments = this.state.assignments;
        return (
            <Router>
                <div>
                    <ToastContainer store={ToastStore} position={ToastContainer.POSITION.TOP_LEFT}/>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>
                    <Route 
                        exact path="/"
                        component={
                            props => <HomePage currentUser={currentUser}{...props} />
                        }
                    />
                    <Route path="/login" 
                        component={
                            ()=> <LoginPage onLogin={this.onLogin}/>
                        }
                    />
                    <Route path="/register"
                        component={
                            () => <RegisterPage onRegister={this.onRegister}/>
                        }
                    />
                </div>
            </Router>  
        )
    }
}

export default App;

