import React , { useRef } from 'react'
import '../Header/Header.css'
import { Container, Row } from 'reactstrap'
import { VscMenu, VscChromeClose } from "react-icons/vsc";
// import { IoIosSearch } from "react-icons/io";
import { BiCartAlt } from "react-icons/bi";

import { RiAccountCircleFill, RiAccountCircleLine } from "react-icons/ri";

import logo from '../../img/Logo/Logo.png'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import useAuth from '../../custom-hook/useAuth';
import { auth } from '../../firebase.config';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

import { cartUiActions } from '../../redux/slices/cartUiSlice';

const Header = () => {

  const { currentUser } = useAuth();
  const profileActionRef = useRef(null);
  const navigate = useNavigate();
  const navRef = useRef();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch()

  const toggleCart = ()=>{
    dispatch(cartUiActions.toggle())
  }

  // const navigateToCart = () => {
  //   navigate('/cart');
  // };

  const totalProfileActions = () => {
    profileActionRef.current.classList.toggle('show_profileActions');
  };

  const logout =()=>{
    signOut(auth).then(()=>{
      toast.success('Logged out')
      navigate('/home')
    }).catch(err=>{
      toast.error(err.message)
    })
  }

  const showNavBar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  return <header className='header'>
    <Container>
      <Row>
        <div className='Main_header'>
        <div className='nav__wrapper'>
          <div className="menu">
            <nav className="menu_list" ref={navRef}>
            <button className='nav-btn nav-close-btn' onClick={showNavBar}><VscChromeClose /></button>
            <a href="/home">Home</a>
              <a href="/contacts">Contacts</a>
              <a href="/shop">Online shop</a>
              <a href="/shopping-cart">Cart</a>
              <a href="/projects">About us</a>
            </nav>
            <button className='nav-btn' onClick={showNavBar}><VscMenu /></button>
          </div>
        
          <div className='logo'><img src={logo} alt="logo" srcset="" /></div>
          <div className='navigation'>
            <ul className="item">
            {/* <div class="search-container">
        <input type="text" name="search" placeholder="Search........." class="search-input" />
                <IoIosSearch />
                </div> */}
       

              <div className='cart-container' onClick={toggleCart}>
              <li className="cart_item">
                <BiCartAlt  /> 
              
              </li><span className='badge'>{totalQuantity}</span>
              </div>

              <div className="account-container">
                    <li>
                      <button className="profile" onClick={totalProfileActions}>
                      {currentUser ? <RiAccountCircleFill /> : <RiAccountCircleLine />}
                      </button> 
                    </li>
                    <div className="profile__actions" ref={profileActionRef} onClick={totalProfileActions}>
                        {currentUser ? (
                        <div className='d-flex align-items-center justify-content-center flex-column profile_user'>
                           <img src={ currentUser && currentUser.photoURL} alt="" />
                           <h2>{ currentUser && currentUser.displayName}</h2>
                           <p>{ currentUser && currentUser.email}</p>
                          <button onClick={logout}>Logout</button>
                          </div>
                        ) : (
                          <div className='d-flex align-items-center justify-content-center flex-column profile_account'>
                           <Link to="/signup">Signup</Link>
                           <Link to="/login">Login</Link>
                          </div>
                        )}
                      </div>
                  </div>
            </ul>
          </div>
       
        </div>
        </div>
      </Row>
      </Container>
    </header>
  
};

export default Header