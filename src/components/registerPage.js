import React, {Component} from 'react'

class RegisterPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            userName: '',
            password: ''
        };

        this.onRegister = this.onRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onRegister(){
        this.props.onRegister(this.state.userName, this.state.password);
    }

    render(){
        return(
            <div>
                <h1>New User</h1>
                <input 
                    type="text" 
                    name="userName" 
                    placeholder="Username"
                    value = {this.state.userName}
                    onChange = {this.handleChange}
                />
                <input 
                    type="text" 
                    name="password" 
                    placeholder="Password"
                    value = {this.state.password}
                    onChange = {this.handleChange}
                />
                <button onClick={this.onRegister}>Register</button>  
            </div>
        );
    };
}

export default RegisterPage;
