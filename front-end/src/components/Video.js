import React from 'react'
import { Card } from 'react-bootstrap'

const Video = ({ videoURL }) => {
  return (
    <Card className={'video-card'}>
      <iframe
        width='100%'
        height='100%'
        src={`https://www.youtube.com/embed/${videoURL}`}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title={videoURL}
      ></iframe>
    </Card>
  )
}

export default Video
