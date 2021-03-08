import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Image, Nav, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = ({ match }) => {
  // Assign useDispatch hook to dispatch action
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      style={{
        backgroundColor: '#e41b23',
        boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Navbar.Brand href='/'>
        <Image src={require('../images/bannerIMG.png')}></Image>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto' style={{ fontSize: '120%' }}>
          <Nav.Link
            href='/videos'
            className='nav-links'
            style={{ color: 'white', fontSize: '1rem' }}
          >
            <i className='fas fa-video'></i> Videos
          </Nav.Link>
          <Nav.Link
            href='/pictures'
            className='nav-links'
            style={{ color: 'white', fontSize: '1rem' }}
          >
            <i className='fas fa-image'></i> Pictures
          </Nav.Link>
          <Nav.Link
            href='/store'
            className='nav-links'
            style={{ color: 'white', fontSize: '1rem' }}
          >
            <i className='fas fa-store'></i> Shop
          </Nav.Link>

          {userInfo && userInfo.isAdmin && (
            <NavDropdown title='Admin' style={{ color: 'white' }}>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>

        <div className='nav-icons'>
          <a href='https://www.instagram.com/sportsandsneakers2021'>
            <i className='fab fa-youtube-square'></i>
          </a>
          <a href='https://www.instagram.com/sportsandsneakers2021'>
            <i className='fab fa-instagram-square'></i>
          </a>
          <a href='mailto:sportsandsneakers2021@gmail.com' className='icon'>
            <i className='fas fa-envelope-square'></i>
          </a>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
