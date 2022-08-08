import React from 'react'
import { Route, useNavigate } from "react-router-dom"
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';


export default function PrivateRoute() {
  const { currentUser } = useAuth()
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
