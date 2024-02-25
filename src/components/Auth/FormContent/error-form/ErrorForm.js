import React from 'react'
import "./ErrorForm.css"

const ErrorForm = ({error_form}) => {
    return (
        <div id="error-form" >
            <p>{error_form}</p>
        </div>
    )
}

export default ErrorForm
