import React, {useState, useContext} from "react"
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import axios from 'axios'
import { UserContext } from "../context/UserContext";



function GroupCampaign() {
    const [columns, setColumns] = useState([])
    const [data, setData] = useState([])
    const [campaignName, setCampaignName] = useState([])
    const [launchDate, setLaunchDate] = useState([])
    const [endDate, setEndDate] = useState([])
    const { userEmail} = useContext(UserContext);   





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
            console.log(obj)
            if (Object.values(obj).filter(x => x).length > 0) {
              list.push(obj);
            }
          }
        }
     
        const columns = headers.map(c => ({
          name: c,
          selector: c,
        }));
        setData(list);
        setColumns(columns.slice(0,4));
      }

    const handleFileUpload = e => {
        
        const file = e.target.files[0]
        const reader = new FileReader();
        
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, {type: 'binary'});
            /*Get worksheet*/
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1});
            processData(data); 
        };
        reader.readAsBinaryString(file)
    }

    const handleSubmit = e => {
        console.log(data)
        const campaignObject = {
            campaignName: campaignName,
            launchDate: launchDate,
            endDate: endDate,
            group: data,
            state: "InProgress",
            creator: userEmail
        };
        axios.post('http://localhost:4000/campaign', campaignObject)
            .then((res) => {
                console.log(res)
            }).catch((error) => {
                console.log(error)
            });
    }

    return (
        <div style = {styleDiv}>
            <form style = {styleForm}>
                <h1>Suscripcion para el simulador de phishing</h1>
                <label>
                    Nombre de la campaña:
                    <input style = {styleInput}
                        name = "campaignName"
                        type = "text"
                        onChange={e => setCampaignName(e.target.value)}
                        value = {campaignName}
                    />
                </label>
                <label>
                    Fecha de inicio:
                    <input style = {styleInput}
                        name = "launchDate"
                        type = "date"
                        onChange={e => setLaunchDate(e.target.value)}
                        value = {launchDate}
                    />
                </label>
                <label>
                    Fecha de finalización:
                    <input style = {styleInput}
                        name = "finishDate"
                        type = "date"
                        onChange={e => setEndDate(e.target.value)}
                        value = {endDate}
                    />
                </label>
                <label> Archivo .csv con los datos de los usuarios
                    <input style = {styleInput} 
                        onChange={handleFileUpload}
                        type = "file"
                        accept = ".csv,.xlsx,.xls"
                    />
                </label>
                <button type = "button" style={styleButton} onClick={handleSubmit}>Submit</button>
                
            </form>
            <DataTable
                pagination
                highlightOnHover
                columns={columns}
                data={data}
            />
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
    
}
export default GroupCampaign;