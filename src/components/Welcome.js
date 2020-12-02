import React, { Component} from "react";
import UserInfo from "./UserInfo";

export default class Welcome extends Component{
    constructor(props) {
        super(props);
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleSession = this.handleSession.bind(this);
    }


    handleSuccessfulAuth(data) {
        this.props.handleLogin(data)
        this.props.history.push("/");
    }

    handleSession(props) {
        this.props.handleSession();
    }
    render() { 
        return (
            <div>
                <h1> Bienvenido a Phishing Simulator </h1>
                <UserInfo handleSession = {this.handleSession}/>
            </div>

        )
    }
}

