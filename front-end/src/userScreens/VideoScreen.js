import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Nav } from 'react-bootstrap'
import Video from '../components/Video'
import { listYoutubeVideos, getVideoPages } from '../actions/videoActions'
import Loader from '../components/Loader'

import Paginate from '../components/Paginate'

const VideoScreen = ({ match }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // Get page number from the URL
  const pageNumber = match.params.pageNumber || 1

  // Go to listVideos and pull out success and videos object
  const youtubeVideos = useSelector((state) => state.youtubeVideos)
  const { success, loading, videos } = youtubeVideos

  const videoPages = useSelector((state) => state.videoPages)
  const { page, pages } = videoPages

  useEffect(() => {
    dispatch(listYoutubeVideos())
    if (!success) {
      dispatch(getVideoPages(pageNumber, 11))
    }
  }, [dispatch, pageNumber, getVideoPages, success])

  return (
    <div className='video-screen'>
      {!success ? (
        <Loader />
      ) : (
        <>
          <ListGroup>
            <h1>Videos</h1>
          </ListGroup>
          <Row style={{ paddingTop: '1rem' }}>
            {videos.items.map((video) => (
              <Col key={video.id.videoId} sm={12} md={12} lg={6} xl={4}>
                <Video videoURL={video.id.videoId} key={video.id.videoId} />
              </Col>
            ))}
          </Row>
          <Nav style={{ marginTop: '.5rem' }}>
            <Paginate pages={pages} page={page} />
          </Nav>
        </>
      )}
    </div>
  )
}

export default VideoScreen

/*

// Go to listVideos and pull out success and videos object
  const listVideos = useSelector((state) => state.listVideos)
  const { success, loading, videos, page, pages } = listVideos




 // Go to listVideos and pull out success and videos object
  const listVideos = useSelector((state) => state.listVideos)
  const { success, loading, videos } = listVideos

    useEffect(() => {
    dispatch(listYoutubeVideos())
  }, [dispatch])

 {!success ? (
        <Loader />
      ) : (
        <>
          <ListGroup>
            <h1>Videos</h1>
            <div className='line'></div>
          </ListGroup>
          <Row style={{ paddingTop: '1rem' }}>
            {videos.items.map((video) => (
              <Col key={video.id.videoId} sm={12} md={12} lg={6} xl={4}>
                <Video videos={video} key={video.id.videoId} />
              </Col>
            ))}
          </Row>
          <div className='line'></div>
        </>
      )}









  */
