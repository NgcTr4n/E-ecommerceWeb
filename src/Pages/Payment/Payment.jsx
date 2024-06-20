import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import Helmet from '../../Components/Helmet/Helmet';
import CommonSection from '../../Components/UI/CommonSection';
import '../Payment/Payment.css';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../../redux/slices/orderReducer';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../firebase.config';
import { cartActions } from '../../redux/slices/cartSlice';
import useGetData from '../../custom-hook/useGetData';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../custom-hook/useAuth';

const Payment = () => {
  const { data: productsData } = useGetData('products');
  const cartItems = useSelector((state) => state.cart.cartItem);
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [shippingCost, setShippingCost] = useState(0);
  const [enterName, setEnterName] = useState('');
  const [enterEmail, setEnterEmail] = useState('');
  const [enterNumber, setEnterNumber] = useState('');
  const [enterCountry, setEnterCountry] = useState('');
  const [enterCity, setEnterCity] = useState('');
  const [enterAddress, setEnterAddress] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useAuth();

  const resetCart = () => {
    dispatch(cartActions.resetCart());
  };

  const updateProductQuantities = async () => {
    for (const cartItem of cartItems) {
      const product = productsData.find((item) => item.id === cartItem.id);

      if (product) {
        const newQuantity = product.maxQuantity - cartItem.quantity;

        await updateDoc(doc(db, 'products', product.id), {
          maxQuantity: newQuantity,
        });
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const checkOutTime = new Date(); // Lấy thời gian hiện tại trên máy tính

      const docRef = await addDoc(collection(db, 'orders'), {
        uid: currentUser.uid,
        name: enterName,
        email: enterEmail,
        phone: enterNumber,
        country: enterCountry,
        city: enterCity,
        address: enterAddress,
        items: cartItems,
        totalAmount: totalAmount + shippingCost,
        checkOutTime: checkOutTime.toISOString(),
      });

      const order = {
        id: docRef.id,
        shippingAddress: {
          name: enterName,
          email: enterEmail,
          phone: enterNumber,
          country: enterCountry,
          city: enterCity,
          address: enterAddress,
        },
        items: cartItems,
        totalAmount: totalAmount + shippingCost,
        checkOutTime: checkOutTime.toISOString(),
      };

      dispatch(createOrder(order));

      await updateProductQuantities();

      resetCart();

      toast.success('Order placed successfully!');
      navigate('/check-order');
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Failed to place the order.');
    }
  };

  return (
    <Helmet title='Payment'>
      <CommonSection title='Checkout' />

      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <h5 className='shipping__information'>Shipping Information</h5>
              <Form className='shipping__form' onSubmit={submitHandler}>
                <FormGroup className='form__group'>
                  <input
                    type='text'
                    placeholder='Enter your name'
                    required
                    onChange={(e) => setEnterName(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input
                    type='email'
                    placeholder='Enter your email'
                    required
                    onChange={(e) => setEnterEmail(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input
                    type='text'
                    placeholder='Phone number'
                    required
                    onChange={(e) => setEnterNumber(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input
                    type='text'
                    placeholder='Street address'
                    id='addressInput'
                    required
                    onChange={(e) => setEnterAddress(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input
                    type='text'
                    placeholder='City'
                    required
                    onChange={(e) => setEnterCity(e.target.value)}
                  />
                  <p>Shipping Cost: ${shippingCost}</p>
                </FormGroup>

                <FormGroup className='form__group'>
                  <input
                    type='text'
                    placeholder='Country'
                    required
                    onChange={(e) => setEnterCountry(e.target.value)}
                  />
                </FormGroup>

                <button type='submit' className='btn_shipping auth__btn'>
                  Payment
                </button>
              </Form>
            </Col>

            <Col lg='4'>
              <div className='checkout__cart'>
                <h6>
                  Subtotal: <span>${totalAmount}</span>
                </h6>
                <h6>
                  Total Quantity: <span>{totalQty} items</span>
                </h6>
                <h6>
                  Shipping: <br />
                  {totalAmount > 5000 ? (
                    <span>Free Shipping</span>
                  ) : (
                    <span>${shippingCost}</span>
                  )}
                </h6>
                <h4>
                  Total Cost: <span>${totalAmount + shippingCost}</span>
                </h4>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Payment;
