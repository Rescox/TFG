import React, {useContext} from "react"
import axios from 'axios'
import { useHistory} from 'react-router-dom'
import { UserContext } from "../context/UserContext";






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
        const userObject = {
            email: email,
            name: name,
            password: password,
        };
        console.log(userObject)
        axios.post('http://localhost:4000/user', userObject)
            .then((res) => {
                if(res.data.status === "created") {
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
    };

function validateLogin() {
    return email.length > 0 && password.length > 0
}

    return (
        <div style = {styleDiv}>
            <form style = {styleForm}>
                <h1>Suscripcion para el simulador de phishing</h1>
                <label>
                    Nombre:
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
                    Contraseña:
                    <input style = {styleInput}
                        name = "password"
                        type = "password"
                        onChange={e => setPassword(e.target.value)}
                        value = {password}
                        required />
                </label>

                <label>
                    Acepte los terminos:
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