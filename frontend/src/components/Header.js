import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Image, Nav, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import bannerPic from '../images/bannerIMG.png'

const Header = ({ match }) => {
  // Assign useDispatch hook to dispatch action
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Navbar collapseOnSelect expand='lg' className='header'>
      <Navbar.Brand href='/'>
        <Image src={bannerPic}></Image>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='/videos'>
            <h7 className='nav-links'>
              <i className='fas fa-video'></i> Videos
            </h7>
          </Nav.Link>
          <Nav.Link href='/pictures'>
            <h7 className='nav-links'>
              <i className='fas fa-image'></i> Pictures
            </h7>
          </Nav.Link>
          <Nav.Link href='/store'>
            <h7 className='nav-links'>
              <i className='fas fa-store'></i> Shop
            </h7>
          </Nav.Link>

          {userInfo && userInfo.isAdmin && (
            <NavDropdown title='Admin' style={{ color: 'white' }}>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>

        <div>
          <a href='https://www.youtube.com/channel/UCzeV03hagrR7mtE30TqpQ8g?app=desktop&fbclid=IwAR0IM2Eb7dusBTrzWbndeXnxAjvwP3m70uiFx6zTteOQ9Csd7-CpEtY8JTk'>
            <h7 className='nav-icon'>
              <i className='fab fa-youtube-square'></i>
            </h7>
          </a>
          <a href='https://www.instagram.com/sportsandsneakers2021'>
            <h7 className='nav-icon'>
              <i className='fab fa-instagram-square'></i>
            </h7>
          </a>
          <a href='mailto:sportsandsneakers2021@gmail.com'>
            <h7 className='nav-icon'>
              <i className='fas fa-envelope-square'></i>
            </h7>
          </a>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
