import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, Form } from 'react-bootstrap'
import { uploadImage } from '../actions/imageActions'
import Loader from '../components/Loader'

const ImageUploadModal = () => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const [fileName, setFileName] = useState('Choose an image to upload...')
  const [image, setImage] = useState('')

  // Go to uploadImage and pull out success and loading
  const imageUpload = useSelector((state) => state.imageUpload)
  const { loading } = imageUpload

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const uploadImageHandler = async ({ target: { files } }) => {
    setFileName(files[0].name)
    setImage(files[0])
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(uploadImage(image))
    setShow(false)
    setFileName('Choose an image to upload...')
  }

  return (
    <>
      <Button className='upload-image' onClick={handleShow}>
        Upload New Image
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Upload Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='uploadImage'>
                  <Form.File
                    id='uploadImage'
                    label={fileName}
                    custom
                    onChange={uploadImageHandler}
                  ></Form.File>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className='upload-image'
                type='submit'
                onClick={submitHandler}
              >
                Upload
              </Button>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  )
}

export default ImageUploadModal
