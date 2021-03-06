import React from 'react'
import { Container, Card, Row, Col, Image } from 'react-bootstrap'

const HomeScreen = () => {
  return (
    <Container>
      <Row>
        <Col sm={12} md={12} lg={6} xl={6} style={{ marginTop: '2rem' }}>
          <Card className='profile-cards'>
            <Card.Body>
              <Image
                className='profile-pic'
                src={require('./profilePic.jpg')}
              ></Image>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={12} lg={6} xl={6} style={{ marginTop: '2rem' }}>
          <Card className='profile-cards'>
            <Card.Title style={{ padding: '1.2rem', textAlign: 'center' }}>
              Evan Kay
            </Card.Title>
            <Card.Body style={{ marginTop: '-2rem' }}>
              <h6>Who I am:</h6>
              Hey what’s up? My name is Evan and thank you for visiting my page.
              Some background information on me, I’m a sneaker head and amateur
              MMA fighter. I’ve competed in multiple sports for 17 years of my
              life. I’m a sports and sneakers enthusiast, I love to gain and
              share knowledge regarding sports and sneakers. If you love sports,
              sports talk, sneakers, or both then you’re in the right place.
              <br />
              <br />
              <h6>What I do:</h6>
              I make YouTube videos and content on social media and share
              information about sports news, updates, debates, as well as
              sneaker news, updates, unboxings, and reviews. I cover sneaker
              releases, customs, my own customs and also sports news like
              Football, Baseball, Basketball, and MMA. As always, I give my own
              thoughts and opinions and listen to yours. I love engaging with
              everyone and talking about both sports and sneakers in hopes that
              a community will be created and it builds bigger and bigger over
              time. <br /> <br />
              <h6>Where to find me:</h6>
              Visit my YouTube channel Sports and Sneakers, consider subscribing
              and giving me a follow on social media! Stay tuned and have a
              great day.
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default HomeScreen
