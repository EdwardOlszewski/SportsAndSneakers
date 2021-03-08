import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Header
import Header from './components/Header'
// User Screens
import HomeScreen from './userScreens/HomeScreen'
import VideoScreen from './userScreens/VideoScreen'
import ShopScreen from './userScreens/ShopScreen'
import PictureScreen from './userScreens/PictureScreen'
// Admin screens
import AdminLoginScreen from './adminScreens/AdminLoginScreen'
// Footer
import Footer from './components/Footer'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='main-body'>
        <div className='mainContainer'>
          <Route path='/store' component={ShopScreen} />

          <Route path='/pictures' component={PictureScreen} exact />
          <Route
            path='/pictures/page/:pageNumber'
            component={PictureScreen}
            exact
          />

          <Route path='/videos' component={VideoScreen} exact />
          <Route
            path='/videos/page/:pageNumber'
            component={VideoScreen}
            exact
          />

          <Route path='/admin' component={AdminLoginScreen} exact />
          <Route path='/' component={HomeScreen} exact />
        </div>
      </main>
      <Footer />
    </Router>
  )
}

export default App
