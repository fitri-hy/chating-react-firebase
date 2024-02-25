import React, {useState,useEffect } from 'react'
import "./CenterBar.css"
import StartChat from './StartChat/StartChat'
import Chat from './Chat/Chat'
import {rdb} from "../../../firebase"
import { useChat } from '../../../context/ChatContext'
import { onValue, ref } from 'firebase/database'

const CenterBar = (props) => {

    const [chatUser, setChatUser] = useState([])

    const {data} = useChat()

    useEffect(() => {
      const starCountRef = ref(rdb, `users/${data.user}/`);
      const onDataChange = (snapshot) => {
        const data = snapshot.val();
        setChatUser(data);
      };
      
      const unsubscribe = onValue(starCountRef, onDataChange);
      
      return () => {
        // Unsubscribe from the Firebase listener when the component unmounts
        unsubscribe();
      };
    }, [data.user])
   
    

    return (
        <div id="center-bar" >
            { !props.openChat && <StartChat currentUserInfo={props.currentUserInfo}/> }
            {  props.openChat && props.activeFriend && chatUser &&
                <Chat  
                  onSend={props.onSend} 
                  user={chatUser} 
                  messageInput={props.messageInput}
                  changeMessageInput={props.changeMessageInput}
                  handlerChangeInputImg={props.handlerChangeInputImg}
                  handlerChangeInput={props.handlerChangeInput}
                  activeFriend={data.user}
                  activeGroup={props.activeGroup}
                  onEmojiClick={props.onEmojiClick}
                  openEmojis={props.openEmojis}
                  handleOpenEmojis={props.handleOpenEmojis} 
                  clickActiveFriend={props.clickActiveFriend}
                  chatOptions={props.chatOptions}
                  chatUserOptions={props.chatUserOptions}
                  setOpenChat={props.setOpenChat}
                  setChangeTheme={props.setChangeTheme}
                  setChangeName={props.setChangeName} 
                  setDeleteChat={props.setDeleteChat}
                  setOpenEmojis={props.setOpenEmojis}
                  setMessageInput={props.setMessageInput}
                  messages={props.messages}
                  setActiveFriend={props.setActiveFriend}
                  onlineUsers={props.onlineUsers}
                  /> 
            }
        </div>
    )
}

export default CenterBar
