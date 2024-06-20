import React from 'react';
import { ListGroupItem } from 'reactstrap';
import { IoMdClose } from 'react-icons/io';
import { FiPlus, FiMinus } from 'react-icons/fi';
import '../Cart/Cart-item.css';

import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import useGetData from '../../custom-hook/useGetData';

const CartItem = ({ item }) => {
  const { id, title, price, imgUrl, quantity, totalPrice } = item;
  const { data: productsData } = useGetData('products');
  const product = productsData.find((item) => item.id === id);

  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(id));
  };

  const incrementItem = () => {
    if (!product || quantity >= product.maxQuantity) {
      toast.warning('The maximum quantity has been reached');
      return;
    }
    dispatch(
      cartActions.addItem({
        id,
        title,
        price,
        imgUrl,
      })
    );
  };

  const decreaseItem = () => {
    dispatch(cartActions.removeItem(id));
  };

  return (
    <ListGroupItem className="border-0 cart__item">
      <div className="cart__item-info d-flex gap-2">
        <img src={imgUrl} alt="" />
        <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
          <div>
            <h6 className="cart__product-title">{title}</h6>
            <p className="d-flex align-items-center gap-5 cart__product-price">
              {quantity}px <span>${totalPrice}</span>
            </p>
            <div className="d-flex align-items-center justify-content-between increase__decrease-btn">
              <span className="decrease__btn" onClick={decreaseItem}>
                <FiMinus />
              </span>
              <span className="quantity">{quantity}</span>
              {!product || quantity >= product.maxQuantity ? (
                <span className="increase__btn disabled">
                  <FiPlus />
                </span>
              ) : (
                <span className="increase__btn" onClick={incrementItem}>
                  <FiPlus />
                </span>
              )}
            </div>
          </div>
          <span className="delete__btn" onClick={deleteProduct}>
            <IoMdClose />
          </span>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default CartItem;
