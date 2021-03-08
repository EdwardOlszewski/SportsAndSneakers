import React from 'react'
import { Image, Row, Col, Card } from 'react-bootstrap'

const NewestImages = ({ images }) => {
  return (
    <div className='newest-images'>
      <Row style={{ margin: 'auto', textAlign: 'center' }}>
        {images.slice(0, 4).map((image) => (
          <Col xs={6} sm={6} md={4} lg={3} xl={3} key={image.imageURL}>
            <Card style={{ padding: '.2rem' }}>
              <Image
                className='img'
                src={image.imageURL}
                alt={image.imageURL}
                fluid
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default NewestImages
