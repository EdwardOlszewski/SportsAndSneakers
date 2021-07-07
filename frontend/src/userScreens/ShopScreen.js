// Dependencies
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Actions
import { listProducts } from '../actions/productActions'
//Components
import { Row, Col, Card, Container } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'

const ShopScreen = ({ match }) => {
  // Assign useDispatch hook
  const dispatch = useDispatch()

  // Get keyword from the URL
  const keyword = match.params.keyword

  // Get pagenumber from the URL
  const pageNumber = match.params.pageNumber || 1

  // Pull data from the redux store
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  // useEffect hook
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <Container style={{ marginTop: '10rem' }}>
      <Meta title={'Shop'} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : products.length <= 0 ? (
        <Message variant='danger'>
          <h4>Shop is currently empty,</h4>
          <h5>Check back soon!</h5>
        </Message>
      ) : (
        <div className='info'>
          <Row>
            <Col xl={12}>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} xs={6} sm={6} md={4} lg={3} xl={4}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              {pages > 1 ? (
                <Card className='page-card' style={{ marginTop: '10px' }}>
                  <Paginate
                    pages={pages}
                    page={page}
                    keyword={keyword ? keyword : ''}
                  />
                </Card>
              ) : null}
            </Col>
          </Row>
        </div>
      )}
    </Container>
  )
}

export default ShopScreen
