import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Card, Row, Col, Image, Button, Form } from 'react-bootstrap'
import { listPosts, updatePost } from '../actions/postsActions'
import {
  POSTS_UPDATE_RESET,
  LIST_POSTS_RESET,
} from '../constants/postsConstants'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

const HomeScreen = () => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // Declare new state variables and functions
  const [whoIAm, setWhoIAm] = useState('')
  const [whatIDo, setWhatIDo] = useState('')
  const [whereToFindMe, setWhereToFindMe] = useState('')

  // Pull data from postList state
  const postList = useSelector((state) => state.postList)
  const { success, posts } = postList

  // Pull data from userLogin state
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // Pull data from postUpdate state
  const postUpdate = useSelector((state) => state.postUpdate)
  const { success: updateSuccess } = postUpdate

  // Function called on submit
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updatePost({ _id: posts._id, whoIAm, whatIDo, whereToFindMe }))
  }

  // on render get all posts
  useEffect(() => {
    if (!posts) {
      dispatch(listPosts())
    }
    if (posts) {
      setWhoIAm(posts.whoIAm)
      setWhatIDo(posts.whatIDo)
      setWhereToFindMe(posts.whereToFindMe)
    }
    if (updateSuccess) {
      dispatch({ type: POSTS_UPDATE_RESET })
      dispatch({ type: LIST_POSTS_RESET })
    }
  }, [dispatch, posts, updateSuccess])

  return (
    <Container>
      <Meta title='SportsAndSneakers' />
      <Row>
        <Col sm={12} md={12} lg={6} xl={6} style={{ marginTop: '2rem' }}>
          <Card className='profile-cards'>
            <Card.Body>
              <Image
                className='profile-pic'
                src={require('../images/profilePic.jpg')}
              ></Image>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={12} lg={6} xl={6} style={{ marginTop: '2rem' }}>
          {!success && !updateSuccess ? (
            <Loader />
          ) : userInfo && userInfo.isAdmin ? (
            <Card className='profile-cards'>
              <Card.Title style={{ padding: '1.2rem', textAlign: 'center' }}>
                Evan Kay
              </Card.Title>
              <Card.Body style={{ marginTop: '-2rem' }}>
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='whoIAm'>
                    <Form.Label>
                      <h6>Who I am:</h6>
                    </Form.Label>
                    <Form.Control
                      style={{ height: '15rem' }}
                      as='textarea'
                      rows={2}
                      type='whoIAm'
                      value={whoIAm}
                      onChange={(e) => setWhoIAm(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='whatIDo'>
                    <Form.Label>
                      <h6>Who I do:</h6>
                    </Form.Label>
                    <Form.Control
                      style={{ height: '15rem' }}
                      as='textarea'
                      type='whatIDo'
                      placeholder={posts.whatIDo}
                      value={whatIDo}
                      onChange={(e) => setWhatIDo(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='whereToFindMe'>
                    <Form.Label>
                      <h6>Where to find me:</h6>
                    </Form.Label>
                    <Form.Control
                      style={{ height: '15rem' }}
                      as='textarea'
                      type='whereToFindMe'
                      placeholder={posts.whereToFindMe}
                      value={whereToFindMe}
                      onChange={(e) => setWhereToFindMe(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button type='submit' variant='primary'>
                    Update
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            <Card className='profile-cards'>
              <Card.Title style={{ padding: '1.2rem', textAlign: 'center' }}>
                Evan Kay
              </Card.Title>
              <Card.Body style={{ marginTop: '-2rem' }}>
                <h6>Who I am:</h6>
                {posts.whoIAm}
                <br />
                <br />
                <h6>What I do:</h6>
                {posts.whatIDo}
                <br /> <br />
                <h6>Where to find me:</h6>
                {posts.whereToFindMe}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default HomeScreen
