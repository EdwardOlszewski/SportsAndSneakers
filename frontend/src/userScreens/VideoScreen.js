import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Video from '../components/Video'
import { listYoutubeVideos2 } from '../actions/videoActions'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import Message from '../components/Message'

const VideoScreen = ({ match }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // Go to listVideos and pull out success and videos object
  const youtubeVideos = useSelector((state) => state.youtubeVideos)
  const { success, videos, error } = youtubeVideos

  useEffect(() => {
    dispatch(listYoutubeVideos2())
  }, [dispatch])

  return (
    <div className='video-screen'>
      <Meta title='SportsAndSneakers - Videos' />
      <h1
        className='bigHeading'
        style={{ margin: 'auto', textAlign: 'center', marginBottom: '2rem' }}
      >
        Recent Videos
      </h1>
      {!success ? (
        <Loader />
      ) : error ? (
        <Message> {error} </Message>
      ) : (
        <Row>
          {videos.items.map((youtubeVideo) => (
            <Col xs={12} md={4}>
              <Video videoURL={youtubeVideo.id.videoId} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default VideoScreen
