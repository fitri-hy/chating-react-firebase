import React, {useState} from 'react'
import "./StartChat.css"
import pro_test from "../../../../assets/pro-test.png"
import useFetchUserData from '../../../../utils/getUser'
import { useAuth } from '../../../../context/AuthContext'



const StartChat = (props) => {

    const [user, setUser] = useState(null)

    const { currentUser } = useAuth()

    useFetchUserData(currentUser.uid, setUser)

    return (
        <div id="start-chat" >
            <div className="start-chat-container" >
                <h2>{user?user.firstName + " " +user.lastName : null}</h2>
                <img alt="" src={user?user.profilePic:null} />
                <p>Cari seseorang untuk memulai percakapan. <br/> Klik, tulis, kirim pesan, dan dapatkan teman baru</p>
            </div>
        </div>
    )
}

export default StartChat
