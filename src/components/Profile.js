import React, { useContext, useState, useEffect} from "react";
import DataTable from 'react-data-table-component';
import axios from 'axios'
import { UserContext } from "../context/UserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import  DeleteIcon  from '@material-ui/icons/Delete';

//Componente encargadod e listar todas las campañas creadas, tanto por email como por SMS.
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
            name: "Campaign Name",
            selector: "name",
            responsive: true,
            center: true,
            sortable: true,
        }, 
        {    
            name: "Launch Date",
            selector: "date",
            responsive: true,
            center: true,
            sortable: true
        },
        {    
            name: "Number of People",
            selector: "number_of_people",
            center: true,
            responsive: true,
            sortable: true
        },
        {   
            cell:(row) => <button onClick={handleChange} id={row.id}>Detalles</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            responsive: true,
            button: true,
        },
        {   
            cell:(row) => <button onClick={handleDelete} id={row.id}><DeleteIcon/></button>,
            ignoreRowClick: true,
            allowOverflow: true,
            responsive: true,
            button: true,
        }
    ];

    const columnsSms = [ { 
        selector: "id",
        omit: true,
        
    }, 
    { 
        name: "Campaign Name",
        selector: "name",
        sortable: true,
        center: true,
        responsive: true

    }, 
    {    
        name: "Launch Date",
        selector: "date",
        responsive: true,
        center: true,
        sortable: true
    },
    {    
        name: "Number of People",
        selector: "number_of_people",
        sortable: true,
        center: true,
        responsive: true

    },
    {   cell:(row) => <button onClick={handleChangeSMS} id={row.id}>Detalles</button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        responsive: true
    },
    {   
        cell:(row) => <button onClick={handleDeleteSms} id={row.id}><DeleteIcon/></button>,
        ignoreRowClick: true,
        allowOverflow: true,
        responsive: true,
        button: true,
    }
];
    //Función encargada de obtener los valores de la campaña para mostrarlos en la tabla con las demás campañas por correo
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

    //Función encargada de obtener los valores de la campaña para mostrarlos en la tabla con las demás campañas por SMS
    const getValuesSms = data =>{
        const list = []
        for (let i = 0; i < data.length; i++) {
            const obj = {}
            obj['id'] = data[i]['_id']
            obj['name'] = data[i]['name'];
            obj['date'] = data[i]['launchDate'];
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
    
    //Función encargada de redireccionar a los usuarios en caso de que deseen ver los detalles de una nueva campaña
    const handleChange = (state) => {
        history.push('/Profile/' + state.target.id);

    };

    const handleChangeSMS = (state) => {
        history.push('/Profile/sms/' + state.target.id);

    };

    //Función encarga de borrar las campañas en caso de que el usuario así lo desee
    const handleDelete = (state) => {
        var filtered =data.filter(data => data.id !== state.currentTarget.id)
        setData(filtered)
        const URL = "http://localhost:4000/campaign/" + state.currentTarget.id
        axios.delete(URL)
        .then(res => { 
            console.log(res)

        }).catch((error) => {
            console.log(error)
        });
    };

    const handleDeleteSms = (state) => {
        var filtered =dataSms.filter(dataSms => dataSms.id !== state.currentTarget.id)
        setDataSms(filtered)
        const URL = "http://localhost:4000/sms/" + state.currentTarget.id
        axios.delete(URL)
        .then(res => { 
            console.log(res)

        }).catch((error) => {
            console.log(error)
        });
    };

    return (
        <div>
            <DataTable 
                pagination
                highlightOnHover 
                title="Campaigns with Email" 
                data={data}
                columns= {columnsEmail}  
                Clicked
                onRowSelected={handleChange}            
            />
            <DataTable 
                pagination
                highlightOnHover 
                title="Campaigns with SMS" 
                data={dataSms}
                columns= {columnsSms}  
                Clicked
                onRowSelected={handleChangeSMS}            
            />
        </div>
    )
}


export default Profile;