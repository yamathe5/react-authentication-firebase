import React from 'react'
import { Route, useNavigate } from "react-router-dom"
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';


export default function PrivateRoute() {
  // const navigate = useNavigate()
  console.log(Component, rest)

  const { currentUser } = useAuth()
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
    // <Route 
    //   {...rest}
    //   render={props=>{
    //     return currentUser? <Component {...props}/> : <Redirect to="/login">
    //   }}
    // >
      
    // </Route>
  
}
