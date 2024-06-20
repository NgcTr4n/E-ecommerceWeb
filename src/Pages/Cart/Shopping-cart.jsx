import React, {useState} from 'react';
import '../Cart/Cart.css';
import Helmet from '../../Components/Helmet/Helmet';
import CommonSection from '../../Components/UI/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { AiFillDelete } from 'react-icons/ai';
import { cartActions } from '../../redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import '../Cart/Shopping-cart.css'
import useAuth from '../../custom-hook/useAuth';

// import useGetData from '../../custom-hook/useGetData';

const Shoppingcart = () => {
  // const { data: productsData } = useGetData('products');

  const cartItems = useSelector(state => state.cart.cartItem);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const dispatch = useDispatch();


  // Calculate the total quantity of all items in the cart
  const totalQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />

      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">No item added to the cart!</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal <span className="fs-4 fw-bold">${totalAmount}</span>
                </h6>
                <h6>Total Quantity: {totalQuantity}</h6> {/* Display the total quantity */}
              </div>

              <div>
                <button className="buy__btn">
                  <Link to="/payment">Check Out</Link>
                  {/* {
                    payNow && (
                        <div>
                            <StripeCheckout
                            stripeKey="sk_test_51NIt33EyRkkoY13yRSuN7Ogs9wx3iOprhwkP2e6OHizYJez0FjwcfUygOzTXFC74fCSf8DSNAiHqVw5lERgmjdRp00cPfFYJc8"
                            name="Online Shopping"
                            amount ={totalAmount * 100}
                            label = "Payment"
                            description = {`Your Payment amount is $${totalAmount}`}
                            />
                        </div>
                    )
                  } */}
                </button>
                <button className="buy__btn">
                  <Link to="/shop">Continue Shopping</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();


  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };



  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt="" />
      </td>
      <td className="text">{item.title}</td>
      <td className="text">${item.price}</td>
      <td className="text" >              
      {
        item.quantity
      }px
      </td>
      <td onClick={deleteProduct}><AiFillDelete/></td>
    </tr>
  );
};

export default Shoppingcart;
