import React from 'react'
import logo_wh from "../../../../assets/chat.webp"
import "./StartForm.css"
import ErrorForm from "../error-form/ErrorForm"

const StartForm = ({start_name_title, error_form}) => {
    return (
        <>
          <img src={logo_wh} alt="logo" className="form-logo" />
            <div className="title" >
                <h3>{start_name_title}</h3>
            </div> 
            {<ErrorForm error_form={error_form} />}  
        </>
    )
}

export default StartForm
