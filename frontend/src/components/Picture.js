import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Image, Button } from 'react-bootstrap'
import { deleteImage } from '../actions/imageActions'

const Picture = ({ image }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteImage(id))
    }
  }

  return (
    <Card
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      }}
    >
      <Card style={{ padding: '.2rem' }}>
        <Image src={image.imageURL} style={{ width: '100%' }}></Image>
        {userInfo && userInfo.isAdmin ? (
          <Card.Body>
            <Button
              variant='danger'
              className='btn-sm'
              onClick={() => deleteHandler(image._id)}
            >
              <i className='fas fa-trash'></i>
            </Button>
          </Card.Body>
        ) : (
          <div></div>
        )}
      </Card>
    </Card>
  )
}

export default Picture
