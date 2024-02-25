// import functions of firebase for inicialition 
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"

//Paste here your own firebaseConfig
const firebaseConfig = {
  apiKey: "AIzaSyCbgR9NKpS2Yr4pYmML9KVejfg2ZmjfKoM",
  authDomain: "react-chat-57686.firebaseapp.com",
  projectId: "react-chat-57686",
  storageBucket: "react-chat-57686.appspot.com",
  messagingSenderId: "747859111797",
  appId: "1:747859111797:web:09cfb32836921dc7906d3c",
  databaseURL: "https://react-chat-57686-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageURL: "gs://react-chat-57686.appspot.com"
};

//inicialition function 
const app = initializeApp(firebaseConfig);
const rdb = getDatabase(app);
const sdb = getStorage(app)
const auth = getAuth(app);

export { rdb, sdb, auth }
export default app
