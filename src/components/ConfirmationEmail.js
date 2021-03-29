import React, { useContext} from "react"
import axios from 'axios'


function ConfirmationEmail(props) {
    console.log(props.match.params.confirmationCode);
    let noErrors = false;
    const url = 'http://localhost:4000/verification/' + props.match.params.confirmationCode
        axios.get(url)
        .then((res) => {
            console.log(res);
            noErrors = true;
            
        }).catch((error) => {
            console.log(error)
        })
    if(noErrors) 
        return (
            <div>
                <p> Gracias por verificar su correo </p>
            </div>
        )
    else 
        return (
            <div>
                <p> Error al verificar el correo </p>
            </div>
        )
}

export default ConfirmationEmail;