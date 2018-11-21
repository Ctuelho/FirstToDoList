import React, {Component} from 'react'


class HomePage extends Component {

    render(){
        console.log('HomePage currentUser', this.props.currentUser);

        const text = this.props.currentUser != null ? 
            ('Welcome ' + this.props.currentUser.name) :
            'Welcome to ToDoList. Please login or register.';
        return(
            <div>
                <h1>{text}</h1>
            </div>
        );
    };
}

export default HomePage;