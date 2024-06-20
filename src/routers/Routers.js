import React from 'react'
import { Routes, Route , Navigate } from 'react-router-dom'

import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import Payment from '../Pages/Payment/Payment'
import ProductDetails from '../Pages/ProductDetails/ProductDetails'
import Projects from '../Pages/Projects/Projects'
import Shop from '../Pages/Shop/Shop'
import Signup from '../Pages/Signup/Signup'
import Cart from '../Pages/Cart/Cart'
import Shoppingcart from '../Pages/Cart/Shopping-cart'
import Orders from '../admin/Orders'
import CheckOrder from '../Pages/Payment/CheckOrder'
import Contacts from '../Pages/Contacts/Contacts'

import ProtectedRoute from './ProtectedRoute'
import ProtectedRouteAd from './ProtectedRouteAd'


//admin
import AddProducts from '../admin/AddProducts'
import AllProducts from '../admin/AllProducts'
import Dashboard from '../admin/Dashboard'
import Users from '../admin/Users'
import SignupAd from '../admin/SignupAd'
import LoginAd from '../admin/LoginAd'

const Routers = () => {
  return <Routes>
    <Route path='/' element={<Navigate to ='/home'/>}/>
        <Route path='home' element={<Home/>}/>
        <Route path='shop/:id' element={<ProductDetails/>}/>
        <Route path='projects' element={<Projects/>}/>
        <Route path='shop' element={<Shop/>}/>
        <Route path='shopping-cart' element={<Shoppingcart/>}/>
        <Route path='contacts' element={<Contacts/>}/>


        {/* <Route path='payment' element={ 
        <ProtectedRoute>
          <Payment />
        </ProtectedRoute> 
           }/> */}


        <Route path='/*' element ={<ProtectedRoute/>}>
          <Route path='payment' element={<Payment />} />
          <Route path='check-order' element={<CheckOrder/>}/>
          </Route>

          <Route path='/*' element ={<ProtectedRouteAd/>}>
        <Route path='dashboard' element={<Dashboard />}/>
            <Route path='dashboard/all-products' element={<AllProducts />}/>
            <Route path='dashboard/add-products' element={<AddProducts />}/>
            <Route path="dashboard/users" element={<Users/>} />
            <Route path="dashboard/orders" element={<Orders/>} />
            </Route>


            <Route path='dashboard/signupad' element={<SignupAd/>}/>
        <Route path='dashboard/loginad' element={<LoginAd/>}/>

        

        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
        

  </Routes>
}

export default Routers