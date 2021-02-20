import React, {useState, useContext, useEffect} from "react"
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import axios from 'axios'
import { useHistory} from 'react-router-dom'
import { UserContext } from "../context/UserContext";
import  DeleteIcon  from '@material-ui/icons/Delete';




function AddGroupCampaign() {
    const [data, setData] = useState([])
    const [campaignName, setCampaignName] = useState([])
    const [template, setTemplate] = useState([])
    const [templateUrl, setTemplateUrl] = useState([])
    const [launchDate, setLaunchDate] = useState([])
    const [endDate, setEndDate] = useState([])
    const [newUser, setNewUser] = useState([{'First Name': " ", 'Last Name': " ", 'Email': " "}])
    const { userEmail} = useContext(UserContext);    
    
    var history = useHistory()


    const processData = dataString => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        const list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
          const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
          if (headers && row.length === headers.length) {
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                let d = row[j];
                if (d.length > 0) {
                    if (d[0] === '"')
                        d = d.substring(1, d.length - 1);
                    if (d[d.length - 1] === '"')
                        d = d.substring(d.length - 2, 1);
                }
                if (headers[j] === "First Name" || headers[j] === "Last Name" || headers[j] === "Email") {
                    obj[headers[j]] = d;
                }
            }
            if (Object.values(obj).filter(x => x).length > 0) {
              list.push(obj);
            }
          }
        }
        let newData = [...data];
        newData = newData.concat(list)
        setData(newData);
        console.log(newData)
      }

    const columns = [ 
    { 
        name: "First Name",
        selector: "First Name",
        center: true,
        sortable: true,
    }, 
    {    
        name: "Last Name",
        selector: "Last Name",
        center: true,
        sortable: true
    },
    {    
        name: "Email",
        selector: "Email",
        center: true,
        sortable: true
    },
    {   cell:(row) => <button onClick={() => {handleChange(row)}} id={row.id}><DeleteIcon/></button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    }
];
    const handleChange = (row) => {
        let index = data.findIndex(x => x['Email'] === row['Email']); 
        let newData = [...data];
        newData.splice(index,1);
        
        setData(newData);
        console.log(data);
    };
    

    const handleFileUpload = e => {
        
        const file = e.target.files[0]
        const reader = new FileReader();
        
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, {type: 'binary'});
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1});
            processData(data); 
        };
        reader.readAsBinaryString(file)
    }

    const handleSubmit = e => {
        if (launchDate > endDate) {
            alert("Fecha de lanzamiento mayor que la de finalización");
        } else if (campaignName.length == 0) {
            alert("Introduzca el nombre de la campaña");
        } else if (launchDate.length == 0) {
            alert("Introduzca la fecha de inicio");
        } else if (endDate.length == 0) {
            alert("Introduzca la fecha de fin");
        } else if (template.length == 0) {
            alert("Introduzca al menos una plantilla ");
        } else if (data.length == 0) {
            alert("Introduzca al menos un usuario ");
        } else { 
            console.log(data)
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

    const handleAddRowSubmit = e => {
        console.log(newUser)
        
       

        if(newUser['First Name'] === "" || newUser['Last Name']=== "" || newUser['Email']=== "" || newUser['First Name'] === undefined || newUser['Last Name']=== undefined || newUser['Email']=== undefined) {
            alert("Introduzca todos los campos de usuario");
        } else { 
            const newData = [...data]
            newData.push(newUser)
            setData(newData)
            console.log(data)
        }
    }

    const getTemplates = data =>{
        const list = []
        list.push({'id':1, 'name':'Twitter-Por Defecto'})
        list.push({'id':4, 'name':'Google-Por Defecto'})
        list.push({'id':3, 'name':'Spotify-Por Defecto'})
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
        console.log(obj.id)
        return obj.name
    }

    const set = name =>  {
        return ({ target: {value}}) => {
            setNewUser(newUser => ({...newUser, [name]: value}))
        }
    }

    return (
        <div style = {styleDiv}>
            <form style = {styleForm}>
                <h1>Group Campaign</h1>
                <label>
                    Name of the campaign:
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
            <DataTable
                pagination
                highlightOnHover
                columns={columns}
                data={data}
                
            />
            <div style = {styleAddDiv}>
                <form style = {styleAddRowForm}>
                    <label>
                        First Name:
                        <input style = {styleAddInput}
                            name = "firstName"
                            type = "text"
                            defaultValue={newUser.FirstName}
                            onChange={set('First Name')}
                            required
                        />
                    </label>
                    <label>
                        Last Name:
                        <input style = {styleAddInput}
                            name = "lastName"
                            type = "text"
                            defaultValue={newUser.LastName}
                            onChange={set('Last Name')}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input style = {styleAddInput}
                            name = "email"
                            type = "text"
                            defaultValue={newUser.Email}
                            onChange={set('Email')}
                            required
                        />
                    </label>
                    <button type = "button" style={styleAddButton} onClick={handleAddRowSubmit}>Add person</button>
                    <label> Upload a .csv file with the people that will participate
                        <input style = {styleFileInput} 
                        onChange={handleFileUpload}
                        id = 'files'
                        type = "file"
                        accept = ".csv,.xlsx,.xls"
                        required
                        />
                    </label>
                </form>
            </div>
        </div>
    )
}

const styleDiv = {
    textAlign: 'center',
    display: 'block'
}

const styleAddDiv = {
    textAlign: 'center',
    display: 'inline-block'
}

const styleForm = {
    display: 'inline-block',
    margin: 'auto',
    textAlign: 'left',
    width: '30%',
    padding: '10px',
    verticalAlign: 'top'
}

const styleAddRowForm = {
    display: 'inline',
    margin:'auto',
    textAlign: 'left',
    width: '30%',
    padding: '10px',
    verticalAlign: 'top',
    paddingBottom: '50px'
    
}

const styleAddInput = {
    width: '20%',  
    boxSizing: 'border-box',  
    margin: '10px'
    
}

const styleAddButton = {
    textAlign: 'center', 
    padding: '12px', 
    display: 'flex',
    margin: 'auto',
    border: '1px solid #ccc',
    marginTop: '6px', 
    color: '#000000',
    background:'#7F7fbb',
    borderRadius: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    margin: 'auto',
    marginBottom: '10px'
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

const styleFileInput = {
    width: '50%', 
    display:'flex',
    padding: '12px', 
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',  
    margin: 'auto',
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
    border: "none",
    background: '#ffffff',
    padding: "10px",
    height:'25%',
    fontFamily: "inherit",
    fontSize: "inherit",
    cursor: "inherit",
    lineHeight: "pointer",
}
export default AddGroupCampaign;