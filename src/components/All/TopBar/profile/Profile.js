import React, {useState, useEffect} from 'react'
import "./Profile.css"
import {useAuth} from "../../../../context/AuthContext"

import { rdb } from "../../../../firebase"
import img from "../../../../assets/pro-test.png"
import { useNavigate } from 'react-router-dom'
import useFetchUserData from '../../../../utils/getUser'
import { IoIosArrowDown } from "react-icons/io"




const Profile = (props) => {


    const {logout, currentUser} = useAuth()
    const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false)

    const [user, setUser] = useState()
    useFetchUserData(currentUser.uid, setUser)


    const [onlineUsers, setOnlineUsers] = useState([])

    const navigate = useNavigate()


    const logout_profile = async() => {
        try{    
           await logout()
        }catch(err) {
            console.log(err)
        }
    }

    const handleChangeLink = () => {
      if(props.active === "main-dashboard") {
        navigate("/settings")
      }  
      if(props.active === "profile-settings") {
         navigate("/")
      }  
    }


    return (
        <div id="profile" >
        <div className="profile" onClick={() => {setIsOpenProfileMenu(!isOpenProfileMenu)}} >
            <IoIosArrowDown color='#646464' className={isOpenProfileMenu ? "rotate-animation" : ""} />
            <img alt="" src={user?user.profilePic:null} />
        </div>
       {isOpenProfileMenu && <div className={"click-profile"} >
            <div className="my-profile" >
                <img alt="" src={user?user.profilePic:null} />
                <div>
                    <h3>{user?user.firstName:null} {user?user.lastName:null}</h3>
                    <p>{user?user.email:null}</p>
                </div>
            </div>
            <div className="my-settings profile-options" >
                {
                    props.active === "main-dashboard" && 
                    <div className="change-link" onClick={handleChangeLink} >
                        <div>
                            <span className="material-icons">settings</span>
                            <h4>Pengaturan</h4>
                        </div>
                         
                    </div>
                }
                {
                    props.active === "profile-settings" && 
                    <div className="change-link" onClick={handleChangeLink}  >
                        <div>
                            <span className="material-icons">home</span>
                            <h4>Beranda</h4>
                        </div>
                       
                    </div>
                }
            </div>
            <div className="my-logout profile-options" onClick={logout_profile}  >
                <div>
                    <span className="material-icons">logout</span>
                    <h4>Keluar</h4>
                </div>
                
            </div>
           <p className="profile-reserved" >HyTech @2024</p>
        </div>}
        </div>
    )
}

export default Profile
