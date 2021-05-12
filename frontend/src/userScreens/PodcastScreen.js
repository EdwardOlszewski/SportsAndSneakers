import React from 'react'

const PodcastScreen = () => {
  return (
    <div className='video-screen'>
      <h1 className='bigHeading'>Recent Podcast</h1>
      <iframe
        title='podcast'
        src='https://open.spotify.com/embed-podcast/show/28V68WDB9n4EF5GFSRpxut'
        width='100%'
        height='232'
        frameBorder='0'
        allowtransparency='true'
        allow='encrypted-media'
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          borderRadius: '10px',
        }}
      ></iframe>
    </div>
  )
}

export default PodcastScreen
