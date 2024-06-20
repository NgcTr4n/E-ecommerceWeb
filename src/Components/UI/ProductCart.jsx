import React, { useState } from 'react';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice';
// import products from '../../assets/data/products'
import { toast } from 'react-toastify';
// import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';


import '../UI/ProductCart.css';

const ProductCart = ({ item }) => {
  // const { data: productsData } = useGetData('products');
  // const [data, setData] = useState(products)
  const dispatch = useDispatch();
  const [showInfo, setShowInfo] = useState(false);
  const [quantity] = useState(1);

  const handleMouseOver = () => {
    setShowInfo(true);
  };

  const handleMouseOut = () => {
    setShowInfo(false);
  };

  const addToCart = async (e) => {
    e.preventDefault();

   
    if (quantity <= 0) {
      toast.error('Quantity must be at least 1');
      return;
    }

    if (item.maxQuantity === 0) {
      toast.error('Cannot add item to cart. Maximum quantity is 0');
      return;
    }

    if (quantity > item.maxQuantity) {
      toast.error('Cannot add more than the available quantity');
      return;
    }

    dispatch(cartActions.addItem({
      id: item.id,
      title: item.title,
      price: item.price,
      imgUrl: item.imgUrl,
      quantity: quantity,
    }))
    
    toast('Product added successfully')

    // e.preventDefault();
    // try {
    //   const docRef = collection(db, 'carts');
    //   await addDoc(docRef, {
    //     title: item.Title,
    //     price: item.Price,
    //     imgUrl: item.imgUrl,
    //   });
    //   toast('Product Successfully Added!');
    // } catch (error) {
    //   toast.error('Product Not Added!');
    // }
  
  };


  // const isQuantityZero = quantity === 0;
  // const isQuantityExceeded = quantity >= item.maxQuantity;

  return (
    <Col lg="3" md="4">
      <section>
        
          <div key={item.id} className={"product_item"}>
            <div className="product_img">
              <div className="box">
                <div className="wrapper">
                  <div className="bg">
                    <img src="" alt="" /> {/* Empty src attribute */}
                  </div>
                  <div className="product">
                        <Link to={`/shop/${item.id}`}>
                      <img
                        src={item.imgUrl}
                        alt=""
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-content">
                    <Link to={`/shop/${item.id}`}>
                  <h4>
                    {item.title} <span>${item.price}</span>
                  </h4>
                </Link>
              </div>
              {showInfo && <span className="info">{item.ShortDesc}</span>}
            </div>
            <div className="product_card-bottom d-flex align-items-center justify-content-between p-0">
             
              <div
                onClick={addToCart}
                className='addtocart'
              >
                Add To Cart
              </div>
            </div>
          </div>
      
      </section>
    </Col>
  );
};

export default ProductCart;
