import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Headers
import Header from './components/Header'
import SecondHeader from './components/SecondHeader'

// User Screens
import HomeScreen from './userScreens/HomeScreen'
import LoginScreen from './userScreens/LoginScreen'
import RegisterScreen from './userScreens/RegisterScreen'
import ShopScreen from './userScreens/ShopScreen'
import ProductScreen from './userScreens/ProductScreen'
import CartScreen from './userScreens/CartScreen'
import ShippingScreen from './userScreens/ShippingScreen'
import PlaceOrderScreen from './userScreens/PlaceOrderScreen'
import PaymentScreen from './userScreens/PaymentScreen'
import OrderScreen from './userScreens/OrderScreen'
import ProfileScreen from './userScreens/ProfileScreen'

// Admin screens
import AdminLoginScreen from './adminScreens/AdminLoginScreen'
import UserListScreen from './adminScreens/UserListScreen'
import UserEditScreen from './adminScreens/UserEditScreen'
import ProductListScreen from './adminScreens/ProductListScreen'
import ProductEditScreen from './adminScreens/ProductEditScreen'
import DoneOrderListScreen from './adminScreens/DoneOrderListScreen'
import OrderListScreen from './adminScreens/OrderListScreen'
// Footer
import Footer from './components/Footer'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Fragment>
          <Header />
          <SecondHeader />
          <main className='main-body'>
            <div className='mainContainer'>
              <Route path='/profile' component={ProfileScreen} />
              <Route path='/order/:id' component={OrderScreen} />
              <Route path='/payment/:id' component={PaymentScreen} />
              <Route path='/placeorder' component={PlaceOrderScreen} />
              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/cart/:id?' component={CartScreen} />
              <Route path='/product/:id' component={ProductScreen} exact />
              <Route path='/shop' component={ShopScreen} exact />
              <Route
                path='/admin/orderlist'
                component={OrderListScreen}
                exact
              />
              <Route
                path='/admin/doneorderlist'
                component={DoneOrderListScreen}
                exact
              />
              <Route
                path='/admin/product/:id/edit'
                component={ProductEditScreen}
                exact
              />
              <Route
                path='/admin/productlist'
                component={ProductListScreen}
                exact
              />
              <Route
                path='/admin/user/:id/edit'
                component={UserEditScreen}
                exact
              />
              <Route path='/admin/userlist' component={UserListScreen} exact />
              <Route path='/admin' component={AdminLoginScreen} exact />
              <Route path='/' component={HomeScreen} exact />
            </div>
          </main>
          <Footer />
        </Fragment>
      </Switch>
    </Router>
  )
}

export default App
