

import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../routers/Routers'
import AdminNav from '../../admin/AdminNav'
import Cart from '../../Pages/Cart/Cart'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Layout = () => {

  const showCart = useSelector(state=> state.cartUi.cartIsVisible)
  const location =  useLocation();
  return <>
    {
            location.pathname.startsWith('/dashboard') ? <AdminNav />
                : <Header/>
                     
        }
        {
          showCart &&         <Cart/>
        }

    
    <div>
        <Routers/>
    </div>
    <Footer/>
  </>
}

export default Layout