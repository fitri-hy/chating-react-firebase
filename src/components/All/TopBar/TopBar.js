import React from 'react'
import LogoForm from "../../All/logo-form/LogoForm"
import Profile from "./profile/Profile"

import "./TopBar.css"

const TopBar = (props) => {
    return (
        <div id="top-bar" >
            <div className="top-bar-container" >
                <LogoForm />
                <Profile active={props.active} />
            </div>
        </div>
    )
}

export default TopBar
