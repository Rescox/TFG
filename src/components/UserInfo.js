import React, { useContext} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../context/UserContext";

function UserInfo() {
    const {isLoggedIn, status} = useContext(UserContext);
    var history = useHistory()
    console.log(isLoggedIn)
    if(isLoggedIn === "isLoggedIn") { 
        if(status === "Active") { 
            return (
                <div>
                    <h2>Phishing by Email</h2>
                    <div style={styleButtonGroup} className="buttonGroup">
                        <button style={styleButton} onClick= {() => {history.push('/groupCampaign')}}>Group Campaign</button>
                        <button style={styleButton} onClick= {() => {history.push('/individualCampaign')}}>Individual Campaign</button>
                        <button style={styleButton} onClick= {() => {history.push('/template')}}>Add templates</button>
                    </div>
                    <h2>Phishing by SMS</h2>
                    <div style={styleButtonGroup} className="buttonGroup">
                        <button style={styleButton} onClick= {() => {history.push('/SmsGroupCampaign')}}>Send SMS</button>
                    </div>     
                </div>
            )
        } else {
            return (
                <div>
                    <p>
                        Acepte el correo de confirmación para proceder.
                    </p>
                </div>
            )
        }
    } else {
        return (
            <div>
                <p>Create an account or Login</p>
            </div>
        )
    }
}
const styleButtonGroup = {
    
    display: 'inline-block',
    margin: 'auto',
    textAlign: 'left',
    padding: '10px',
    verticalAlign: 'top',
    width: '33%'
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

export default UserInfo;