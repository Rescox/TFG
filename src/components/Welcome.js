import React, { Component} from "react"
import Suscribe from "./Suscribe";

export default class Welcome extends Component{
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data)
        this.props.history.push("/");
    }
    render() { 
        return (
            <div>
                <h1> Bienvenido a Phishing Simulator </h1>
                <h1>Status: {this.props.loggedInStatus}</h1>
                <Suscribe handleSuccessfulAuth={this.handleSuccessfulAuth}/>
            </div>

        )
    }
}

