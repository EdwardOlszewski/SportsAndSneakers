// Dependencies
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Actions
//import { stripePromise } from '../constants/stripeConstants'
import {
  updateBilling,
  getOrderDetails,
  getStripePromise,
} from '../actions/orderActions'
import { ORDER_CHARGE_RESET } from '../constants/orderConstants'
import { payOrder } from '../actions/orderActions'
import { updateProductQTY } from '../actions/productActions'
import { sendReceiptEmail } from '../actions/emailActions'
// Components
import { Form, Col, Row, Card } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from '../components/PaymentForm'
import Meta from '../components/Meta'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { loadStripe } from '@stripe/stripe-js'

const PaymentScreen = ({ match, history }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // get the orderID from th URL
  const orderId = match.params.id

  // Go to the state and pull out information from userLogin
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // Go to the orderDetails in the state and pull out information
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderCharge = useSelector((state) => state.orderCharge)
  const { loading: chargeLoading, success: chargeSuccess } = orderCharge

  const stripePromise = loadStripe(
    'pk_live_51J2mhaBWMiyD5hobMBftOOJi1TKZxuvjpIZb621BczguxeUcGc6p58lXdWYsK7SwINl43G2c62Y2Bg4ssYcmRpY700TmmlEnEj'
  )

  // Declare new state variables and functions
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')

  // Billing Details for Stripe
  const billingDetails = {
    name: firstName + ' ' + lastName,
    email: userInfo.email,
    address: {
      city: city,
      line1: street,
      state: state,
      postal_code: postalCode,
    },
  }

  // Function to place order on submit
  const updateBillingInfo = () => {
    dispatch(updateBilling(orderId, billingDetails))
  }

  // useEffect hook
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else if (!order) {
      dispatch(getStripePromise())
      dispatch(getOrderDetails(orderId))
    } else if (order && order.isPaid) {
      history.push(`/order/${orderId}`)
    } else if (chargeSuccess) {
      const name = userInfo.firstName + ' ' + userInfo.lastName
      const email = userInfo.email
      dispatch(sendReceiptEmail(name, email, order))
      history.push(`/order/${orderId}`)
      dispatch({ type: ORDER_CHARGE_RESET })
      dispatch(payOrder(orderId))
      order.orderItems.map((product) =>
        dispatch(updateProductQTY(product.qty, product.product))
      )
    }
  }, [dispatch, orderId, order, history, userInfo, chargeSuccess])

  return (
    <div>
      <Meta title='Payment' />
      {loading || chargeLoading ? (
        <Loader style={{ marginTop: '10rem' }} />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : order.isPaid ? (
        <Message variant='danger'>AlreadyPaid</Message>
      ) : (
        <FormContainer>
          <CheckoutSteps step1 step2 step3 step4 />

          <Card style={{ marginTop: '2rem', border: 'none' }}>
            <div style={{ textAlign: 'center' }}>
              <h1>Payment</h1>
            </div>
            <Card.Body>
              <Form id='payment-form' onSubmit={updateBillingInfo}>
                <Row sm={12} lg={12} md={1} xl={12}>
                  <Form.Group
                    controlId='first name'
                    as={Col}
                    sm={6}
                    md={12}
                    xl={6}
                  >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required
                      type='text'
                      placeholder='First Name'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group
                    controlId='last name'
                    as={Col}
                    sm={6}
                    md={12}
                    xl={6}
                  >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Last Name'
                      value={lastName}
                      required
                      onChange={(e) => setLastName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group controlId='city' as={Col} sm={6}>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='City'
                      value={city}
                      required
                      onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='street' as={Col} sm={6}>
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='street'
                      value={street}
                      required
                      onChange={(e) => setStreet(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group controlId='state' as={Col} sm={6}>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='state'
                      value={state}
                      required
                      onChange={(e) => setState(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='zip code' as={Col} sm={6}>
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='zip'
                      value={postalCode}
                      required
                      onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Row>

                {}
                <Elements stripe={stripePromise}>
                  <PaymentForm
                    billingDetails={billingDetails}
                    updateBillingInfo={updateBillingInfo}
                  />
                </Elements>
              </Form>
            </Card.Body>
            <Card.Footer
              style={{ border: 'none', backgroundColor: '#e4e4e498' }}
            >
              <strong className='privacy'>
                All payment transactions are handled by Stripe. <br />
                You can view their privacy policy{' '}
                <a href='https://stripe.com/privacy'>Here</a>
              </strong>
            </Card.Footer>
          </Card>
        </FormContainer>
      )}
      <div style={{ marginBottom: '4rem' }}></div>
    </div>
  )
}

export default PaymentScreen
