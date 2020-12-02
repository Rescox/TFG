import React, { useContext, useState, useEffect} from "react";
import DataTable from 'react-data-table-component';
import axios from 'axios'
import { UserContext } from "../context/UserContext";

function Profile() {
    const { userEmail} = useContext(UserContext);   
    const [data, setData] = useState([])  
    const headings = [ 
        "Campaign Name",
        "Launch Date"
    ];
    
    const getValues = data =>{
        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
        }

    }


    console.log(data)
    useEffect(() => { 
        const url = 'http://localhost:4000/campaign/'+ userEmail
        axios.get(url)
        .then((res) => {
            console.log(res.data)
            getValues(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    

    return (
        <div>
            <DataTable title="Campañas" headings= {headings} data={data} />
        </div>
    )
}


export default Profile;