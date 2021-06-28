// Dependencies
import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
// Components
import { Nav, Card } from 'react-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Card className='check-steps'>
      <Nav className='check-steps-nav'>
        <Nav.Item>
          {step1 ? (
            <div>
              <LinkContainer to='/login'>
                <Nav.Link className='links'>
                  <strong> Sign In </strong>
                </Nav.Link>
              </LinkContainer>
            </div>
          ) : (
            <Nav.Link className='links-disabled'>Sign In</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step2 ? (
            <LinkContainer to='/shipping'>
              <Nav.Link className='links'>
                <strong>Shipping </strong>
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link className='links-disabled'>Shipping</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step3 ? (
            <LinkContainer to='/placeorder'>
              <Nav.Link className='links'>
                <strong> Review </strong>
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link className='links-disabled'>Review</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step4 ? (
            <LinkContainer to='/payment'>
              <Nav.Link className='links'>
                <strong> Payment </strong>
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link className='links-disabled'>Payment</Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </Card>
  )
}

export default CheckoutSteps
