import React from 'react'
import { Carousel, Image } from 'react-bootstrap'

const ImageCarousel = ({ images }) => {
  return (
    <Carousel pause='hover' className='carousel'>
      {images.slice(0, 4).map((image) => (
        <Carousel.Item key={image.imageURL}>
          <Image src={image.imageURL} alt={image.imageURL} fluid />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ImageCarousel
