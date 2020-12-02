import React, { useContext} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../context/UserContext";

function UserInfo() {
    const { userName} = useContext(UserContext);   
    const {isLoggedIn} = useContext(UserContext);
    var history = useHistory()
    console.log(isLoggedIn)
    if(isLoggedIn === "isLoggedIn") { 
        return (
            <div>
                <div style={styleButtonGroup} className="buttonGroup">
                    <p>Usted está logueado como {userName}</p>
                    <button style={styleButton} onClick= {() => {history.push('/groupCampaign')}}>Campaña en grupo</button>
                    <button style={styleButton}>Campaña individual</button>
                </div>   
            </div>
        )
    } else {
        return (
            <div>
                <p>Cree una cuenta o realice el login para continuar</p>
            </div>
        )
    }
}
const styleButtonGroup = {
    
    display: 'inline-block',
    margin: 'auto',
    textAlign: 'left',
    width: '45%',
    padding: '10px',
    verticalAlign: 'top'
}

const styleButton = {
    width: '100%', 
    padding: '12px', 
    border: '1px solid #ccc',
    marginTop: '6px', 
}
export default UserInfo;