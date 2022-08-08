import React from 'react'
import {auth} from "../firebase.js"

const AuthContext = React.createContext()

export function useAuth(){
  return React.useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = React.useState()
  const [loading, setLoading] = React.useState(true)

  function signup(email,password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password){
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout(){
    return auth.signOut()
  }

  function resetPasword(email){
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email){
    return currentUser.updateEmail(email)
  }

  function updatePassword(password){
    return currentUser.updatePassword(password)
  }

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  },[])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPasword,
    updateEmail,
    updatePassword
  }
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
