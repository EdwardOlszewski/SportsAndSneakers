// Dependencies
import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Product = ({ product }) => {
  return (
    <div>
      {product.isPublished ? (
        <div style={{ marginBottom: '2rem' }}>
          <Card className='product'>
            <Link to={`/product/${product._id}`}>
              <Card.Img src={product.image} style={{ padding: '1rem' }} />
            </Link>
          </Card>

          <h5>{product.name}</h5>
          <strong>${product.price} </strong>
        </div>
      ) : null}
    </div>
  )
}

export default Product
