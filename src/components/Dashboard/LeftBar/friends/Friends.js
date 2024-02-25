import React, {useState, useEffect} from 'react'
import "./Friends.css"
import Friend from './friend/Friend'
import {useAuth} from "../../../../context/AuthContext"
import useFetchUserData from '../../../../utils/getUser'
import { ref, set, update } from 'firebase/database'
import useFetchUsers from '../../../../utils/getUsers'
import { useChat } from '../../../../context/ChatContext'
import { rdb } from '../../../../firebase'


const Friends = ({findFriend, onlineUsers, activeFriend, clickActiveFriend, friends, messagesDB}) => {

  /* Friends React States */
  
  /* Use Context */
  const { currentUser } = useAuth()
  const [users, setUsers] = useState()
  
  const {data} = useChat()

  useFetchUsers(setUsers)

  useEffect(() => {
    console.log(users)
  }, [findFriend])
  
 


    return (
        <div className="friends" >
         
          {/* If you have no friends */}
          {!data.user && findFriend.length < 2 && friends.length === 0 && 
            <p className="no-friends" >Anda tidak memiliki daftar teman di sini Cari seseorang untuk memulai percakapan</p>
          }
           
          {/* Searching */}
          {findFriend.length > 1 && users && users.filter(user => {
              return user.id !== currentUser.uid
          }).filter(user => {
              const fn = user.firstName;
              const ln = user.lastName;
              const fullName = fn +" "+ln
              const fullName_find = fullName.toLowerCase().includes(findFriend.toLowerCase())
              return fullName_find
          }).map(user => (
              <Friend users={users}  {...user} key={user.id} clickActiveFriend={clickActiveFriend} activeFriend={data.user}/>  
          ))}

          {/* Friends List */}
          {
            findFriend.length < 2 && friends.sort((a, b) => {
              return b.timestamp - a.timestamp
            }).map(user => (
              <Friend users={users} {...user} key={user.id}  clickActiveFriend={clickActiveFriend} activeFriend={data.user}/>
            ))
          }

         

  

        </div>
    )
}

export default Friends
