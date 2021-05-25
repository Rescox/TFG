import React, {useState, useContext, useEffect} from "react"
import axios from 'axios'
import { useHistory} from 'react-router-dom'
import { UserContext } from "../context/UserContext";
import  DeleteIcon  from '@material-ui/icons/Delete';



//Componente para poder crear campañas por correo individuales
function AddIndividualCampaign() {
    const [campaignName, setCampaignName] = useState([])
    const [firstName, setFirstName] = useState([])
    const [lastName, setLastName] = useState([])
    const [template, setTemplate] = useState([])
    const [templateUrl, setTemplateUrl] = useState([])
    const [launchDate, setLaunchDate] = useState([])
    const [endDate, setEndDate] = useState([])
    const { userEmail} = useContext(UserContext);   
    
    
    var history = useHistory()   

    const handleSubmit = e => {
        console.log(firstName)
        if(campaignName.length === 0) {
            alert("Introduzca el nombre de la campaña");
        } 
        else if( firstName.length === 0) {
            alert("Introduzca su nombre");
        }
        else if( lastName.length === 0) {
            alert("Introduzca su apellido");
        }
        else if( template.length === 0) {
            alert("Introduzca al menos una plantilla");
        }
        else if( launchDate.length === 0) {
            alert("Introduzca la fecha de comienzo");
        } 
        else if( endDate.length === 0) {
            alert("Introduzca la fecha de finalizacion");
        } else { 
        const data = {'First Name': firstName, 'Last Name': lastName, 'Email': userEmail}
        
            const campaignObject = {
                name: campaignName,
                launchDate: launchDate,
                endDate: endDate,
                template: template,
                group: data,
                state: "Created",
                creator: userEmail
            };
            axios.post('http://localhost:4000/campaign', campaignObject)
                .then((res) => {
                    console.log(res)
                }).catch((error) => {
                    console.log(error)
                });
                history.push('/profile')
        }
    }

    const getTemplates = data =>{
        const list = []
        list.push({'id':1, 'name':'Twitter-Por Defecto'})
        list.push({'id':3, 'name':'Google-Por Defecto'})
        list.push({'id':4, 'name':'Spotify-Por Defecto'})
        for (let i = 0; i < data.length; i++) {
            if(data[i]['status_usable'] !== false) { 
                const obj = {}
                obj['id'] = data[i]['gophish_id']
                obj['name'] = data[i]['name'];
                obj['html'] = data[i]['html'];
                list.push(obj)
            }
        }
        console.log(list)
        setTemplateUrl(list)
    }


    useEffect(() => { 
        const url = 'http://localhost:4000/template/'+ userEmail
        axios.get(url)
        .then((res) => {
            getTemplates(res.data)
        }).catch((error) => {
            console.log(error)
        })
    },[]);



    const handleSelect = e => {
        if(template.indexOf(e.target.value) === -1) { 
            setTemplate(template.concat(e.target.value))
            
        }
        console.log(template)
    }
    
    const handleDeleteSelect = id => {
        const newTemplate = template.filter((item) => item !== id)
        console.log(newTemplate)
        setTemplate(newTemplate)
    }

    const handleValueLi = e => {
        const obj = JSON.parse(e)
        return obj.name
    }

    return (
        <div style = {styleDiv}>
            <form style = {styleForm}>
                <h1>Individual campaign</h1>
                <label>
                    Campaign name:
                    <input style = {styleInput}
                        name = "campaignName"
                        type = "text"
                        onChange={e => setCampaignName(e.target.value)}
                        value = {campaignName}
                        required
                    />
                </label>
                <label>
                    Templates:
                    <select style= {selectStyle} onChange= {handleSelect}>
                        { templateUrl.map( (name, id) => (
                        <option key= {id} value={JSON.stringify(name)} >{JSON.stringify(name.name)}</option>
                        ))}
                    </select>
                    <ul>
                        { template.map( (name, id) => (
                        <li style={{display: 'flex'}} key={id} ><p>{handleValueLi(name)}</p> 
                        <button style={buttonRemoveStyle} type="button" onClick={() => handleDeleteSelect(name)}><DeleteIcon /></button>
                        </li>
                        ))}
                    </ul>
                </label>
                <label>
                    Your First Name:
                    <input style = {styleInput}
                        name = "firstName"
                        type = "text"
                        onChange={e => setFirstName(e.target.value)}
                        value = {firstName}
                        required
                    />
                </label>
                <label>
                    Your Last Name:
                    <input style = {styleInput}
                        name = "launchDate"
                        type = "text"
                        onChange={e => setLastName(e.target.value)}
                        value = {lastName}
                        required
                    />
                </label>
                <label>
                    Launch date:
                    <input style = {styleInput}
                        name = "launchDate"
                        type = "date"
                        onChange={e => setLaunchDate(e.target.value)}
                        value = {launchDate}
                        required
                    />
                </label>
                <label>
                    End date:
                    <input style = {styleInput}
                        name = "finishDate"
                        type = "date"
                        onChange={e => setEndDate(e.target.value)}
                        value = {endDate}
                        required
                    />
                </label>
                
                <button type = "button" style={styleButton} onClick={handleSubmit}>Add campaign</button>
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

const buttonRemoveStyle = {
    background: 'transparent',
    borderColor: '#FFFFFF',
    borderStyle: 'solid',
}

const selectStyle = {
    margin: '5px',
    border: "none",
    background: '#ffffff',
    padding: "10px",
    width:'25%',
    height:'25%',
    fontFamily: "inherit",
    fontSize: "inherit",
    cursor: "inherit",
    lineHeight: "pointer",
}
export default AddIndividualCampaign;