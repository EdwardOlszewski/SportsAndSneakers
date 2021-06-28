// Dependencies
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Actions
import { getOrderDetails, deliverOrder } from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'
// Components
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Container,
} from 'react-bootstrap'
import DateFormat from '../components/DateFormat'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

const OrderScreen = ({ match, history }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // get the orderID from th URL
  const orderId = match.params.id

  // Pull data from the redux store
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error, success } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    // Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  // useEffect hook to do something after render
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else if (
      !order ||
      successPay ||
      successDeliver ||
      order._id !== orderId
    ) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    }
  }, [
    dispatch,
    orderId,
    successPay,
    successDeliver,
    order,
    history,
    userInfo,
    success,
  ])

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
    history.push('/admin/orderlist')
  }

  return (
    <Container>
      <Meta title='Order Summary' />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <React.Fragment>
          <Row style={{ marginTop: '10rem' }}>
            <Col sm={12} md={12} lg={12} xl={12}>
              <Card style={{ border: 'none' }}>
                <ListGroup>
                  <ListGroup.Item
                    className='bg-color'
                    style={{ border: 'none' }}
                  >
                    <h2>Order Items</h2>
                    {order.orderItems.length === 0 ? (
                      <Message>Order is empty</Message>
                    ) : (
                      <ListGroup variant='flush'>
                        <ListGroup.Item className='bg-color'></ListGroup.Item>
                        {order.orderItems.map((item, index) => (
                          <ListGroup.Item key={index} className='bg-color'>
                            <Row>
                              <Col xs={12} md={2}>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fluid
                                  rounded
                                />
                              </Col>

                              <Col xs={12} md={3}>
                                <div className='space'></div>
                                <h6> {item.name}</h6>
                              </Col>

                              <Col xs={4} md={2}>
                                <div className='space'></div>
                                <h6>Size: {item.size}</h6>
                              </Col>

                              <Col xs={4} md={3}>
                                <div className='space'></div>
                                <h6>Qty: {item.qty}</h6>
                              </Col>

                              <Col xs={4} md={2}>
                                <div className='space'></div>
                                <h6>${item.price}</h6>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                        <ListGroup.Item className='bg-color'></ListGroup.Item>
                      </ListGroup>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col sm={12} md={12} lg={6} xl={6}>
              <Card style={{ border: 'none' }}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>Order Summary</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <div className='list-right'>
                          <strong>Order Number:</strong>
                        </div>
                      </Col>
                      <Col>
                        <div className='list-left'>
                          {order._id.substr(0, 12)}
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <div className='list-right'>
                          <strong>Items:</strong>
                        </div>
                      </Col>
                      <Col>
                        <div className='list-left'>${order.itemsPrice}</div>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <div className='list-right'>
                          <strong>Tax:</strong>
                        </div>
                      </Col>
                      <Col>
                        <div className='list-left'>
                          ${' '}
                          {(Math.round(order.taxPrice * 100) / 100).toFixed(2)}
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <div className='list-right'>
                          <strong>Total:</strong>
                        </div>
                      </Col>
                      <Col>
                        <div className='list-left'>
                          $
                          {(Math.round(order.totalPrice * 100) / 100).toFixed(
                            2
                          )}
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item
                    className='bg-color'
                    style={{ borderBottom: 'none' }}
                  >
                    {order.isPaid ? (
                      <Message variant='success' color={'#2bb673'}>
                        Paid on: {' ' + DateFormat(order.paidAt)}
                      </Message>
                    ) : (
                      <Message variant='danger'>Not Paid</Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>

            <Col sm={12} md={12} lg={6} xl={6}>
              <Card style={{ border: 'none' }}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>Shipping</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <div className='list-right'>
                          <strong>Name:</strong>
                        </div>
                      </Col>
                      <Col>
                        <div className='list-left'>
                          {order.billingDetails.name}
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <div className='list-right'>
                          <strong>Email:</strong>
                        </div>
                      </Col>
                      <Col>
                        <div className='list-left'>{order.user.email}</div>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <div className='list-right'>
                          <strong>City:</strong>
                        </div>
                      </Col>
                      <Col>
                        <div className='list-left'>
                          {order.shippingAddress.city +
                            ', ' +
                            order.shippingAddress.state +
                            ' ' +
                            order.shippingAddress.postalCode}
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <div className='list-right'>
                          <strong>Street:</strong>
                        </div>
                      </Col>
                      <Col>
                        <div className='list-left'>
                          {order.shippingAddress.address}
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    {order.isDelivered ? (
                      <Message variant='success' color={'#2bb673'}>
                        Shipped on: {' ' + DateFormat(order.deliveredAt)}
                      </Message>
                    ) : (
                      <Message variant='danger'>Not Shipped Yet</Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>

                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {null ? <Loader /> : <div></div>}
                  </ListGroup.Item>
                )}

                {loadingDeliver && <Loader />}
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        type='button'
                        className='btn btn-block'
                        onClick={deliverHandler}
                      >
                        Mark As Shipped
                      </Button>
                    </ListGroup.Item>
                  )}
              </Card>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </Container>
  )
}

export default OrderScreen
