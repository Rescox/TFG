import React, {useState, useContext, useEffect} from "react"
import DataTable from 'react-data-table-component';

import axios from 'axios'


function CampaignDetails(props) {
    const {campaign_id} = props.match.params;
    const [title, setTitle] = useState([])
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([])

    const list = []
    const columnList = []
    const getStatusCampaignDetails = (id) => {
        let template = {
            name: id.template.name,
            selector: id.template.name,
            sortable: true
        }
        
        columnList.push(template)
        
        
        for(let i of id.results) {
            const obj = list.find(x => x.email == i.email);
            obj[id.template.name] = i.status            
        }
    }

    //192.168.1.34:3333/api/campaigns/92?api_key=ea2c3b73d56626bcb7e50367e23b1d111966d722cc0ceb29c764df2c260488c3
    const getStatusCampaignURL = (id) => { 
        for (let value of id) {
            let url = "https://192.168.1.34:3333/api/campaigns/" + value + "?api_key=ea2c3b73d56626bcb7e50367e23b1d111966d722cc0ceb29c764df2c260488c3"; 
            axios.get(url)
            .then((res) => {
                getStatusCampaignDetails(res.data)
            }).catch((error) => {
                console.log(error)
            })
        }
    }


    useEffect(() => { 
        let column1 = { 
            name: "Nombre",
            selector: "firstName",
            sortable: true,
            
        } 

        let column2 = {    
            name: "Apellido",
            selector: "lastName",
            sortable: true,
            
            
        }
        
        columnList.push(column1)
        columnList.push(column2)
        const url = 'http://localhost:4000/campaign/details/'+ campaign_id
        axios.get(url)
        .then((res) => {
            setTitle(res.data[0]['name'])
            for(let i in res.data[0]['group']) {
                const obj = {}
                obj['firstName'] = res.data[0]['group'][i]['First Name']
                obj['lastName'] = res.data[0]['group'][i]['Last Name']
                obj['email'] = res.data[0]['group'][i]['Email']
                list.push(obj);
            }

            getStatusCampaignURL(res.data[0]['gophish_id'])
            setTimeout(() => {
                setData(list)
                console.log(columnList)
                setColumns(columnList)
              }, 1000);
            
        }).catch((error) => {
            console.log(error)
        })
    }, []);


    return(
        <div>
            <h1>{title}</h1>
            <DataTable 
                pagination
                columns= {columns}  
                data= {data}
                       
            />
        </div>
    )
}
export default CampaignDetails;