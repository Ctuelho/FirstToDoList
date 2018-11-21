import React, {Component} from 'react'

class LoginPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            userName: '',
            password: ''
        };

        this.onLogin = this.onLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onLogin(){
        this.props.onLogin(this.state.userName, this.state.password);
    }

    render(){
        return(
            <div>
                <h1>Sign in</h1>
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
                <button onClick={this.onLogin}>Login</button>  
            </div>
        );
    };
}

export default LoginPage;
