// Dependencies
import React from 'react'
// Components
import { Row, Col, Container } from 'react-bootstrap'

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} lg={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
