import React from 'react'
import { Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

//If not currentUser go back to login by Navigate
export default function PrivateRoute({ children }) {

  const { currentUser } = useAuth();

  return (
    currentUser ? children : <Navigate to="/login" />
  )
}
