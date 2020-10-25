import React from "react"

function Suscribe() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [acceptedTerms, setAcceptedTerms] = React.useState(false);


const HandleSubmit = (e) => {
    console.log('Email:', email)
    
};
//mongodb+srv://rescoTFG:rescoTFG1234@tfg.1etzg.mongodb.net/<dbname>?retryWrites=true&w=majority
    return (
        <div style = {styleDiv}>
            <form style = {styleForm} onSubmit ={HandleSubmit}>
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
                    Acepte los terminos:
                    <input
                        name="acceptedTerms"
                        type="checkbox"
                        onChange={e => setAcceptedTerms(e.target.value)}
                        required />
                </label>
                <button style={styleButton}>Submit</button>
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