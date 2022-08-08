import React from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from "react-router-dom"


export default function UpdateProfile() {
  const emailRef = React.useRef()
  const passwordRef = React.useRef()
  const passwordConfirmRef = React.useRef()

  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const navigate  = useNavigate()


  function handleSubmit(e){
    e.preventDefault()

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")
    if(emailRef.current.value !== currentUser.email){
      promises.push(updateEmail(emailRef.current.value))
    }
    if(passwordRef.current.value){
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises).then(()=>{
      navigate("/")
    }).catch(()=>{
      setError("Failed to update account")
    }).finally(()=>{
      setLoading(false)
    })

  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Update profile</h2>
          {/* {JSON.stringify(currentUser)} | {currentUser.email} => al ocmienzo el usuario es null*/}
          {error && <Alert variant="danger">{error}</Alert >}
          <Form onSubmit={handleSubmit}  >
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} placeholder='Leave blank to keep the same'/>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} placeholder='Leave blank to keep the same'/>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">Update profile</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link to="/login">Cancel</Link> 
      </div>
    </>
  )
}
