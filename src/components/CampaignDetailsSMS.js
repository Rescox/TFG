import React, {useState, useEffect} from "react"
import DataTable from 'react-data-table-component';
import Chart from "react-apexcharts";
import axios from 'axios'


function CampaignDetailsSMS(props) {
    const {campaign_id} = props.match.params;
    const [title, setTitle] = useState([])
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([])

    const getColumnsName = () => {
        let list = []
        for(let i of columns.slice(2)) {
            list.push(i.name)
        }
        
        return list
    }

    const getDataCount = (sState) => {
        
        let list = []
        for(let i of columns.slice(2)) {
            list[i.name] = 0
        }
        for(let i of data) {
            for(let j of Object.keys(list)) {
                if(i[j] === sState) {
                    list[j] = list[j] + 1
                }
            }
        }

        console.log(list)
        return Object.values(list)
    }

    const graphState = {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: getColumnsName()
          }
        },
        series: [
          {
            name: "series-1",
            data: getDataCount('Email Sent')
          }
        ]
    };

    const graphStateEmailOpened = {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: getColumnsName()
          }
        },
        series: [
          {
            name: "series-1",
            data: getDataCount('Clicked Link')
          }
        ]
    };
    
    const list = []
    const columnList = []
    

    //192.168.1.34:3333/api/campaigns/92?api_key=ea2c3b73d56626bcb7e50367e23b1d111966d722cc0ceb29c764df2c260488c3
    

    

    useEffect(() => { 
        
        let column1 = { 
            name: "Nombre",
            selector: "firstName",
            center: true,
            sortable: true,
        } 

        let column2 = {    
            name: "Apellido",
            selector: "lastName",
            center: true,
            sortable: true,  
        }

        let column3 = {    
            name: "State",
            selector: "state",
            center: true,
            sortable: true,
        }
        
        columnList.push(column1)
        columnList.push(column2)
        columnList.push(column3)
        const url = 'http://localhost:4000/sms/details/'+ campaign_id
        axios.get(url)
        .then((res) => {
            console.log(res);
            setTitle(res.data[0]['name'])
            for(let i in res.data[0]['group']) {
                const obj = {}
                obj['firstName'] = res.data[0]['group'][i]['First Name']
                obj['lastName'] = res.data[0]['group'][i]['Last Name']
                obj['telephone'] = res.data[0]['group'][i]['Telephone']
                obj['state'] = res.data[0]['group'][i]['SMS State']
                list.push(obj);
            }
            setTimeout(() => {
                setData(list)
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
            <div style={graphicBars}>
                <div style={graphicBarStyle1}>
                    <h2>Emails Sent but not open</h2>
                    <Chart
                        options={graphState.options}
                        series={graphState.series}
                        type="bar"
                        width="500"
                        center
                    />
                </div>
                <div style={graphicBarStyle2}>
                    <h2>Emails Opened and clicked on link</h2>
                    <Chart
                        options={graphStateEmailOpened.options}
                        series={graphStateEmailOpened.series}
                        type="bar"
                        width="500"
                        center
                    />
                </div>
            </div>
            
            
        </div> 
    )
}
const graphicBars = {
    display: 'flex',
    width: '100%'
}

const graphicBarStyle1 = {
    marginLeft: '15em',
    float: 'left',
    paddingRight: '10em'
}

const graphicBarStyle2 = {
    float: 'left',
    marginLeft: '15em',
    paddingRight: '10em'
}
export default CampaignDetailsSMS;