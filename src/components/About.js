import React, { useContext} from "react"
import { UserContext } from "../context/UserContext";


function About() {
    const { userName } = useContext(UserContext);
    return (
        <div>
            <p> Trabajo de Fin de Grado desarrollado por Raúl Escribano Corrales </p>
            <h1>{userName}</h1>
        </div>
    )
}

export default About;