// Dependencies
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Actions
import { register } from '../actions/userActions'
// Components
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Image,
  InputGroup,
} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import bannerPic from '../images/bannerIMG.png'
import { LinkContainer } from 'react-router-bootstrap'

const RegisterScreen = ({ location, history }) => {
  // Assign useDispatch hook
  const dispatch = useDispatch()

  // Get redirect from the URL
  const redirect = location.search ? location.search.split('=')[1] : '/'

  // Create stateful values and functions
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [passVis, setPassVis] = useState('password')

  // Pull data from the redux store
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, success, userInfo } = userRegister

  //Function to show password
  const showPassHandler = (e) => {
    e.preventDefault()
    if (passVis == 'password') {
      setPassVis('text')
    } else {
      setPassVis('password')
    }
  }

  // Function called on submit
  const submitHandler = (e) => {
    e.preventDefault()
    if (!password || !firstName || !lastName || !email) {
      setMessage('Must fill out entire form.')
    } else if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(firstName, lastName, email, password))
    }
  }

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
    if (error) {
      setMessage(error)
    }
  }, [history, userInfo, redirect, error])

  return (
    <div className='login-div'>
      <FormContainer>
        <Meta title={'Register'} />

        <div className='register-banner'>
          <LinkContainer to='/'>
            <Image className='nav-links' src={bannerPic}></Image>
          </LinkContainer>
        </div>

        <Card className='card-content'>
          <h3>Sign Up</h3>

          <Form onSubmit={submitHandler}>
            <h6 className='form-label'> First Name</h6>
            <Form.Group controlId='name'>
              <Form.Control
                type='firstName'
                placeholder='Enter First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />

            <h6 className='form-label'> Last Name</h6>
            <Form.Group controlId='last name'>
              <Form.Control
                type='lastName'
                placeholder='Enter Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />

            <h6 className='form-label'> Email Address</h6>
            <Form.Group controlId='email'>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />

            <h6 className='form-label'> Password</h6>
            <InputGroup>
              <Form.Control
                required
                type={passVis}
                placeholder='Enter password'
                value={password}
                endAdornment={<i class='fas fa-eye'></i>}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
              <InputGroup.Append>
                <InputGroup.Text className='pass-vis'>
                  <i
                    onClick={showPassHandler}
                    class={
                      passVis == 'password' ? 'fas fa-eye-slash' : 'fas fa-eye'
                    }
                  ></i>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <br />

            <h6 className='form-label'> Confirm Password</h6>
            <InputGroup>
              <Form.Control
                required
                type={passVis}
                placeholder='Confirm Password'
                value={confirmPassword}
                endAdornment={<i class='fas fa-eye'></i>}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
              <InputGroup.Append>
                <InputGroup.Text className='pass-vis'>
                  <i
                    onClick={showPassHandler}
                    class={
                      passVis == 'password' ? 'fas fa-eye-slash' : 'fas fa-eye'
                    }
                  ></i>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <br />

            {loading ? (
              <Loader />
            ) : (
              <Button type='submit' variant='primary' className='btn' block>
                Register
              </Button>
            )}
          </Form>

          {message && <Message variant='danger'>{message}</Message>}

          <Row className='py-3'>
            <Col>
              Have an Account?{' '}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : '/login'}
                className='links'
              >
                Login
              </Link>
            </Col>
          </Row>
        </Card>
      </FormContainer>
    </div>
  )
}

export default RegisterScreen
