import React, {useState, useContext} from "react"

import axios from 'axios'
import { useHistory} from 'react-router-dom'
import { UserContext } from "../context/UserContext";
import { Editor } from '@tinymce/tinymce-react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



//Componente para poder crear plantillas nuevas y añadirla a la cuenta del usuario para poder reutilizarlas en un futuro en sus campañas por email.
function AddTemplate() {
    
    const [templateName, setTemplateName] = useState([])
    const [html, setHtml] = useState([])
    const { userEmail} = useContext(UserContext); 
    const fn = "{{.FirstName}}"
    const ln = "{{.LastName}}"
    const em = "{{.Email}}"
    var history = useHistory()


   

    const handleSubmit = e => {
        const templateObject = {
            name: templateName,
            html: html,
            creator: userEmail
        };
        axios.post('http://localhost:4000/template', templateObject)
            .then((res) => {
                console.log(res)
            }).catch((error) => {
                console.log(error)
            });
            history.push('/')
    }

    const handleEditorChange = (content, editor) => {
        setHtml(content);
    }

    return (
        <div style = {styleDiv}>
            <form style = {styleForm}>
                <h1>Add template</h1>
                <label>
                    Template name:
                    <input style = {styleInput}
                        name = "templateName"
                        type = "text"
                        onChange={e => setTemplateName(e.target.value)}
                        value = {templateName}
                        required
                    />
                </label>
                <label>
                    Template body:
                    <Editor
                        apiKey="5lwdt6ftjpkt8250g4clmax3ikqf444j4v6ffjgq4ik0q98d"
                        initialValue="<p>Escriba aquí el contenido de su correo</p>"
                        init={{
                            height: 300,
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={handleEditorChange}
                    />
                </label>
                <p style={pHelpStyle}>* Introduzca en esta caja de texto las constantes {fn}, {ln} y {em} para sustituirlo por el nombre, apellidos y email de cada usuario respectivamente.</p>
                <Popup trigger={<button type="button"> How to clone a mail</button>} position="center" modal>
                    <div style={modal}></div>
                    <div style={modalHeader}> How to clone a mail </div>
                    <div style={modalContent}>
                        {' '}
                    Para clonar un correo que nos haya mandado alguien o alguna empresa( Google, Spotify, Twitter, etc), deberemos seguir los siguientes pasos <br /> <br />
                    1. Abrir el correo que queramos copiar
                    <br />
                    <br />
                    2. Pulsar en el icono con tres puntos y seleccionar la opción Mostrar original
                    <br />
                    <br />
                    3. Una vez abierto, en la parte de la URL, nos aparecerá algo parecido a esto: https://mail.google.com/mail/u/0?ik=??&view=om&permmsgid=msg-f%??
                    <br />
                    <br />
                    4. En el parametro view=om, cambiamos om por lg, para obtener el HTML con el que podremos clonar dicho correo.
                    <br />
                    <br />
                    5. Ahora simplemente pulsaremos Click derecho e inspeccionar elementos, copiamos todo el contenido y lo pegamos en la caja de texto de esta página.
                    <br />
                    <br />
                    6. En las partes del código dónde aparezcan nombres o apellidos debería sustituirlo por las variables .FirstName y .LastName,
                    y en cualquier link por la variable .URL
                    </div>
                </Popup>
                <button type = "button" style={styleButton} onClick={handleSubmit}>Add template</button>
            </form>
        </div>
    )
}

const styleDiv = {
    textAlign: 'center',
    display: 'block'
}

const modal ={
    fontSize: '12px',
    background: 'rgb(255, 255, 255)'
}
const modalHeader = {
    width: '100%',
    borderBottom: '1px solid gray',
    fontSize: '18px',
    textAlign: 'center',
    background: '#ffffff',

}
const modalContent = {
    width: '100%',
    background: '#ffffff',

}


const styleForm = {
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'left',
    width: '30%',
    padding: '10px',
    verticalAlign: 'top'
}

const pHelpStyle = {
    fontSize: '0.775em',  
    fontWeight: "bold"
    
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
    color: '#000000',
    background:'#7FDBFF',
    borderRadius: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
}

export default AddTemplate;