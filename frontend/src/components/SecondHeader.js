import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import { Link } from 'react-scroll'
import WindowSize from '../components/WindowSize'

const Header = () => {
  // Assign useDispatch hook to dispatch action
  const dispatch = useDispatch()

  console.log(window.location.href)

  const size = WindowSize()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div>
      {size.width < 990 ? null : (
        <Navbar
          collapseOnSelect
          expand='lg'
          fixed='top'
          className='secondHeader'
        >
          <Container>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='center'>
                <a href='/#home' className='nav-a'>
                  <h6 className='nav-links'>
                    <i className='fas fa-home'></i> Home
                  </h6>
                </a>

                <a href='/#videos' className='nav-a'>
                  <h6 className='nav-links'>
                    <i className='fas fa-video'></i> Videos
                  </h6>
                </a>

                <a href='/#podcasts' className='nav-a'>
                  <h6 className='nav-links'>
                    <i className='fas fa-microphone-alt'></i> Podcasts
                  </h6>
                </a>

                <a href='/#pictures' className='nav-a'>
                  <h6 className='nav-links'>
                    <i className='fas fa-image'></i> Gallery
                  </h6>
                </a>

                <LinkContainer to='/shop' className='nav-a'>
                  <h6 className='nav-links'>
                    <i className='fas fa-store'></i> Shop
                  </h6>
                </LinkContainer>

                <LinkContainer to='/cart' className='nav-a'>
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
                  <LinkContainer to='/login' className='nav-a'>
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
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  )
}

export default Header

/*

   <Navbar.Brand href='/'>
            <Image src={bannerPic}></Image>
          </Navbar.Brand>

*/
