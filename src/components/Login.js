import React from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const emailRef = React.useRef()
  const passwordRef = React.useRef()

  const {login, currentUser} = useAuth()
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const navigate  = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/')
    } catch (error) {
      setError("Failed to log in")
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log in</h2>
          {/* {JSON.stringify(currentUser)} */}
          {/* {currentUser.email} */}
          {error && <Alert variant="danger">{error}</Alert >}
          <Form onSubmit={handleSubmit}  >
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef}  required/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef}  required/>
            </Form.Group>
            
            <Button disabled={loading} className="w-100" type="submit">Log in</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  )
}
