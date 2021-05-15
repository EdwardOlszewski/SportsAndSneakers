import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import { listPosts, updatePost } from '../actions/postsActions'
import {
  POSTS_UPDATE_RESET,
  LIST_POSTS_RESET,
} from '../constants/postsConstants'

import PictureScreen from './PictureScreen'
import PodcastScreen from './PodcastScreen'
import VideoScreen from './VideoScreen'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import MyImage from '../images/profilePic.jpg'

const HomeScreen = () => {
  // Assign useDispatch hook to dispatch action
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
    <Container style={{ marginTop: '10rem' }}>
      <Meta title='SportsAndSneakers' />
      <Row noGutters style={{ marginTop: '3rem' }}>
        <Col
          sm={12}
          md={12}
          lg={6}
          xl={6}
          style={{
            textAlign: 'center',
            margin: 'auto',
          }}
        >
          <Image className='profile-pic' src={MyImage}></Image>
        </Col>

        {!success && !updateSuccess ? (
          <Loader />
        ) : userInfo && userInfo.isAdmin ? (
          <Col sm={12} md={12} lg={6} xl={6}>
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
                  placeholder={posts.whoIAm}
                  value={whoIAm}
                  onChange={(e) => setWhoIAm(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='whatIDo'>
                <Form.Label>
                  <h6>What My Content Is:</h6>
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
                  <h6>Where To Check My Content:</h6>
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
          </Col>
        ) : (
          <>
            <Col
              sm={12}
              md={12}
              lg={6}
              xl={6}
              style={{
                textAlign: 'left',
                margin: 'auto',
              }}
            >
              <div className='move-row'></div>
              <h6 className='heading'>Who I am:</h6>
              <p className='home-txt'>{posts.whoIAm}</p>

              <br />
              <br />
              <h6 className='heading'>Where To Check My Content:</h6>
              <p className='home-txt'>{posts.whereToFindMe}</p>
            </Col>
            <Row className='what-I-Do-Row'>
              <h6 className='heading'>What I Do:</h6>
              <p className='home-txt'>{posts.whatIDo}</p>
            </Row>
          </>
        )}
      </Row>
      <div id='videos'></div>
      <div style={{ marginTop: '10rem' }}></div>
      <div>
        <VideoScreen />
      </div>

      <div id='podcasts'></div>
      <div style={{ marginTop: '12rem' }}></div>
      <div>
        <PodcastScreen />
      </div>

      <div id='pictures'></div>
      <div style={{ marginTop: '10rem' }}></div>
      <div>
        <PictureScreen />
      </div>
      <div style={{ marginTop: '10rem' }}></div>
    </Container>
  )
}

export default HomeScreen
