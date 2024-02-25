import React, {useEffect, useState} from 'react'
import "./Friend.css"
import img from "../../../../../assets/pro-test.png"
import { useAuth } from '../../../../../context/AuthContext'
import { onValue, ref, update } from 'firebase/database'
import { rdb } from '../../../../../firebase'
import { useChat } from '../../../../../context/ChatContext'
import useFetchUsers from '../../../../../utils/getUsers'

const Friend = ({users, firstName, lastName, id, activeFriend, message, fromName, fromId, saw, clickActiveFriend }) => {



const { currentUser } = useAuth()

const { data} = useChat()


let str_message = "";
let str_name="";
if(message) {
   str_message = message
}
if(fromName) {
   str_name = fromName
}
if(!fromName) {
   str_name = firstName + " " + lastName
}

const [friend, setFriend] = useState()

const [loading, setLoading] = useState(true)

useEffect(() => {
   if(users) {
      users.filter((f) => {
        return f.id === id
      }).map((f) => {
        setFriend(f)
      })
   }
}, [loading, users])



useEffect(() => {
 if(friend) {
   if(data.user === friend.id){
       update(ref(rdb, "users/" + currentUser.uid + "/messages/" + data.user), {
         saw: true, 
         sawTime: new Date().valueOf(),
       })
       update(ref(rdb, "users/" + data.user + "/messages/" + currentUser.uid), {
         saw: true, 
         sawTime: new Date().valueOf()
       })
   }
 }
}, [data.user])

 


    return (
      <>
      
      { friend &&
        <div className={data.user === id ? "friend active-friend" : "friend"} onClick={() =>clickActiveFriend(id)} >
           <div className="image-section" >
              <img alt="" src={friend?friend.profilePic:null} />                 
           </div>
           <div className="name-message" >
               <div className="name-friend" >
                    <h3>{str_name.length > 18 ? `${str_name.substring(0,18) + "..."}` : str_name}</h3> 
               </div>
               <p className={fromId === currentUser.uid ? "lastMessage" : saw ? "lastMessage" : "bold-text lastMessage"} >{fromId === currentUser.uid ? str_message.length > 13 ? "Kamu: "+str_message.substring(0,13) + "......" : "Kamu: "+str_message: str_message.length > 13 ? str_message.substring(0,13) + "......" : str_message }</p>
           </div>
           { 
              saw===false && <div className="new-message" ></div>
           }
        </div> }
      </>
    )
}

export default Friend
