import React, { useState, useEffect } from 'react'
import useFetchUserData from '../../utils/getUser'
import { useAuth } from '../../context/AuthContext'
import useFetchUsers from '../../utils/getUsers'
import { useChat } from '../../context/ChatContext'
import { rdb, sdb } from '../../firebase'
import { onValue, push, ref, remove, set, update } from 'firebase/database'
import { ref as rf, uploadString } from 'firebase/storage'
import useFetchUserFriends from '../../utils/getFriends'
import TopBar from "../../components/All/TopBar/TopBar"
import LeftBar from "../../components/Dashboard/LeftBar/LeftBar"
import CenterBar from "../../components/Dashboard/CenterBar/CenterBar"
import "./Dashboard.css"
import { getDownloadURL, uploadBytes } from 'firebase/storage'
import {IoCloseSharp} from "react-icons/io5"
import colorsTheme from '../../colorsTheme'
import Loading from '../../components/All/Loading/Loading'


const Dashboard = () => {

  const [openChat, setOpenChat] = useState(false)
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [newFriendLoading, setNewFriendLoading] = useState(false)
  const [friends, setFriends] = useState([])
  const [findFriend, setFindFriend] = useState("")
  const [messageInput, setMessageInput] = useState("")
  const [openEmojis, setOpenEmojis] = useState(false)
  const [changeTheme, setChangeTheme] = useState(false)
  const [changeName, setChangeName] = useState(false)
  const [deleteChat, setDeleteChat] = useState(false)
  const [chatUser, setChatUser] = useState([])
  const [chatOptions, setChatOptions] = useState([])
  const [chatUserOptions, setChatUserOptions] = useState([])
  const [newName, setNewName] = useState()



 /* Change Inputs */
 const changeFindFriend = (e) => {
  setFindFriend(e.target.value)
}


const { data, dispatch } = useChat()


  const {currentUser} = useAuth()
 

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch({type: "CLOSE_USER"})
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])
  

  //FETCH DATA by utils
  useFetchUserData(currentUser.uid, setUser)
  useFetchUsers(setUsers)
  useFetchUserFriends(currentUser.uid, setFriends)


  /* Click on friend - active */  
  const clickActiveFriend = (id) => {
    dispatch({type: "CHANGE_USER", payload: id})
    setOpenChat(true)
    if(id) {
      document.getElementById("center-bar").style.display="block"
      setOpenChat(true)
      setOpenEmojis(false)
      setMessageInput("")
      setFindFriend("")
    }else {
        setOpenChat(false)
    }
  }



  const changeMessageInput = (e) => {
    setMessageInput(e.target.value)
  }



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

  

//------------------------//
//USE EFFECTS//

// GET MESSAGES
useEffect(() => {
  const starCountRef = ref(rdb, `messages/${currentUser.uid + data.user}`);
  const onDataChange = (snapshot) => {
    const data = snapshot.val();

    let array = []
    for(let i in data) {
      array.push(data[i])
    }

    setMessages(array);
   
  };

  const unsubscribe = onValue(starCountRef, onDataChange);



  return () => {
    // Unsubscribe from the Firebase listener when the component unmounts
    unsubscribe();
  };
}, [data.user])


 /* Change Chat Name */
 const handleClickChatName = (n) => {
  if(chatOptions.chatName !== n && n.length <= 30 && n.length != 0) {
      update(ref(rdb, 'messages/' + currentUser.uid + data.user + "/options"), {
          chatName: n
      })
         
      

      const autoId =  push(ref(rdb, 'messages/' + currentUser.uid + data.user)).key

      set(ref(rdb, 'messages/' + data.user + currentUser.uid + "/" + autoId), {           
           message: chatUserOptions.chatName ? chatUserOptions.chatName  + " changed your nick name to " + n : user.firstName + " changed your nick name to " + n,
           timestamp: new Date().valueOf(),
           fromId: currentUser.uid,
           toId: data.user, 
           id: autoId,
           file:false,
           img: false,
           info: true,
           infoColor: false,
      })
  

      set(ref(rdb, 'messages/' +  currentUser.uid + data.user + "/" + autoId), {          
           message: "You" + " changed " + chatUser.firstName + "'s nick name to " + n,
           timestamp: new Date().valueOf(),
           fromId: currentUser.uid,
           toId: data.user, 
           id: autoId,
           file:false,
           img: false,
           info: true,
           infoColor: false,
      })

      update(ref(rdb, "users/" + currentUser.uid + "/messages/" + data.user), {
          fromName: n,
      })

      setChangeName(false)
   
  }

  if(n.length > 30) {
      alert("Name too large. (Only 30 letters)." + "You have "+n.length+" letters")
  }
  if(n.length === 0) {
    alert("Name cannot be empty.")
  }


} 


 /* New Name Chat Input */
 const handleChangeInputNewName = (e) => {
  setNewName(e.target.value)
}

  useEffect(() =>{
    if(changeName) {
      if(chatOptions.chatName) {
        setNewName(chatOptions.chatName) 
    }else {
        setNewName(chatUser.firstName + " " + chatUser.lastName) 
    }
    }
  }, [changeName])


   /* Change Theme */
   const handleClickChangeTheme = (color) => {
    // setNewTheme(color)
    if(chatOptions.chatTheme !== color) {
        update(ref(rdb, 'messages/' + currentUser.uid +data.user + "/options/"), {
            chatTheme: color
        })
        update(ref(rdb, 'messages/' +data.user + currentUser.uid +  "/options/"), {
            chatTheme: color
        })

         const autoId =  push(ref(rdb, 'messages/' + currentUser.uid +data.user)).key

        
         set(ref(rdb, 'messages/' + currentUser.uid +data.user + "/" + autoId), {
            message: "You" + " changed chat theme to",
            timestamp: new Date().valueOf(),
            fromId: currentUser.uid,
            toId:data.user, 
            id: autoId,
            file:false,
            img: false,
            info: true,
            infoColor: color,
        })
         set(ref(rdb, 'messages/' +data.user + currentUser.uid + "/" + autoId), {
            message: chatUserOptions.chatName ? chatUserOptions.chatName + " changed chat theme to" : user.firstName + " changed chat theme to",
            timestamp: new Date().valueOf(),
            fromId: currentUser.uid,
            toId:data.user, 
            id: autoId,
            file:false,
            img: false,
            info: true,
            infoColor: color,
        })

        setChangeTheme(false)

    }else{
        alert("It is the same theme, choose another or no one")
    }

}


    /* Delete Chat */
    const handleClickDeleteChat = () => {
      remove(ref(rdb, 'messages/' + currentUser.uid + data.user))
      remove(ref(rdb, 'users/' + currentUser.uid + "/messages/" + data.user))

      setOpenChat(false)
      setDeleteChat(false)

      dispatch({type: "CLOSE_USER"})

  }



  return (
    <>
   {!loading &&
    <div className="dashboard-component" >
        <TopBar active={"main-dashboard"} />
        <div className="dashboard-component-container" >
               <div className="dashboard-component-wrapper" >
                <LeftBar 
                    findFriend={findFriend}
                    friends={friends} 
                    users={users}
                    activeFriend={data.user} 
                    clickActiveFriend={clickActiveFriend} 
                    newFriendLoading={newFriendLoading}
                    changeFindFriend={changeFindFriend}                    
                />
                <CenterBar 
                    messages={messages} 
                    activeFriend={data.user}               
                    clickActiveFriend={clickActiveFriend}
                    setOpenChat={setOpenChat}    
                    messageInput={messageInput}
                    openChat={openChat}
                    setChangeTheme={setChangeTheme}
                    setChangeName={setChangeName} 
                    setDeleteChat={setDeleteChat}
                    setMessageInput={setMessageInput}         
                    openEmojis={openEmojis}
                    setOpenEmojis={setOpenEmojis}
                    changeMessageInput={changeMessageInput}
                    />
              </div>
        </div>
    </div>
   } 
   { changeName && 
    <div className='pop_up' >
      <div className='pop_up_container'>
      <IoCloseSharp className='close' onClick={() => {setChangeName(false)}} />
        <div className='pop_up_content'>
          <h2>Change nickname</h2>
          <input type='text' onChange={((e) => handleChangeInputNewName(e) )} value={newName}    />
          <button className='pop_up_button' onClick={() => {handleClickChatName(newName)}}>Change</button>
        </div>
      </div>
    </div>
   }
   { changeTheme && 
    <div className='pop_up' >
      <div className='pop_up_container'>
      <IoCloseSharp className='close' onClick={() => {setChangeTheme(false)}} />
        <div className='pop_up_content'>
          <h2>Change theme</h2>
          <div className="color-theme chat-content-change" >
                <div className="color-theme-box" >
                    {colorsTheme.map((c) => (
                          <div onClick={(() => handleClickChangeTheme(c.c))}  key={c.id} className={c.c === chatOptions.chatTheme ? "active col-theme" : "col-theme"} >
                              <div style={{background: c.c}} ></div>
                          </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
   }
   { deleteChat && 
    <div className='pop_up' >
      <div className='pop_up_container'>
      <IoCloseSharp className='close' onClick={() => {setDeleteChat(false)}} />
        <div className='pop_up_content'>
          <h2>Delete Chat</h2>
          <p>Are you sure you want to delete the chat ?</p>
          <div className='btns' >
              <button  className="delete-btn delete btn" onClick={handleClickDeleteChat}  >Delete</button>
              <button className="close-btn btn" onClick={(() => {setDeleteChat(false)})} >Close</button>
          </div>
        </div>
      </div>
    </div>
   }

   {loading && <Loading/>}

    </>
  )
}

export default Dashboard