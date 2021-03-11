import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Button } from 'react-bootstrap'
import { login } from '../actions/userActions'

const AdminLoginScreen = ({ history }) => {
  // Assign useDispatch hook to dispatch action
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // Declare new state variables using useState hook
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLogin] = useState(false)

  const handleClose = () => setLogin(false)
  const handleLoggedIn = () => setLogin(true)

  // Function to be called on submit
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
    handleLoggedIn()
    history.push('/')
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      history.push('/')
    }
  }, [history, userInfo])

  return (
    <Modal
      show={!loggedIn}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Admin Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className='upload-image' type='submit'>
            Sign In
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleLoggedIn}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AdminLoginScreen
