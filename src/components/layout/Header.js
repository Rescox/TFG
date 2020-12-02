import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";



function Header(props) {
    const {userName, isLoggedIn } = useContext(UserContext);
    
    

    if(isLoggedIn === 'notLoggedIn') { 
        return (
            <header style={headerStyle}>
                <h1>PhishingSimulator</h1>
                <Link style={linkStyle} to="/"> Home </Link>| <Link style={linkStyle} to="/login"> Login </Link> | <Link style={linkStyle} to="/register"> Register </Link>| <Link style={linkStyle} to="/about"> About </Link> 
            </header>
        )
    } else {
        return (
            <header style={headerStyle}>
                <h1>PhishingSimulator</h1>
        <Link style={linkStyle} to="/"> Home </Link>| <Link style={linkStyle} to="/about"> About </Link> | <Link to="/" onClick={props.handleLogout} style={linkStyle }>Logout</Link> | <Link to="/profile"  style={linkStyle }>Mi Perfil({userName})</Link>
            </header>
        )
    }
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}

const headerStyle = {
    background: '#111',
    color: '#fff',
    textAlign: 'center',
    padding: '5px'
}

export default Header;