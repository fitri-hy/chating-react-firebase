import React from 'react'
import logo from "../../../assets/chat.webp"
import "./LogoForm.css"

const LogoForm = () => {
    return (
        <div className="logo" >
            <img src={logo} className="logo-img" alt="logo" />
            <h3 className="logo-text" >HyChat - React</h3>  
        </div>
    )
}

export default LogoForm
