import React, {useState, useContext} from "react"

import axios from 'axios'
import { useHistory} from 'react-router-dom'
import { UserContext } from "../context/UserContext";
import { Editor } from '@tinymce/tinymce-react';



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
                <h1>Añadir plantillas</h1>
                <label>
                    Nombre de la plantilla:
                    <input style = {styleInput}
                        name = "templateName"
                        type = "text"
                        onChange={e => setTemplateName(e.target.value)}
                        value = {templateName}
                        required
                    />
                </label>
                <label>
                    Codigo de la plantilla:
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
                <button type = "button" style={styleButton} onClick={handleSubmit}>Añadir</button>
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
}

export default AddTemplate;