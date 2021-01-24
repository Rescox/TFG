import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";



function Header(props) {
    const {userName, isLoggedIn } = useContext(UserContext);
    
    

    if(isLoggedIn === 'notLoggedIn') { 
        return (
            <header style={headerStyle}>
                <h1 style={headerStyleH1}>PhishingSimulator</h1>
                <div style={divLinkStyle}>
                    <Link style={linkStyle} to="/"> Home </Link> <Link style={linkStyle} to="/login"> Login </Link>  <Link style={linkStyle} to="/register"> Register </Link> <Link style={linkStyle} to="/about"> About </Link> 
                </div>
            </header>
        )
    } else {
        return (
            <header style={headerStyle}>
                <h1 style={headerStyleH1}>PhishingSimulator</h1>
                <div style={divLinkStyle}> 
                    <Link style={linkStyle} to="/"> Home </Link> <Link style={linkStyle} to="/about"> About </Link>  <Link to="/" onClick={props.handleLogout} style={linkStyle }>Logout</Link>  <Link to="/profile"  style={linkStyle }>My profile({userName})</Link>
                </div>
            </header>
        )
    }
}

const divLinkStyle = {
    textAlign: 'right',
    margin: 'auto'
}


const linkStyle = {
    color: '#7FDBFF',
    textDecoration: 'none',
    fontSize: 'large',
    marginRight: '30px'
}

const headerStyle = {
    background: '#001f3f',
    color: '#7FDBFF',
    textAlign: 'center',
    padding: '5px',
    display: 'flex',
    marginBottom: '50px'
}
const headerStyleH1 = {
    display: 'block',
    marginLeft: '30px',
    width: '50%'
}


export default Header;