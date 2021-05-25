import React, { useContext} from "react"
import { UserContext } from "../context/UserContext";


function About() {
    const { userName } = useContext(UserContext);
    return (
        <div>
            <p> Trabajo de Fin de Grado desarrollado por Raúl Escribano Corrales COMPLETAR TITULACION, UNIVERSIDAD Y CORREO</p>
        </div>
    )
}

export default About;