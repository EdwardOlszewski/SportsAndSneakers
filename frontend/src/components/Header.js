import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Image, Nav, NavDropdown, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import bannerPic from '../images/bannerIMG.png'
import { Link } from 'react-scroll'
import WindowSize from '../components/WindowSize'

const Header = ({ match }) => {
  // Assign useDispatch hook to dispatch action
  const dispatch = useDispatch()

  const [expanded, setExpanded] = useState(false)

  const size = WindowSize()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      fixed='top'
      className='header'
      expanded={expanded}
      variant='dark'
    >
      <Container>
        <Link to='home' spy={true} smooth={true}>
          <Image src={bannerPic}></Image>
        </Link>

        <Navbar.Toggle
          aria-controls='basic-navbar-nav'
          onClick={() => setExpanded(expanded ? false : 'expanded')}
          style={{ border: 'none' }}
        />

        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            {size.width <= 990 ? (
              <div>
                <a href='/#home' onClick={() => setExpanded(false)}>
                  <h6 className='nav-links'>
                    <i className='fas fa-home'></i> Home
                  </h6>
                </a>

                <a href='/#videos' onClick={() => setExpanded(false)}>
                  <h6 className='nav-links'>
                    <i className='fas fa-video'></i> Videos
                  </h6>
                </a>

                <a href='/#podcasts' onClick={() => setExpanded(false)}>
                  <h6 className='nav-links'>
                    <i className='fas fa-microphone-alt'></i> Podcasts
                  </h6>
                </a>

                <a href='/#pictures' onClick={() => setExpanded(false)}>
                  <h6 className='nav-links'>
                    <i className='fas fa-image'></i> Gallery
                  </h6>
                </a>

                <LinkContainer to='/shop' onClick={() => setExpanded(false)}>
                  <h6 className='nav-links'>
                    <i className='fas fa-store'></i> Shop
                  </h6>
                </LinkContainer>

                <LinkContainer to='/cart' onClick={() => setExpanded(false)}>
                  <h6 className='nav-links'>
                    <i className='fas fa-shopping-cart'></i> cart
                  </h6>
                </LinkContainer>

                {userInfo ? (
                  <NavDropdown
                    title={
                      <span className='nav-links'>
                        <i className='fas fa-user-cog'></i> {userInfo.firstName}
                      </span>
                    }
                    id='username'
                  >
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/login'>
                    <h6 className='nav-links'>
                      <i className='fas fa-user'></i> Sign In
                    </h6>
                  </LinkContainer>
                )}

                {userInfo && userInfo.isAdmin && (
                  <NavDropdown
                    title={
                      <span className='nav-links'>
                        <i className='fas fa fa-cogs'></i> Admin
                      </span>
                    }
                    id='adminmenu'
                  >
                    <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/productlist'>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/doneorderlist'>
                      <NavDropdown.Item>Done Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </div>
            ) : null}
          </Nav>
          <div className='nav-socials'>
            <a href='https://www.youtube.com/channel/UCzeV03hagrR7mtE30TqpQ8g?app=desktop&fbclid=IwAR0IM2Eb7dusBTrzWbndeXnxAjvwP3m70uiFx6zTteOQ9Csd7-CpEtY8JTk'>
              <h6 className='nav-icon'>
                <i className='fab fa-youtube-square'></i>
              </h6>
            </a>

            <a href='https://www.facebook.com/SportsandSneakers21'>
              <h6 className='nav-icon'>
                <i className='fab fa-facebook-square'></i>
              </h6>
            </a>

            <a href='https://www.instagram.com/sportsandsneakers2021'>
              <h6 className='nav-icon'>
                <i className='fab fa-instagram-square'></i>
              </h6>
            </a>

            <a href='mailto:sportsandsneakers2021@gmail.com'>
              <h6 className='nav-icon'>
                <i className='fas fa-envelope-square'></i>
              </h6>
            </a>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header

/*

   <Navbar.Brand href='/'>
            <Image src={bannerPic}></Image>
          </Navbar.Brand>

*/
