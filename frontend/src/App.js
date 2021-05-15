import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Headers
import Header from './components/Header'
// User Screens
import HomeScreen from './userScreens/HomeScreen'
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
          <Route path='/admin' component={AdminLoginScreen} exact />
          <Route path='/' component={HomeScreen} exact />
        </div>
      </main>
      <Footer />
    </Router>
  )
}

export default App
