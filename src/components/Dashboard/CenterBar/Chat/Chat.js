import React, {useState, useEffect} from 'react'
import "./Chat.css"
import pro_test from "../../../../assets/pro-test.png"

import Message from "./Message/Message"
import Picker from "emoji-picker-react";
import SettingsChat from './SettingsChat/SettingsChat'
import { rdb, sdb } from "../../../../firebase"
import { useAuth } from '../../../../context/AuthContext'
import moment from "moment"
import { AiOutlineMore } from "react-icons/ai";
import { BsEmojiSmileFill, BsFillImageFill } from "react-icons/bs";
import { AiFillFileAdd } from "react-icons/ai";
import { IoSend } from "react-icons/io5"; 
import { ref as rf, uploadString, getDownloadURL } from 'firebase/storage';
import { push, ref, onValue, remove, set, update } from 'firebase/database';
import { useChat } from '../../../../context/ChatContext';
import useFetchUsers from '../../../../utils/getUsers';
import useFetchUserData from '../../../../utils/getUser';

const Chat = (props) => {

    const [more, setMore] = useState(false)
    const [openSettingsChat, setOpenSettingsChat] = useState(false)
    const [openInfoChat, setOpenInfoChat] = useState(false)
    const [newName, setNewName] = useState()
    
    const { currentUser } = useAuth()
    const { data } = useChat()
    const [users, setUsers] = useState()
    useFetchUsers(setUsers)
    const [file, setFile] = useState(null)  
    const [fil, setFil] = useState(null)  
    const [fileImg, setFileImg] = useState(null)
    const [chatUser, setChatUser] = useState([])
    const [user, setUser] = useState(null)
    useFetchUserData(currentUser.uid, setUser)
    const [filImg, setFilImg] = useState(null)
    const [chatOptions, setChatOptions] = useState([])
    const [chatUserOptions, setChatUserOptions] = useState([])



    const handleOpenEmojis = () => {
        props.setOpenEmojis(!props.openEmojis)
    }

    
 /* Emoji Picker */
 const onEmojiClick = (event) => {
    props.setMessageInput(props.messageInput + event.emoji);
    console.log(event, event.emoji)
  };
  

    /* Push Enter */
    const keyDownHandler = (e) => {
        if(e.keyCode === 13) {
            onSend()
        }
    }
    
    const { dispatch } = useChat()

    /* New Name Chat Input */
    const handleChangeInputNewName = (e) => {
        setNewName(e.target.value)
    }
  
    useEffect(() => {
        if(openSettingsChat) {
            if(chatOptions.chatName) {
                setNewName(chatOptions.chatName) 
            }else {
                setNewName(user.firstName + " " + user.lastName) 
            }
        }    
    }, [openSettingsChat])
    
// GET CURRENT USER CHAT OPTIONS
useEffect(() => {
    const starCountRef = ref(rdb, `messages/${currentUser.uid + data.user}/options`);
    const onDataChange = (snapshot) => {
      const data = snapshot.val();
  
      if(data===null) {
        setChatOptions("no")
      }else{
        setChatOptions(data)
      } 
  
    };
  
    const unsubscribe = onValue(starCountRef, onDataChange);
  
    return () => {
      // Unsubscribe from the Firebase listener when the component unmounts
      unsubscribe();
    };
  }, [data.user])
  
  // GET ACTIVE USER CHAT OPTIONS
  useEffect(() => {
    const starCountRef = ref(rdb, `messages/${data.user + currentUser.uid}/options`);
    const onDataChange = (snapshot) => {
      const data = snapshot.val();
  
      if(data === null) {
        setChatUserOptions("no")
      }else{
        setChatUserOptions(data)
      } 
  
    };
  
    const unsubscribe = onValue(starCountRef, onDataChange);
  
    return () => {
      // Unsubscribe from the Firebase listener when the component unmounts
      unsubscribe();
    };
  }, [data.user])
  
  
  // GET ACTIVE USER INFO
  useEffect(() => {
    const starCountRef = ref(rdb, `users/${data.user}`);
    const onDataChange = (snapshot) => {
      const data = snapshot.val();
  
      if(data === null) {
        setChatUser("no")
      }else{
        setChatUser(data)
      } 
  
    };
  
    const unsubscribe = onValue(starCountRef, onDataChange);
  
    return () => {
      // Unsubscribe from the Firebase listener when the component unmounts
      unsubscribe();
    };
  }, [data.user])
  
    


    /* Open Input File Handler */
    const handlerUploadFiles = () => {
       
        const fileSelector = document.querySelector('.file_input');
        var clickEvent = new MouseEvent('click', {bubbles: true});
        fileSelector.dispatchEvent(clickEvent);        

    }

    const handlerUploadFilesImg = () => {
       
        const fileSelector = document.querySelector('.file_input_img');
        var clickEvent = new MouseEvent('click', {bubbles: true});
        fileSelector.dispatchEvent(clickEvent);        

    }

    const handleMore = (role) => {
        if(role==="toggle") {
            setMore(!more)
        }
        if(role==="shutdown") {
            setMore(false)
        }
    }

    useEffect(() => {
        handleMore("shutdown")
        setOpenSettingsChat(false)
    }, [props.clickActiveFriend])


    /* Open Settings Chat */
    const handleSettingsChat = () => {
        setOpenSettingsChat(true)
        handleMore("shutdown")
    }

    /* Open Info Chat */
    const handleInfoChat = () => {
        setOpenInfoChat(true)
        handleMore("shutdown")
    }


    /* Change Theme */
    const handleClickChangeTheme = (color) => {
        // setNewTheme(color)
        if(chatOptions.chatTheme !== color) {
            update(ref(rdb, 'messages/' + currentUser.uid + props.activeFriend + "/options/"), {
                chatTheme: color
            })
            update(ref(rdb, 'messages/' + props.activeFriend + currentUser.uid +  "/options/"), {
                chatTheme: color
            })

             const autoId =  push(ref(rdb, 'messages/' + currentUser.uid + props.activeFriend)).key
    
            
             set(ref(rdb, 'messages/' + currentUser.uid + props.activeFriend + "/" + autoId), {
                message: "Kamu" + " mengubah tema obrolan menjadi",
                timestamp: new Date().valueOf(),
                fromId: currentUser.uid,
                toId: props.activeFriend, 
                id: autoId,
                file:false,
                img: false,
                info: true,
                infoColor: color,
            })
             set(ref(rdb, 'messages/' + props.activeFriend + currentUser.uid + "/" + autoId), {
                message: chatUserOptions.chatName + " mengubah tema obrolan menjadi",
                timestamp: new Date().valueOf(),
                fromId: currentUser.uid,
                toId: props.activeFriend, 
                id: autoId,
                file:false,
                img: false,
                info: true,
                infoColor: color,
            })
    
    
             handleMore("shutdown")
             setOpenSettingsChat(false)
        }else{
            alert("Temanya sama, pilih yang lain atau tidak sama sekali")
        }

    }

    /* Change Chat Name */
    const handleClickChatName = (n) => {
        if(chatOptions.chatName !== n && n.length <= 30) {
            update(ref(rdb, 'messages/' + currentUser.uid + props.activeFriend + "/options"), {
                chatName: n
            })
               
            

            const autoId =  push(ref(rdb, 'messages/' + currentUser.uid + props.activeFriend)).key

            set(ref(rdb, 'messages/' + props.activeFriend + currentUser.uid + "/" + autoId), {           
                message: chatUserOptions.chatName  + " mengubah nama panggilanmu menjadi " + n,
                 timestamp: new Date().valueOf(),
                 fromId: currentUser.uid,
                 toId: props.activeFriend, 
                 id: autoId,
                 file:false,
                 img: false,
                 info: true,
                 infoColor: false,
            })
        

            set(ref(rdb, 'messages/' +  currentUser.uid + props.activeFriend + "/" + autoId), {          
                 message: "Kamu" + " mengubah " + chatUser.firstName + " menjadi " + n,
                 timestamp: new Date().valueOf(),
                 fromId: currentUser.uid,
                 toId: props.activeFriend, 
                 id: autoId,
                 file:false,
                 img: false,
                 info: true,
                 infoColor: false,
            })

            update(ref(rdb, "users/" + currentUser.uid + "/messages/" + props.activeFriend), {
                fromName: n,
            })

             handleMore("shutdown")
             setOpenSettingsChat(false)
        }
      
        if(n.length > 30) {
            alert("Nama terlalu banyak. (Hanya 30 huruf)." + "Kamu punya "+n.length+" surat")
        }


    } 

    /* Delete Chat */
    const handleClickDeleteChat = () => {
        remove(ref(rdb, 'messages/' + currentUser.uid + props.activeFriend))

       

        handleMore("shutdown")
        setOpenSettingsChat(false)

        props.setOpenChat(false)

    }

    

    /* handleCloseChat */
    const handleCloseChat = () => {
        dispatch({type: "CLOSE_USER"})

        document.getElementById("center-bar").style.display="none"

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
  
    if(fileImg && fileImg.size > 10000000) {
      alert("Gambar terlalu besar!")
      props.setMessageInput()
    }else if(fileImg && fileImg.size < 10000000 ) {
      props.setMessageInput(fileImg.name)
    }
  }


  
  

  /* Pick file */
  const handlerChangeInput = (e) => {
    let file = e.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = function(){
        const result = reader.result;
        setFile(result)
      }
      reader.readAsDataURL(file);
    }
  
    if(file && file.size > 25000000) {
      alert("Berkas terlalu besar!")
      props.setMessageInput()
    }else if(file && file.size < 25000000 ) {
      props.setMessageInput(file.name)
    }
  
    setFil(file);
  }
  
  


    const sendMessage = (fromId, toId, message, timestamp, saw) => {
            
        const autoId =  push(ref(rdb, 'messages/' + currentUser.uid + data.user)).key
      
        if(file) {
            set(ref(rdb, 'messages/' + data.user + currentUser.uid + "/" + autoId), {
              message: message,
              timestamp: timestamp,
              fromId: fromId,
              toId: toId, 
              id: autoId,
              file:true,
              img: false
            })
        } else {
            set(ref(rdb, 'messages/' + data.user + currentUser.uid + "/" + autoId), {
              message: message,
              timestamp: timestamp,
              fromId: fromId,
              toId: toId, 
              id: autoId,
              file:false,
              img: false
            })
          }
      
      
          if(file){
            set(ref(rdb, 'messages/' + currentUser.uid + data.user + "/" + autoId), {
              message: message,
              timestamp: timestamp,
              fromId: fromId,
              toId: toId, 
              id: autoId,
              file:true,
              img: false
            })
          }else {
            set(ref(rdb, 'messages/' + currentUser.uid + data.user + "/" + autoId), {
              message: message,
              timestamp: timestamp,
              fromId: fromId,
              toId: toId, 
              id: autoId,
              file:false,
              img: false
            })    
          }    
         
      
          set(ref(rdb, "users/" + fromId + "/messages/" + toId), {
            message: message,
            timestamp: timestamp,
            fromId: fromId,
            toId: toId, 
            id: toId, 
            fromName: users.filter(user => {return user.id === data.user}).map(user => { return user.firstName +" "+ user.lastName}),
          })
          set(ref(rdb, "users/" + toId + "/messages/" + fromId), {
            message: message,
            timestamp: timestamp,
            fromId: fromId,
            toId: toId, 
            id: fromId, 
            fromName: users.filter(user => {return user.id === currentUser.uid}).map(user => { return user.firstName +" "+ user.lastName}),
            saw: saw,
          })
      
          if(file) {
            uploadString(rf(sdb, "message-files/" + currentUser.uid + "/" + data.user + "/" + "files/" + autoId + "/" + props.messageInput), file, "data_url")
          } 
        
          if(fileImg) {
      
            uploadString(rf(sdb, "message-files/" + currentUser.uid + "/" + data.user + "/" + "images/" + autoId + "/" + props.messageInput), fileImg, "data_url").then((url) => {
              setTimeout(() => {
                getDownloadURL(rf(sdb, "message-files/" + currentUser.uid + "/" + data.user + "/" + "images/" + autoId + "/" + props.messageInput)).then((url) => {
                  set(ref(rdb, "messages/" + toId + fromId + "/" + autoId), {
                    message: message,
                    timestamp: timestamp,
                    fromId: fromId,
                    toId: toId, 
                    id: fromId,
                    file:false,
                    img: true,
                    imgUrl: url
                  })
                  set(ref(rdb, "messages/" + fromId + toId + "/" + autoId), {
                    message: message,
                    timestamp: timestamp,
                    fromId: fromId,
                    toId: toId, 
                    id: toId,
                    file:false,
                    img: true,
                    imgUrl: url,
                  })
                })
              }, 1000)
            })
          }
      
          if(chatOptions==="no"){
            set(ref(rdb, "users/" + currentUser.uid + "/messages/" + data.user), {
              message: message,
              timestamp: timestamp,
              fromId: fromId,
              toId: toId, 
              id: toId, 
              fromName: users.filter(user => {return user.id === data.user}).map(user => { return user.firstName +" "+ user.lastName}),
            })
            set(ref(rdb, "users/" + data.user + "/messages/" + currentUser.uid), {
              message: message,
              timestamp: timestamp,
              fromId: fromId,
              toId: toId, 
              id: fromId, 
              fromName: users.filter(user => {return user.id === currentUser.uid}).map(user => { return user.firstName +" "+ user.lastName}),
              saw: saw,
            })
      
          }else {
            set(ref(rdb, "users/" + currentUser.uid + "/messages/" + data.user), {
              message: message,
              timestamp: timestamp,
              fromId: fromId,
              toId: toId, 
              id: toId, 
              fromName: chatOptions.chatName ? {0:chatOptions.chatName} : {0: chatUser.firstName + " " + chatUser.lastName},
            })
            set(ref(rdb, "users/" + data.user + "/messages/" + currentUser.uid), {
              message: message,
              timestamp: timestamp,
              fromId: fromId,
              toId: toId, 
              id: fromId, 
              fromName:  chatUserOptions.chatName ? {0:chatUserOptions.chatName} : {0: user.firstName + " " + user.lastName},
              saw: saw,
            })
          }
             
             /* Send and null all input file hanlders */
             setFile(null)
             setFil(null)
             setFileImg(null)
             setFilImg(null)
      
      
             
              /* Chat Options */
          if(chatOptions==="no" && chatUserOptions==="no"){
            set(ref(rdb, "messages/" + currentUser.uid + data.user + "/options"), {
              chatTheme: "#625AC0",
              createdTime: new Date().valueOf()
            })
            set(ref(rdb, "messages/" + data.user + currentUser.uid + "/options"), {
              chatTheme: "#625AC0",
              createdTime: new Date().valueOf()
            })
          }
          
          if(chatOptions!=="no"){
            set(ref(rdb, "messages/" + currentUser.uid + data.user + "/options"), {
              chatName: chatOptions.chatName ? chatOptions.chatName : null ,
              chatTheme: chatOptions.chatTheme
            })
            set(ref(rdb, "messages/" + data.user + currentUser.uid + "/options"), {
              chatTheme: chatOptions.chatTheme,
              chatName: chatUserOptions.chatName ? chatUserOptions.chatName : null,             
            })
          }
          

          if(chatOptions==="no" && chatUserOptions !== "no"){
            set(ref(rdb, "messages/" + currentUser.uid + data.user + "/options"), {
              chatTheme: chatUserOptions.chatTheme,
            })
            set(ref(rdb, "messages/" + data.user + currentUser.uid + "/options"), {
              chatTheme: chatUserOptions.chatTheme,
                chatName: chatUserOptions.chatName ? chatUserOptions.chatName : null,    
            })
          }       
      
      }
      
        
      /* On Send */
        const onSend = () => {
          try{
              if(props.messageInput.length > 0) {
                sendMessage(currentUser.uid, data.user, props.messageInput , new Date().valueOf(), false)
                props.setMessageInput("")
                props.setOpenEmojis(false)
              const message_ele = document.querySelector("#message:nth-last-child(1)")
              const message_ele_img = document.querySelector("#message-img:nth-last-child(1)")
              if(message_ele) {
                setTimeout(() => {
                  message_ele.scrollIntoView();
                }, 10)
              }
              if(message_ele_img) {
                setTimeout(() => {
                  message_ele_img.scrollIntoView();
                }, 10)
              }
            }
             
          }catch(err) {
            console.log(err)  
          }
      }
      
    

    return (

      <>

      {

        <div id="chat" >
            { more && 
            <div className="more-chat" >
              <div onClick={handleSettingsChat} className="content-more-chat" >
                  <span className="material-icons">settings</span>
                  <h4>Settings</h4>
              </div>
              <div onClick={handleInfoChat} className="content-more-chat" >
                  <span className="material-icons">info</span>
                  <h4>Information</h4>
              </div>
            </div>
            }
            <div className="top-chat-content" > 
               { !openSettingsChat && !openInfoChat &&  <>
                 { data.user  &&
                 <div className="left-top-chat-content" >
                     <div className="back-to-friend"  onClick={() => handleCloseChat()} >
                        <span className="material-icons">arrow_back</span>
                     </div>
                    <div  className="profile-chat"  >
                        <img alt="" src={chatUser.profilePic} />
                        <h3>{chatOptions.chatName || `${chatUser?chatUser.firstName : null} ${chatUser?chatUser.lastName:null}`}</h3>
                    </div>
                </div> }
            {props.messages.length > 0 && <AiOutlineMore className='toggle_more'  onClick={() => {handleMore("toggle")}} />}</>}
                {openSettingsChat && <>
                    
                    <div className="back-from-settings" onClick={() => {setOpenSettingsChat(false)}} >
                         <span className="material-icons">arrow_back</span>
                         <h4>Settings</h4>
                    </div>
                    
                </>}
                {openInfoChat && <>
                    
                    <div className="back-from-settings" onClick={() => {setOpenInfoChat(false)}} >
                         <span className="material-icons">arrow_back</span>
                         <h4>Information</h4>
                    </div>
                    
                </>}
            </div>
            {props.messages.length > 0 && !openSettingsChat && !openInfoChat && 
            <div onClick={() => {handleMore("shutdown")}} className="center-chat-content" >
                <div className="chat-messages-container" >
                   
                    {props.messages.map((message) => (
                        <Message chatOptions={chatOptions} key={message.id} {...message}  activeFriend={data.user} messages={props.messages}/>
                    ))}
                </div>
                { props.openEmojis &&  <div className="emoji-x" >

             <Picker onEmojiClick={onEmojiClick} disableSkinTonePicker={true} />
            </div> }
            </div>
            }
           
            {props.messages.length === 0 && !openInfoChat && props.activeFriend && 
            <div className="center-chat-content-no-messages" >
                <div className="chat-messages-container" >
                    <img alt="" style={{width: "150px", height:"150px"}} src={chatUser.profilePic} />
                    <h3 style={{textAlign: "center"}} >{chatUser.firstName}{" "}{chatUser.lastName}</h3> 
                </div>
            </div>}
         
            {!openSettingsChat && !openInfoChat && <div className="bottom-chat-content" >
                <input type="file" className="file_input" onChange={handlerChangeInput} />
                <input type="file" className="file_input_img" accept="image/png, image/gif, image/jpeg" onChange={handlerChangeInputImg} />
                <div onClick={() => {handleMore("shutdown")}} id="bottom-bar-chat" >
                    <div className="chat-input" >
                        <input type="text" placeholder="Write a message..." value={props.messageInput} onChange={props.changeMessageInput} onKeyUp={keyDownHandler}/>
                        {
                          props.messages.length > 0   &&
                        <div className="input-interactive" >
                         <AiFillFileAdd className='ii' onClick={handlerUploadFiles} style={{fill: chatUserOptions.chatTheme || "#625AC0", marginRight: "10px"}} />
                         <BsFillImageFill className='ii' onClick={handlerUploadFilesImg} style={{fill: chatUserOptions.chatTheme || "#625AC0" , marginRight: "10px"}} />
                         <BsEmojiSmileFill className='ii' onClick={handleOpenEmojis}  style={{fill: chatUserOptions.chatTheme || "#625AC0", marginRight: "10px"}}/>
                        </div>
                        }
                    </div>
                    <div className="send" >
                        <IoSend  onClick={onSend} style={{fill: chatUserOptions.chatTheme || "#625AC0"}} />
                    </div>
                </div>
            </div>}
            {openSettingsChat && <SettingsChat setDeleteChat={props.setDeleteChat} setChangeTheme={props.setChangeTheme} setChangeName={props.setChangeName} handleClickDeleteChat={handleClickDeleteChat} handleClickChatName={handleClickChatName} newName={newName} handleChangeInputNewName={handleChangeInputNewName} handleClickChangeTheme={handleClickChangeTheme} chatOptions={chatOptions} />}
            {openInfoChat && <div className="info-chat" >
               <h4>{null}</h4>
               <p>Nickname: {chatOptions.chatName ? chatOptions.chatName : chatUser.firstName + " " + chatUser.lastName}</p>
               <p>Name: {chatUser.firstName + " " + chatUser.lastName}</p>
               <p>Email: {chatUser.email}</p>
               <img style={{width: "50px", height: "50px", marginTop: "20px", borderRadius: "10px"}} src={chatUser.profilePic} ></img>
               <p>Created: <em>{moment(chatUserOptions.createdTime).format('L')}</em></p>
               <div className="info-theme" >
                   <p>Chat Theme </p>
                   <div style={{background: chatUserOptions.chatTheme}} ></div>
               </div>
            </div>}
        </div>



      


      }
      </>
    )
}

export default Chat
