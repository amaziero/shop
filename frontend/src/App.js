import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from "./components/Footer"
import Header from "./components/Header"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen"
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'

import UserListScreen from './screens/admin/UserListScreen'
import UserEditScreen from './screens/admin/UserEditScreen'
import ProductListScreen from './screens/admin/ProductListScreen'
import ProductEditScreen from './screens/admin/ProductEditScreen'

function App() {
  return (
    <Router >
      <>
        <Header />
          <main className='py-3'>
            <Container >
              <Route path='/login' component={LoginScreen} />
              <Route path='/order/:id' component={OrderScreen} />
              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/placeorder' component={PlaceOrderScreen} />
              <Route path='/payment' component={PaymentScreen} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/profile' component={ProfileScreen} />
              <Route path='/product/:id' component={ProductScreen} />
              <Route path='/cart/:id?' component={CartScreen} />
              <Route path='/' component={HomeScreen} exact />
              
              <Route path='/admin/userList' component={UserListScreen} />
              <Route path='/admin/user/:id/edit' component={UserEditScreen} />
              <Route path='/admin/productList' component={ProductListScreen} />
              <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
            </Container>
          </main>
        <Footer />
      </>
    </Router>
  );
}

export default App;
