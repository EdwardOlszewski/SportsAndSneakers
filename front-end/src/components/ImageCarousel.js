import React from 'react'
import { Carousel, Image } from 'react-bootstrap'

const ImageCarousel = () => {
  var imageArray = []
  var imageURL = ''

  for (var i = 1; i <= 8; i++) {
    imageURL = String(i)
    imageArray[i] = imageURL
    imageURL = ''
  }

  return (
    <Carousel pause='hover' className='carousel'>
      {imageArray.map((imageID) => (
        <Carousel.Item key={imageID}>
          <Image
            src={require(`../images/${imageID}.jpg`)}
            alt={imageURL}
            fluid
          />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ImageCarousel
