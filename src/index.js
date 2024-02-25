import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter, RouterProvider,
} from "react-router-dom";
import './index.css';

import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from "./PrivateRoute"
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { ChatContextProvider } from './context/ChatContext';
import ProfileSetting from './pages/ProfileSettings/ProfileSettings';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';


//Path ---- / (routes),,,, hasllhRouter #

const router = createHashRouter([
  {
    path: "/",
    element: <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  },
  {
    path: "/settings",
    element: <PrivateRoute>
      <ProfileSetting />
    </PrivateRoute>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/sign_up",
    element: <Signup />
  },
  {
    path: "/forgot_password",
    element: <ForgotPassword />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ChatContextProvider>
        <RouterProvider router={router} />
      </ChatContextProvider>
    </AuthProvider>
  </React.StrictMode>
);