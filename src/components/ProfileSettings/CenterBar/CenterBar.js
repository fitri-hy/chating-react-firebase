import React, {useState, useRef, useEffect} from 'react'
import "./CenterBar.css"
import pro_img from "../../../assets/pro-test.png"
import { rdb, sdb } from "../../../firebase"
import { useAuth } from '../../../context/AuthContext'
import InputForm from "../../Auth/FormContent/input-form/InputForm"
import { IoIosArrowDown } from "react-icons/io"
import { useNavigate } from 'react-router-dom'
import useFetchUserData from '../../../utils/getUser'
import { getDownloadURL, ref as rf, uploadString } from 'firebase/storage'
import { ref, update } from 'firebase/database'

const Centerbar = () => {

    const [choose, setChoose] = useState("")

    const {currentUser, updateEmail, updateUserPassword} = useAuth()
    
    const [user, setUser] = useState(null)
    useFetchUserData(currentUser.uid, setUser)

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [fileImg, setFileImg] = useState()
    const [filImg, setFilImg] = useState()
    const [emailRef, setEmailRef] = useState()
    const [passwordRef, setPasswordRef] = useState()
    const [passwordConfirmRef, setPasswordConfirmRef] = useState()
    // const passwordRef = useRef();

    const navigate = useNavigate();
    const [password_visibility, setPassword_visibility] = useState(false)
    const [password_visibility_con, setPassword_visibility_con] = useState(false)
    const [ps_type, setPs_type] = useState("password")
    const [ps_type_con, setPs_type_con] = useState("password")
  

    
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
    let settings_title="Profile Settings"

    useEffect(() =>{
           if(user) {
            setEmailRef(user.email)
            setFirstName(user.firstName)
            setLastName(user.lastName)}
    }, [user])

    /* Choose Settings Title */
    if(choose==="f_n") {
        settings_title="Display Name"
    }else if(choose==="em") {
        settings_title="Email"
    }else if(choose==="ps") {
        settings_title="Password"
    }else if(choose==="pr") {
        settings_title="Profile Picture"
    }

    /* Change Full Name */
    const changeFullName = () => {
        

        setChoose("")
    }


    /* Change Email */
    const changeEmail = (e) => {
       
        if(emailRef !== user.email) {
            updateEmail(emailRef).then(() => {
               
                setChoose("")
            }).catch((err) => {
                alert(err)
            })
        }else {
            alert("Same email !")
        }
        
        
        
        

    }

    /* Change Password */
    const changePassword = () => {
        if(passwordRef === passwordConfirmRef) {
            try {
             
            }catch(err) {
                alert(err)
            }
            setChoose("")
        }else {
            alert("Password is not confirm")
        }
    }

    /* Open Input File Handler */
    const handlerUploadImg = () => {
        
        const fileSelector = document.querySelector('.file_input_img');
        var clickEvent = new MouseEvent('click', {bubbles: true});
        fileSelector.dispatchEvent(clickEvent);        

    }

    /* Pick Image in Message */
    const handlerChangeInputImg = (e) => {
        let fileImg = e.target.files[0];
        if(fileImg) {
        const reader = new FileReader();
        reader.onload = function(){
            const result = reader.result;
            setFileImg(result)
        }
        reader.readAsDataURL(fileImg);
        }

        setFilImg(fileImg);

    }

    /* Update Profile Picture */
    const handleUpdatePicture = () => {
       

    }

    const handleSave = async() => {

        if(fileImg) {

            uploadString(rf(sdb, "users/" + currentUser.uid + "/profile-pic/" + "profile"), fileImg, "data_url").then((url) => {
                setTimeout(() => {
                  getDownloadURL(rf(sdb, "users/" + currentUser.uid + "/profile-pic/" + "profile")).then((url) => {
                    update(ref(rdb, "users/" + currentUser.uid), {
                      profilePic: url
                    })
                  })
                  navigate("/")
                }, 100)
              })

          }
          
          setFilImg(null)
          setFileImg(null)

          if(passwordRef) {
              if(passwordRef.length >= 6) {
                if(passwordRef === passwordConfirmRef) {
                    updateUserPassword(passwordRef)
                    navigate("/")
                }else {
                    alert("Password is not confirm")
                }
              }else {
                alert("Password must be at least 6 characters long")
              }
          }

          if(firstName.length > 1 && lastName.length > 1) {
            update(ref(rdb, "users/" + currentUser.uid), {
                firstName: firstName,
                lastName: lastName
            })
            navigate("/")
          }else {
            alert("First name and last name must be at least 2 characters long")
          }
  


    }

    return (
        <>
        
        {user && 
        
            <div id="center-bar" >
                <input type="file" className="file_input_img" accept="image/png, image/gif, image/jpeg" onChange={handlerChangeInputImg} />
                <div className="wrapper-center-bar" >
                    <div className="wrp-title" >
                        {choose!=="" &&
                        <span class="material-icons" onClick={() => setChoose("")}>arrow_back</span> }
                        <h2 className="setting-title" >{settings_title}</h2>
                    </div>

                        <div className="image-change" >
                            <img onClick={handlerUploadImg} alt="" className="add-picture" title="Click and choose new profile picture" src={fileImg ||user.profilePic || pro_img} />
                            <span className="material-icons plus-pr">add</span>
                        </div>
                    
                        <h3 className='email' >{user.email}</h3>

            
                        <div className="flex-inputs-set" >
                            <InputForm  input_name="First Name" input_type="text" input_icon="person" input_value={firstName} changeTarget={(e) => setFirstName(e.target.value)}/>
                            <InputForm  input_name="Last Name" input_type="text" input_icon="person" input_value={lastName} changeTarget={(e) => setLastName(e.target.value)}/>
                        </div>
            
                    
                        <div className="flex-inputs-set pas" >
                            <label>Change password</label>
                            <InputForm  input_name="Password" input_type={ps_type} input_icon="lock" input_visi="visi" changePS={changePS} password_visibility={password_visibility} input_value={passwordRef} changeTarget={(e) => {setPasswordRef(e.target.value)}}/>
                            <InputForm  input_name="Password Confrim" input_type={ps_type_con} input_icon="lock" input_visi="visi_con" changePS={changePS_con} password_visibility={password_visibility_con} input_value={passwordConfirmRef} changeTarget={(e) => {setPasswordConfirmRef(e.target.value)}}  />
                        </div>
            
                        <button onClick={handleSave} className="btn-change" >Save changes</button>
        
                </div>
            </div>
            
        
        }

        </>
    )
}

export default Centerbar
