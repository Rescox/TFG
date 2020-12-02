import React, { useContext} from "react"
import axios from 'axios'
import { useHistory} from 'react-router-dom'
import { UserContext } from "../context/UserContext";




function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { setUserName } = useContext(UserContext);
    const { setUserEmail } = useContext(UserContext);
    const { setIsLoggedIn } = useContext(UserContext);
    var history = useHistory()

    const HandleSubmit = (e) => {
        
        console.log('Email:', email)
        const userObject = {
            email: email,
            password: password
        };
        console.log(userObject)
        axios.post('http://localhost:4000/user/login', userObject)
            .then((res) => {
                console.log(res.data.usuario.name)
                if(res.data.usuario.name !== undefined && res.data.usuario.password !== undefined) { 
                    localStorage.setItem('userName', res.data.usuario.name);
                    localStorage.setItem('userEmail', res.data.usuario.email);
                    localStorage.setItem('isLoggedIn', "isLoggedIn")
                    setUserName(res.data.usuario.name);
                    setUserEmail(res.data.usuario.email);
                    setIsLoggedIn("isLoggedIn");
                }
            }).catch((error) => {
                console.log(error)
            });
            history.push('/')
    };

function validateLogin() {
    return email.length > 0 && password.length > 0
}

    return (
        <div style = {styleDiv}>
            <form style = {styleForm}>
                <h1>Login para el simulador de phishing</h1>
                <label>
                    Email:
                    <input style = {styleInput}
                        name = "email"
                        type = "email"
                        onChange={e => setEmail(e.target.value)}
                        value = {email}
                        required />
                </label>
                <label>
                    Contraseña:
                    <input style = {styleInput}
                        name = "password"
                        type = "password"
                        onChange={e => setPassword(e.target.value)}
                        value = {password}
                        required />
                </label>
                <button type = "button" style={styleButton} disabled={!validateLogin()} onClick= {HandleSubmit}>Submit</button>
            </form>
        </div>
    )
}

const styleDiv = {
    textAlign: 'center',
    display: 'block'
}

const styleForm = {
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'left',
    width: '45%',
    padding: '10px',
    verticalAlign: 'top'
}

const styleInput = {
    width: '100%', 
    padding: '12px', 
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',  
    marginTop: '6px', 
    marginBottom: '16px' 
}

const styleButton = {
    width: '100%', 
    padding: '12px', 
    border: '1px solid #ccc',
    marginTop: '6px', 
    
}
export default Login;