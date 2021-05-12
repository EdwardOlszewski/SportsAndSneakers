import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Image, Nav, NavDropdown, Container } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import bannerPic from '../images/bannerIMG.png'
import { Link } from 'react-scroll'

const Header = ({ match }) => {
  // Assign useDispatch hook to dispatch action
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Navbar collapseOnSelect expand='lg' fixed='top' className='header'>
      <Container>
        <Link to='home' spy={true} smooth={true}>
          <Navbar.Brand href='/'>
            <Image src={bannerPic}></Image>
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <li>
              <Nav.Link href='/'>
                <Link to='videos' spy={true} smooth={true}>
                  <h6 className='nav-links'>
                    <i className='fas fa-video'></i> Videos
                  </h6>
                </Link>
              </Nav.Link>
            </li>

            <li>
              <Nav.Link href='/'>
                <Link to='podcasts' spy={true} smooth={true}>
                  <h6 className='nav-links'>
                    <i className='fas fa-microphone-alt'></i> Podcasts
                  </h6>
                </Link>
              </Nav.Link>
            </li>
            <li>
              <Nav.Link href='/'>
                <Link to='pictures' spy={true} smooth={true}>
                  <h6 className='nav-links'>
                    <i className='fas fa-image'></i> Gallery
                  </h6>
                </Link>
              </Nav.Link>
            </li>

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' style={{ color: 'white' }}>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          <div>
            <>
              <a href='https://www.youtube.com/channel/UCzeV03hagrR7mtE30TqpQ8g?app=desktop&fbclid=IwAR0IM2Eb7dusBTrzWbndeXnxAjvwP3m70uiFx6zTteOQ9Csd7-CpEtY8JTk'>
                <h6 className='nav-icon'>
                  <i className='fab fa-youtube-square'></i>
                </h6>
              </a>
            </>

            <>
              <a href='https://www.instagram.com/sportsandsneakers2021'>
                <h6 className='nav-icon'>
                  <i className='fab fa-instagram-square'></i>
                </h6>
              </a>
            </>
            <>
              <a href='mailto:sportsandsneakers2021@gmail.com'>
                <h6 className='nav-icon'>
                  <i className='fas fa-envelope-square'></i>
                </h6>
              </a>
            </>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
