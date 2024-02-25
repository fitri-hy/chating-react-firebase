
import React from 'react'
import "./FindInput.css"

const FindInput = (props) => {
    return (
        <div className="find-input" >
            
            <input type="text" placeholder={"Cari Teman"} onChange={props.changeFindFriend} value={props.findFriend} />  
        </div>
    )
}

export default FindInput
