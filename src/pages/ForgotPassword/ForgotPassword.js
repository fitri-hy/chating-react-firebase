import React from 'react'
import "./ForgotPassword.css"
import AuthComponent from '../../components/Auth/AuthComponent';

const ForgotPassword = () => {
    return (
        <div id="forgot-password" >
            <AuthComponent type={"forgot"} />
        </div>
    )
}

export default ForgotPassword
