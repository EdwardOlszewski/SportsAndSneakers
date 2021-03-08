import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Sports And Sneakers',
  description: 'Sports And Sneakers Productions',
  keywords: 'Sports And Sneakers, Sneakrs, Gear, Merch, Sports, Chicago ',
}

export default Meta
