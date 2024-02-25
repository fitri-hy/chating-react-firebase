import React from 'react'
import "./Message.css"
import { useAuth } from '../../../../../context/AuthContext'
import { sdb } from "../../../../../firebase"
import { ref } from 'firebase/storage'
import { getDownloadURL } from 'firebase/storage'
import { useChat } from '../../../../../context/ChatContext'

const Message = ({chatOptions, infoColor, info, id, fromId, message, timestamp, file, activeFriend, img, messages, fileImg, allMessages, imgUrl}) => {

    const {currentUser} = useAuth()

    const { data } = useChat()

    /* Handle Downloader Click on File/FileImg */
    const handleDownloader = () => {
        if(file && fromId === currentUser.uid) {
            getDownloadURL(ref(sdb, "message-files/" + currentUser.uid + "/" + data.user + "/" + "files/" + id + "/" + message)).then((url) => {
                const link = document.getElementById("url_d")
                link.href = url;
                link.download = message;
                link.click();
            })
            console.log(id)
        }else if(file && fromId === data.user) {
            getDownloadURL(ref(sdb, "message-files/" + data.user + "/" + currentUser.uid + "/" + "files/" + id + "/" + message)).then((url) => {
                const link = document.getElementById("url_d")
                link.href = url;
                link.download = message;
                link.click();
            })
        }
    }

    return (
        <>
          {img === false && !info && <div id="message" className={fromId === currentUser.uid ? "my-message" : "other-message"} >
           <div onClick={handleDownloader} style={{background: fromId === currentUser.uid ? chatOptions.chatTheme : "#F2F2F2"}} >
               <p className={file ? "line" : ""} >{message}</p>
           </div>
        </div>}
        {img &&  <div id="message-img" className={fromId === currentUser.uid ? "my-message" : "other-message"}>
             <img alt="" src={imgUrl} className="me-img" />
        </div> }
        {info && <div id="message-info" className={fromId === currentUser.uid ? "my-message info" : "other-message info"} >
           <div className="message-info-content" >
               {file?<p>{message}</p> : <a id='url_d' target='_blank' >{message}</a>}
               <p></p> 
               {!infoColor ? null : <div className="color-showness" style={{background: infoColor}}></div> }
           </div>
        </div>}
        </>
        
    )
}

export default Message
