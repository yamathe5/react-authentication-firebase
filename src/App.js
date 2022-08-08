import Signup from "./components/Signup"
import { Container } from 'react-bootstrap'
import {AuthProvider} from "./context/AuthContext"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import PrivateRoute from "./components/PrivateRoute"
import ForgotPassword from "./components/ForgotPassword"
import UpdateProfile from "./components/UpdateProfile"
import UserPrivateRoute from "./components/UserPrivateRoute"

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{minHeight:"100vh"}}
    >
      <div className="w-100" style={{maxWidth:"400px"}}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path='/' element={<PrivateRoute/>}>
                <Route exact path='/' element={<Dashboard/>}/>
              </Route>
              <Route path='/update-profile' element={<PrivateRoute/>}>
                <Route path='/update-profile' element={<UpdateProfile/>}/>
              </Route>

              <Route path='/signup' element={<UserPrivateRoute/>}>
                <Route path='/signup' element={<Signup/>}/>
              </Route>
              <Route path='/login' element={<UserPrivateRoute/>}>
                <Route path='/login' element={<Login/>}/>
              </Route>
              <Route path='/forgot-password' element={<UserPrivateRoute/>}>
                <Route path='/forgot-password' element={<ForgotPassword/>}/>
              </Route>

              {/* <Route path="/signup" element={<Signup/>} /> */}
              {/* <Route path="/login" element={<Login/>} /> */}
              {/* <Route path="/forgot-password" element={<ForgotPassword/>} /> */}
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
