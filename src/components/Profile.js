import React, { useContext, useState, useEffect} from "react";
import DataTable from 'react-data-table-component';
import axios from 'axios'
import { UserContext } from "../context/UserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Profile() {
    const { userEmail} = useContext(UserContext);   
    const [data, setData] = useState([])  
    const [dataSms, setDataSms] = useState([])  
    var history = useHistory()
    const columnsEmail = [ { 
            selector: "id",
            omit: true
        }, 
        { 
            name: "Nombre de la campaña",
            selector: "name",
            sortable: true,
        }, 
        {    
            name: "Fecha de inicio",
            selector: "date",
            sortable: true
        },
        {    
            name: "Numero de personas",
            selector: "number_of_people",
            sortable: true
        },
        {   cell:(row) => <button onClick={handleChange} id={row.id}>Detalles</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    const columnsSms = [ { 
        selector: "id",
        omit: true
    }, 
    { 
        name: "Nombre de la campaña",
        selector: "name",
        sortable: true,
    }, 
    {    
        name: "Numero de personas",
        selector: "number_of_people",
        sortable: true
    },
    {   cell:(row) => <button onClick={handleChange} id={row.id}>Detalles</button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    }
];
    
    const getValuesEmail = data =>{
        const list = []

        for (let i = 0; i < data.length; i++) {
            const obj = {}
            obj['id'] = data[i]['_id']
            obj['name'] = data[i]['name'];
            obj['date'] = data[i]['launchDate'];
            obj['number_of_people'] = data[i]['group'].length;
            list.push(obj)
        }
        
        setData(list)
    }

    const getValuesSms = data =>{
        const list = []

        for (let i = 0; i < data.length; i++) {
            const obj = {}
            obj['id'] = data[i]['_id']
            obj['name'] = data[i]['name'];
            obj['number_of_people'] = data[i]['group'].length;
            list.push(obj)
        }
        
        setDataSms(list)
    }

    useEffect(() => { 
        const urlEmail = 'http://localhost:4000/campaign/'+ userEmail
        const urlSms = 'http://localhost:4000/sms/'+ userEmail
        axios.get(urlEmail)
        .then((res) => {
            getValuesEmail(res.data)
        }).catch((error) => {
            console.log(error)
        })
        axios.get(urlSms)
        .then((res) => {
            getValuesSms(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    
    const handleChange = (state) => {
        history.push('/Profile/' + state.target.id);

        console.log('Selected Rows: ', state.target.id);
    };

    return (
        <div>
            <DataTable 
                pagination
                highlightOnHover 
                title="Campañas por email" 
                data={data}
                columns= {columnsEmail}  
                Clicked
                onRowSelected={handleChange}            
            />
            <DataTable 
                pagination
                highlightOnHover 
                title="Campañas por SMS" 
                data={dataSms}
                columns= {columnsSms}  
                Clicked
                onRowSelected={handleChange}            
            />
        </div>
    )
}


export default Profile;