// Dependencies
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Actions
import { listProductDetails } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
// Components
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Container,
} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

const ProductScreen = ({ history, match }) => {
  // Assign useDispatch hook
  const dispatch = useDispatch()

  // Get poduct ID from the URL
  const ID = match.params.id

  // Create stateful values and functions
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState(0)

  // Pull data from the redux store
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // Function called on submit
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  // useEffect hook
  useEffect(() => {
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id))
    }
  }, [dispatch, match, product._id])

  return (
    <Container style={{ marginTop: '10rem' }}>
      <Meta title={product.name} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <div>
            <Row>
              <Col sm={12} lg={5}>
                <Image
                  className='productImg'
                  src={product.image}
                  alt={product.name}
                  fluid
                />
              </Col>

              <Col md={12} lg={5} style={{ margin: 'auto', textAlign: 'left' }}>
                <ListGroup variant='flush' className='productInfo'>
                  <ListGroup.Item className='productInfoList'>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>

                  <ListGroup variant='flush'>
                    <ListGroup.Item className='productInfoList'>
                      <Row style={{ textAllign: 'left' }}>
                        <Col>
                          <h5>
                            $
                            {(Math.round(product.price * 100) / 100).toFixed(2)}
                          </h5>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <div
                      className='sep-line'
                      style={{ marginTop: '2rem' }}
                    ></div>

                    {product.countInStock <= 0 ? (
                      <ListGroup.Item className='productInfoList'>
                        <Button className='btn-block' type='button' disabled>
                          Out Of Stock!
                        </Button>
                      </ListGroup.Item>
                    ) : (
                      <div>
                        <ListGroup.Item className='productInfoList'>
                          <Row>
                            <Col>
                              <Form.Control
                                as='select'
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                              >
                                {[...Array(product.size).keys()].map((x) => (
                                  <option>Size: {product.size}</option>
                                ))}
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item className='productInfoList'>
                          <Row>
                            <Col>
                              <Form.Control
                                as='select'
                                value={size}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      Quantity: {x + 1}
                                    </option>
                                  )
                                )}
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <div
                          className='sep-line'
                          style={{ marginTop: '2rem' }}
                        ></div>
                        <ListGroup.Item className='productInfoList'>
                          <Row>
                            <Col>
                              <strong>{product.description}</strong>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <div
                          className='sep-line'
                          style={{ marginBottom: '2rem' }}
                        ></div>
                        <ListGroup.Item className='bg-color'>
                          <Button
                            onClick={addToCartHandler}
                            className='bt'
                            style={{ width: '100%' }}
                            type='button'
                            disabled={product.countInStock === 0}
                          >
                            Add To Cart
                          </Button>
                        </ListGroup.Item>
                      </div>
                    )}
                  </ListGroup>
                </ListGroup>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </Container>
  )
}

export default ProductScreen
