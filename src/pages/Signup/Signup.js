import React from 'react'
import "./Signup.css"
import AuthComponent from '../../components/Auth/AuthComponent';

const Signup = () => {
    return (
        <div id="sign-up" >
            <AuthComponent type={"signup"} />
        </div>
    )
}

export default Signup
