import React from 'react';
import { Link } from 'react-router-dom';


function Header() {
    return (
        <header style={headerStyle}>
            <h1>PhishingSimulator</h1>
            <Link style={linkStyle} to="/"> Home </Link>| <Link style={linkStyle} to="/login"> Login </Link> | <Link style={linkStyle} to="/register"> Register </Link>| <Link style={linkStyle} to="/about"> About </Link> 
        </header>
    )
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}

const headerStyle = {
    background: '#111',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}

export default Header;