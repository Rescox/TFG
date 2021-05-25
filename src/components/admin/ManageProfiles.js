import React, { useState, useEffect, useContext} from "react";
import DataTable from 'react-data-table-component';
import axios from 'axios'
import { UserContext } from "../../context/UserContext"
import  DeleteIcon  from '@material-ui/icons/Delete';

function ManageProfiles() {
    const [data, setData] = useState([])  
    const { userEmail} = useContext(UserContext);  
     

    const columnsEmail = [ { 
            selector: "id",
            omit: true
        }, 
        { 
            name: "Username",
            selector: "username",
            responsive: true,
            center: true,
            sortable: true,
        }, 
        {    
            name: "Email",
            selector: "email",
            responsive: true,
            center: true,
            sortable: true
        },
        {    
            name: "Status",
            selector: "status",
            center: true,
            responsive: true,
            sortable: true
        },
        {    
            name: "Number of campaigns created",
            selector: "nCampaigns",
            center: true,
            responsive: true,
            sortable: true
        },
        {   
            cell:(row) => <button onClick={handleDelete} id={row.id} value={row.email}><DeleteIcon/></button>,
            ignoreRowClick: true,
            allowOverflow: true,
            responsive: true,
            button: true,
        }
    ];
    
    async function getValuesUser(data){
        const list = []

        for (let i = 0; i < data.length; i++) {
            const obj = {}
            obj['id'] = data[i]['_id']
            obj['username'] = data[i]['name'];
            obj['email'] = data[i]['email'];
            obj['status'] = data[i]['status'];
            obj['nCampaigns'] = await getNumberOfCampaigns(data[i]['email']);
            if(data[i]['email'] !==  userEmail)
                list.push(obj);
        }
        setData(list);
    }

    async function getNumberOfCampaigns(userEmail) {
            return axios('http://localhost:4000/campaign/'+ userEmail).then(function (res) {
                return res.data.length;
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => { 
        const urlUser = 'http://localhost:4000/user/'
        axios.get(urlUser)
        .then((res) => {
            getValuesUser(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    const handleDelete = (state) => {
        var filtered =data.filter(data => data.id !== state.currentTarget.id)
        setData(filtered)
        console.log(state.currentTarget.value);

        const URLCampaignDelete = "http://localhost:4000/campaign/email/" + state.currentTarget.value
        axios.delete(URLCampaignDelete)
        .then(res => { 
            console.log(res)

        }).catch((error) => {
            console.log(error)
        });

        const URLUsers = "http://localhost:4000/user/" + state.currentTarget.id
        axios.delete(URLUsers)
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
                title="Registered Users" 
                data={data}
                columns= {columnsEmail}  
                onRowClicked={handleDelete}
                Clicked            
            />
        </div>
    )
}


export default ManageProfiles;