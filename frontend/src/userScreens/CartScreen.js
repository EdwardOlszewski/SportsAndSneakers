// Dependencies
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Actions
import { addToCart, removeFromCart } from '../actions/cartActions'
// Components
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from 'react-bootstrap'
import Message from '../components/Message'
import Meta from '../components/Meta'

const CartScreen = ({ match, location, history }) => {
  // Assign useDispatch hook
  const dispatch = useDispatch()

  // Get productID from the url
  const productId = match.params.id

  // Get the qty of each item from the URL
  const qty = location.search
    ? Number(location.search.slice(1).split('&')[0].split('=')[1])
    : 1

  // Pull data from the redux store
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  // Function called when remove button clicked
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  // Function called on submit
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  // useEffect Hook
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return (
    <Container>
      <Row style={{ marginTop: '10rem' }}>
        <Meta title={'Cart'} />

        {cartItems.length === 0 ? (
          <Col style={{ marginBottom: '2rem' }}>
            <Card className='card-content'>
              <Message>
                Your cart is empty <Link to='/shop'>Go Back</Link>
              </Message>
            </Card>
          </Col>
        ) : (
          <Col>
            <ListGroup variant='flush'>
              <h2>Cart</h2>

              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col xs={12} md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>

                    <Col xs={12} md={3}>
                      <div className='space'></div>
                      <Link
                        className='productLinks'
                        style={{ fontSize: '100%' }}
                        to={`/product/${item.product}`}
                      >
                        <strong> {item.name}</strong>
                        <br />
                        <span> Size: {item.size}</span>
                      </Link>
                    </Col>

                    <Col xs={12} md={1}></Col>

                    <Col xs={6} md={2}>
                      <div className='space'></div>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            Quantity: {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col xs={12} md={2}>
                      <div className='space'></div>
                      <strong
                        className='removeBtn'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Remove
                      </strong>
                    </Col>

                    <Col xs={3} md={2}>
                      <div className='space'></div>
                      <strong>${item.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        )}
      </Row>
      <Row>
        <Col md={12} lg={12}>
          <Card className='checkoutCard'>
            <ListGroup variant='flush'>
              <ListGroup.Item variant='flush'>
                <h5>Total: </h5>
                <strong>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </strong>

                <div style={{ marginTop: '1rem' }}>
                  <strong>shipping & taxes calculated at checkout</strong>{' '}
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <Button
                    type='button'
                    className='btn'
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CartScreen
