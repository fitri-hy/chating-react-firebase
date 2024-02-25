import React, { useState} from 'react'
import "./Form.css"
import InputForm from './input-form/InputForm';
import EndForm from './end-form/EndForm';
import StartForm from './start-form/StartForm';

const Form = (props) => {



  const [password_visibility, setPassword_visibility] = useState(false)
  const [password_visibility_con, setPassword_visibility_con] = useState(false)
  const [ps_type, setPs_type] = useState("password")
  const [ps_type_con, setPs_type_con] = useState("password")

  const startNameTitle = props.start_name_title
  
  const changePS = () => {
    if(!password_visibility) {
      setPs_type("text")
      setPassword_visibility(true)
    } else {
      setPs_type("password")
      setPassword_visibility(false)
    }
  }
  const changePS_con = () => {     
    if(!password_visibility_con) {
      setPs_type_con("text")
      setPassword_visibility_con(true)
    } else {
      setPs_type_con("password")
      setPassword_visibility_con(false)
    }
  }

  

    return (
        <form id="form" >
           <div className="form-wrapper" >
             <div className="form-container" >
                <StartForm start_name_title={startNameTitle} error_form={props.error_form} />
                <div className="inputs" >
                    {props.firstlast &&
                    <div className="flex-inputs" >
                        <InputForm  input_name="Nama Depan" input_type="text" input_icon="person" input_value={props.firstName} changeTarget={props.changeTargets.firstName}/>
                        <InputForm  input_name="Nama Belakang" input_type="text" input_icon="person" input_value={props.lastName} changeTarget={props.changeTargets.lastName}/>
                    </div> }
                    {props.emailInput && <InputForm  input_name="Email" input_type="text" input_icon="email" input_value={props.email} changeTarget={props.changeTargets.email} emailAnimation={props.emailAnimation} /> }   
                    {props.passwordInput && <InputForm  input_name="Kata Sandi" input_type={ps_type} input_icon="lock" input_visi="visi" changePS={changePS} password_visibility={password_visibility} input_value={props.password} changeTarget={props.changeTargets.password} passwordAnimation={props.passwordAnimation}   />}   
                    {props.password_confirm && <InputForm  input_name="Konfimasi Kata Sandi" input_type={ps_type_con} input_icon="lock" input_visi="visi_con" changePS={changePS_con} password_visibility={password_visibility_con} input_value={props.passwordConfirm} changeTarget={props.changeTargets.passwordConfirm}  passwordAnimation={props.passwordAnimation} />}   
                </div>
                <EndForm email={props.email} fN={props.firstName} lN={props.lastName} password={props.password} end_name_btn={props.end_name_btn} end_question={props.end_question} btn_click={props.btn_click}  />
             </div>          
           </div>
        </form>
    )
}

export default Form
