import React from 'react'
import "./ChangeChats.css"
import {Link} from "react-router-dom"

const ChangeChats = ({active}) => {
    return (
        <div className="change-chats" >
            <Link to="/" className={active === "Chats" ? "active" : ""} >Obrolan</Link>
            <Link to="/groups" className={active === "Groups" ? "active" : ""} >Grup</Link>
        </div>
    )
}

export default ChangeChats
