// Dependencies
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Actions
import { login } from '../actions/userActions'
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
import { LinkContainer } from 'react-router-bootstrap'
import bannerPic from '../images/bannerIMG.png'

const LoginScreen = ({ location, history }) => {
  // Assign useDispatch hook
  const dispatch = useDispatch()

  // Get the redirect from the URL
  const redirect = location.search ? location.search.split('=')[1] : '/'

  // Create stateful values and functions
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [passVis, setPassVis] = useState('password')

  // Pull data from the redux store
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  //Function to show password
  const showPassHandler = (e) => {
    e.preventDefault()
    if (passVis == 'password') {
      setPassVis('text')
    } else {
      setPassVis('password')
    }
  }

  // Function  called on submit
  const submitHandler = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setMessage('Must fill out entire form.')
    } else {
      dispatch(login(email, password))
    }
  }

  // useEffect hook
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  return (
    <div className='login-div'>
      <FormContainer>
        <Meta title={'Login'} />

        <div className='login-banner'>
          <LinkContainer to='/'>
            <Image className='nav-links' src={bannerPic}></Image>
          </LinkContainer>
        </div>

        <Card className='card-content'>
          <h3>Log In</h3>
          <br />

          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <h6 className='form-label'> Email Address</h6>

              <Form.Control
                required
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <h6 className='form-label'> Password</h6>
            <InputGroup>
              <Form.Control
                required
                type={passVis}
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
              <InputGroup.Append>
                <InputGroup.Text className='pass-vis'>
                  <i
                    onClick={showPassHandler}
                    className={
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
                Log In
              </Button>
            )}
          </Form>

          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}

          <Row className='py-3'>
            <Col>
              New Customer?{' '}
              <Link
                className='links'
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                Register
              </Link>
            </Col>
          </Row>
        </Card>
      </FormContainer>
    </div>
  )
}

export default LoginScreen
