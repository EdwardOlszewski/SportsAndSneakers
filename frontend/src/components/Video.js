import React from 'react'

const Video = ({ videoURL }) => {
  return (
    <div className='video-div'>
      <iframe
        width='100%'
        height='100%'
        className='youtubeVideo'
        src={`https://www.youtube.com/embed/${videoURL}`}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title={videoURL}
        style={{
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
        }}
      ></iframe>
    </div>
  )
}

export default Video
