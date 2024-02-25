import React from 'react'
import {BsFillPersonFill} from "react-icons/bs"
import { MdEmail } from "react-icons/md"
import { BsFillShieldLockFill } from "react-icons/bs"
import { MdVisibility } from "react-icons/md"
import { AiFillEyeInvisible } from "react-icons/ai"
import "./InputForm.css"


const InputForm = ({input_name, input_icon, input_type, input_visi, changePS, password_visibility, input_value,changeTarget, emailAnimation, passwordAnimation }) => {
    return (
        <div className="input" >
           {input_icon === "person" && <BsFillPersonFill  color='#625ac0' fontSize={"18px"}  className="react-icon"  />}
           {input_icon === "email" && <MdEmail color='#625ac0' fontSize={"18px"} className={emailAnimation ? "icon_ani react-icon" : " "} />}
           {input_icon === "lock" && <BsFillShieldLockFill color='#625ac0' fontSize={"18px"} className={passwordAnimation ? "icon_ani react-icon" : " "} />}
           <input placeholder={input_name} type={input_type} onChange={changeTarget} value={input_value} required /> 
           {password_visibility ?  input_visi === "visi" && <MdVisibility  color='#625ac0' fontSize={"18px"}  className="visibility-password" onClick={changePS} /> : input_visi === "visi" && <AiFillEyeInvisible  color='#625ac0' fontSize={"18px"}  className="visibility-password" onClick={changePS} />}
           {password_visibility ?  input_visi === "visi_con" && <MdVisibility   color='#625ac0' fontSize={"18px"} className="visibility-password" onClick={changePS} /> : input_visi === "visi_con" && <AiFillEyeInvisible  color='#625ac0' fontSize={"18px"}  className="visibility-password" onClick={changePS} />}
        </div>
    )
}

export default InputForm
