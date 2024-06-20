import React from 'react'
import { ListGroup } from 'reactstrap'
import CartItem from './CartItem'
import { IoMdClose } from "react-icons/io";
import '../Cart/Cart.css'

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { cartUiActions } from '../../redux/slices/cartUiSlice';
import { cartActions } from '../../redux/slices/cartSlice';

const Cart = () => {

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItem);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const toggleCart = ()=>{
    dispatch(cartUiActions.toggle())
  }



  return <div className="cart__container">
      <ListGroup className='cart'>
        <div className="cart__close">
        <span onClick={toggleCart}><IoMdClose/></span>
        </div>

        <div className="cart__item-list">
        {cartItems.length === 0 ? 
            (<h6 className="text-center mt-5">No items added to the cart</h6>)
          : 
           ( cartItems.map((item) => (
              <CartItem item={item} key={item.id} />
            )))
          }
        </div>

        <div className="cart__bottom d-flex align-items-center justify-content-between">
          <h6>Subtotal: <span>${totalAmount}</span></h6>
          <button><Link to='/shopping-cart'>Shopping Cart</Link></button>
        </div>
      </ListGroup>
  </div>
}

export default Cart