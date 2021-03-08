import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Nav, Button } from 'react-bootstrap'
import Video from '../components/Video'
import {
  listAllVideos,
  listYoutubeVideos,
  createVideo,
} from '../actions/videoActions'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'

const VideoScreen = ({ match }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // Get page number from the URL
  const pageNumber = match.params.pageNumber || 1

  // Go to listVideos and pull out success and videos object
  const listVideos = useSelector((state) => state.listVideos)
  const { loading: DBVideosLoading, videos: DBVideos, pages, page } = listVideos

  // Go to listVideos and pull out success and videos object
  const youtubeVideos = useSelector((state) => state.youtubeVideos)
  const { success, videos } = youtubeVideos

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listAllVideos(pageNumber))
  }, [dispatch, pageNumber])

  // Function called on submit
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(listYoutubeVideos())
  }

  if (success) {
    for (let i = 0; i < videos.items.length; i++) {
      const url = videos.items[i].id.videoId
      const publishedAt = videos.items[i].snippet.publishedAt
      dispatch(createVideo(url, publishedAt))
    }
  }

  return (
    <div className='video-screen'>
      <Meta title='SportsAndSneakers - Videos' />
      {DBVideosLoading ? (
        <Loader />
      ) : (
        <>
          <ListGroup>
            <h1>Videos</h1>
          </ListGroup>
          <Row style={{ paddingTop: '1rem' }}>
            {DBVideos.map((video) => (
              <Col key={video.url} sm={12} md={12} lg={6} xl={4}>
                <Video videoURL={video.url} key={video.url} />
              </Col>
            ))}
          </Row>
          <Nav style={{ marginTop: '.5rem' }}>
            <Paginate pages={pages} page={page} keyword={'videos'} />

            {userInfo && userInfo.isAdmin ? (
              <div style={{ marginLeft: '2rem' }}>
                <Button className='upload-image' onClick={submitHandler}>
                  Update Video Databse
                </Button>
              </div>
            ) : (
              <></>
            )}
          </Nav>
        </>
      )}
    </div>
  )
}

export default VideoScreen
