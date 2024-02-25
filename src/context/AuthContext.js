import React, {useContext, useState, useEffect} from "react"
import { auth, rdb } from "../firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword,  updatePassword, sendPasswordResetEmail } from "firebase/auth";
import {  ref, set  } from "firebase/database";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

 
  // SIGNUP - need: email, password, username
  async function signup(email, password, firstName, lastName) {
      return createUserWithEmailAndPassword(auth, email, password)
      .then(async (user) => {

        var timestamp = new Date().valueOf()
        var date = new Date(timestamp);

          set(ref(rdb, 'users/' + user.user.uid), {
            firstName: firstName,
            lastName: lastName,
            profilePic: "https://i.postimg.cc/6qVLHC2j/pro-test3.png", 
            email: email,
            id: user.user.uid,
            firstLogin: new Date().valueOf(),
          });

      })
  }

  // LOGIN - need: email, password
  async function login(email, password){
   return signInWithEmailAndPassword(auth, email, password)
  }


  // LOGOUT
  function logout() {
    return auth.signOut()
  }

  //RESET PASSWORD
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }


  //NEW PASSWORD
  function updateUserPassword(password) {
    return updatePassword(currentUser, password)
  }  

  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })


    return unsubscribe


  }, [])

  


  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateUserPassword,
  }

  return(
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

