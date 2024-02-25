import React from 'react'
import "./EndForm.css"
import {Link} from "react-router-dom"
const EndForm = ({end_name_btn, end_question, btn_click, email, fN, lN, password}) => {

    


    return (
        <div className="form-flex-column-center" >
            <button 
            disabled={end_name_btn === "Login" && email === "" && password === ""? true : false || end_name_btn === "Create Account" && email === "" && password === "" && fN ==="" && lN === ""? true : false} 
            className="btn-form" onClick={btn_click} type="submit"  >{end_name_btn}</button>
            {end_question === "sign-in" && <p className="have-account" >Sudah punya akun ? <span className="form-link" ><Link to="/" >Masuk</Link></span></p>}
            {end_question === "sign-up" && <p className="have-account" >Tidak punya akun? <span className="form-link" ><Link to="/sign_up" >Daftar</Link></span></p>}   
            {end_question === "sign-up" && <p className="have-account" >Apakah Anda lupa kata sandi? <span><Link to="/forgot_password" >Atur Ulang</Link></span></p>}   
            <p className="form-rights" >© Messenger by Fistrba 2021. All rights reserved.</p>       
        </div>
    )
}

export default EndForm
