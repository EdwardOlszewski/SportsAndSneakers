import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Nav } from 'react-bootstrap'
import Picture from '../components/Picture'
import Paginate from '../components/Paginate'
import { getAllImages } from '../actions/imageActions'
import ImageUploadModal from '../components/ImageUploadModal'
import {
  IMAGE_DELETE_RESET,
  UPLOAD_IMAGE_RESET,
  CREATE_IMAGE_RESET,
} from '../constants/imageConstants'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

const PictureScreen = ({ match }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // Get page number from the URL
  const pageNumber = 1

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const allImages = useSelector((state) => state.allImages)
  const { loading, images, page, pages } = allImages

  const imageDelete = useSelector((state) => state.imageDelete)
  const { loading: deleteLoading, success: deleteSuccess } = imageDelete

  const imageCreate = useSelector((state) => state.imageCreate)
  const { success: createImgSucc } = imageCreate

  if (createImgSucc) {
    dispatch(getAllImages())
    dispatch({ type: CREATE_IMAGE_RESET })
    dispatch({ type: UPLOAD_IMAGE_RESET })
  }

  if (deleteSuccess) {
    dispatch(getAllImages(pageNumber))
    dispatch({ type: IMAGE_DELETE_RESET })
  }

  useEffect(() => {
    dispatch(getAllImages(pageNumber))
  }, [dispatch, pageNumber])

  return (
    <div>
      <Meta title='SportsAndSneakers - Gallery' />
      {loading || deleteLoading ? (
        <Loader />
      ) : (
        <div className='video-screen'>
          <ListGroup>
            <h1
              className='bigHeading'
              style={{
                margin: 'auto',
                textAlign: 'center',
                marginBottom: '2rem',
              }}
            >
              Gallery
            </h1>
          </ListGroup>
          <Row>
            {images.map((image) => (
              <Col
                key={image._id}
                xs={6}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                style={{ paddingTop: '1rem' }}
              >
                <Picture image={image} />
              </Col>
            ))}
          </Row>
          <Nav style={{ marginTop: '.5rem' }}>
            <Paginate pages={pages} page={page} keyword={'pictures'} />
            <div style={{ marginLeft: '2rem' }}>
              {userInfo && userInfo.isAdmin ? (
                <ImageUploadModal />
              ) : (
                <div> </div>
              )}
            </div>
          </Nav>
        </div>
      )}
    </div>
  )
}

export default PictureScreen
