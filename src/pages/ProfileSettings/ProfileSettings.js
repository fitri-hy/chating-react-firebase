import React from 'react'
import TopBar from '../../components/All/TopBar/TopBar'
import "./ProfileSettings.css"
import CenterBar from "../../components/ProfileSettings/CenterBar/CenterBar"

const ProfileSettings = () => {
    return (
        <div id="profile-settings" >
            <TopBar active={"profile-settings"} />
            <div className="dashboard-component-container" >
                <div className="dashboard-component-wrapper" >
                    <CenterBar />
                </div>
            </div>
        </div>
    )
}

export default ProfileSettings
