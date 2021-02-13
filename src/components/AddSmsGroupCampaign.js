import React, {useState, useContext, useEffect} from "react"
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import axios from 'axios'
import { useHistory} from 'react-router-dom'
import { UserContext } from "../context/UserContext";
import  DeleteIcon  from '@material-ui/icons/Delete';




function AddSmsGroupCampaign() {
    const [data, setData] = useState([])
    const [campaignName, setCampaignName] = useState([])
    const [body, setBody] = useState([])
    const fn = "{.FirstName}"
    const ln = "{.LastName}"
    
    
    const [newUser, setNewUser] = useState([{'First Name': " ", 'Last Name': " ", 'Telephone': " "}])
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
                if (headers[j] === "First Name" || headers[j] === "Last Name" || headers[j] === "Telephone") {
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
        name: "Telephone",
        selector: "Telephone",
        center: true,
        sortable: true
    },
    {   cell:(row) => <button onClick={() => {handleChange(row)}} id={row.id}><DeleteIcon/></button>,
        ignoreRowClick: true,
        allowOverflow: true,
        center: true,
        button: true,
    }
];
    const handleChange = (row) => {
        let index = data.findIndex(x => x['Telephone'] == row['Telephone']); 
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
        console.log(data)
        const smsObject = {
            name: campaignName,
            body: body,
            group: data,
            state: "Created",
            creator: userEmail
        };
        axios.post('http://localhost:4000/sms', smsObject)
            .then((res) => {
                console.log(res)
            }).catch((error) => {
                console.log(error)
            });
            history.push('/profile')
        
    }

    const handleAddRowSubmit = e => {
        const newData = [...data]
        newData.push(newUser)
        setData(newData)
        console.log(data)
    }

    const set = name =>  {
        return ({ target: {value}}) => {
            setNewUser(newUser => ({...newUser, [name]: value}))
        }
    }

    return (
        <div style = {styleDiv}>
            <form style = {styleForm}>
                <h1>Sms campaign</h1>
                <label>
                    Campaign Name:
                    <input style = {styleInput}
                        name = "campaignName"
                        type = "text"
                        onChange={e => setCampaignName(e.target.value)}
                        value = {campaignName}
                        required
                    />
                </label>
                <label>
                    SMS Body:
                    <textarea rows="20" cols="70" onChange={e => setBody(e.target.value)}  value={body} />
                </label>
                    <p  style={pHelpStyle}>* Introduzca en esta caja de texto las constantes {fn}  y {ln} para sustituirlo por el nombre y apellidos de cada usuario respectivamente.</p>
                <button type = "button" style={styleButton} onClick={handleSubmit}>Add</button>
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
                        Telephone:
                        <input style = {styleAddInput}
                            name = "telephone"
                            type = "text"
                            defaultValue={newUser.Telephone}
                            onChange={set('Telephone')}
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

const pHelpStyle = {
    fontSize: '0.775em',  
    fontWeight: "bold"
    
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

const styleAddButton = {
    textAlign: 'center', 
    padding: '12px', 
    display: 'flex',
    margin: 'auto',
    border: '1px solid #ccc',
    marginTop: '6px', 
    color: '#000000',
    background:'#01FF70',
    borderRadius: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
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

export default AddSmsGroupCampaign;