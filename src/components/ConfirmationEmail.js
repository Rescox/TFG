import React, { useContext} from "react"
import axios from 'axios'
import { UserContext } from "../context/UserContext";


//Componente encargado de direccionar al usuario cuando verifique su nueva cuenta.
function ConfirmationEmail(props) {
    const { setStatus } = useContext(UserContext);
    console.log(props.match.params.confirmationCode);
    let noErrors = true;
    const url = 'http://localhost:4000/user/verification/' + props.match.params.confirmationCode
        axios.get(url)
        .then((res) => {
            console.log(res);
            
            
        }).catch((error) => {
            console.log(error);
            noErrors = false;
        })
    if(noErrors) { 
            setStatus("Active");
            return (
                <div>
                    <p> Gracias por verificar su correo </p>
                </div>
            )
        }
    else 
        return (
            <div>
                <p> Error al verificar su correo </p>
            </div>
        )
}

export default ConfirmationEmail;