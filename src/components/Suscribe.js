import React, {useContext} from "react"
import axios from 'axios'
import { useHistory} from 'react-router-dom'
import { UserContext } from "../context/UserContext";
import {createToken} from "../backend/services/Authservice";
import {sendConfirmationEmail} from "../backend/services/nodemailerService"


function Suscribe() {
    const { setUserName } = useContext(UserContext);
    const { setUserEmail } = useContext(UserContext);
    const { setIsLoggedIn } = useContext(UserContext);

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [acceptedTerms, setAcceptedTerms] = React.useState(false);
    var history = useHistory()
    const HandleSubmit = (e) => {
        
        console.log('Email:', email)
        console.log('Acceptedterms:', acceptedTerms)
        let token = createToken();
        const userObject = {
            email: email,
            name: name,
            password: password,
            status: 'Pending',
            token: token,
        };
        console.log(userObject)

        axios.post('http://192.168.1.58:4000/user', userObject)
            .then((res) => {
                if(res.data.status === "Pending") {
                    localStorage.setItem('userName', name);
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('isLoggedIn', "isLoggedIn")
                    setUserName(name);
                    setUserEmail(email);
                    setIsLoggedIn("isLoggedIn");
                    
                }

                history.push('/')
            }).catch((error) => {
                console.log(error)
            });
        sendConfirmationEmail(name, email, token);
        
    };

function validateLogin() {
    return email.length > 0 && password.length > 0
}

    return (
        <div style = {styleDiv}>
            <form style = {styleForm}>
                <h1>Phishing simulator</h1>
                <label>
                    Name:
                    <input style = {styleInput}
                        name = "name"
                        type = "text"
                        onChange={e => setName(e.target.value)}
                        value = {name}
                        required />
                </label>
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
                    Password:
                    <input style = {styleInput}
                        name = "password"
                        type = "password"
                        onChange={e => setPassword(e.target.value)}
                        value = {password}
                        required />
                </label>

                <label>
                    Accept terms:
                    <input
                        name="acceptedTerms"
                        type="checkbox"
                        onChange={e => setAcceptedTerms(e.target.value)}
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
export default Suscribe;