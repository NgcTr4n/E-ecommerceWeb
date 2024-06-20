import React, { useState, useRef } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import Helmet from '../../Components/Helmet/Helmet';
import CommonSection from '../../Components/UI/CommonSection';
import { VscStarFull, VscStarHalf } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import ProductCart from '../../Components/UI/ProductCart';
import useGetData from '../../custom-hook/useGetData';

import '../ProductDetails/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { data: productsData } = useGetData('products');
  const dispatch = useDispatch();

  // const [realatedProduct, setRelatedProduct]=useState('')

  const [rating, setRating] = useState(null);
  const reviewUserRef = useRef('');
  const reviewMsgRef = useRef('');
  const [activeTab, setActiveTab] = useState('desc');

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUserRef.current.value;
    const reviewUserMsg = reviewMsgRef.current.value;

    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };

    console.log(reviewObj);
    toast('Review Submitted');
  };

  const addToCart = (e, product) => {
    e.preventDefault();

    dispatch(
      cartActions.addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        imgUrl: product.imgUrl,
      })
    );

    toast('Product Added Successfully');
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [productsData]);

  const product = productsData.find((item) => item.id === id);
  

  return (
    <section>
      {product && (
        <Helmet title={product.title}>
          <CommonSection title={product.title} />

          <section className="pt-0">
            <Container>
              <Row>
                <Col lg="6">
                  <div className="product__img">
                    <img src={product.imgUrl} alt="" />
                  </div>
                </Col>
                <Col lg="6">
                  <div className="product__details">
                    <h2>{product.title}</h2>
                    <div className="product__rating d-flex align-items-center gap-5 mb-3">
                      <div>
                        <span>
                          {product.rating}{' '}
                          <VscStarFull className="text-primary" />
                          <VscStarFull className="text-primary" />
                          <VscStarFull className="text-primary" />
                          <VscStarFull className="text-primary" />
                          <VscStarHalf className="text-primary" />
                        </span>
                      </div>
                      <div>
                        <span>15 reviews</span>
                      </div>
                    </div>
                    <p>{product.ShortDesc}</p>
                    <h2 className='product__price'>${product.price} <span>Category: {product.category}</span></h2>
                   
                    <div className="product__cart-btn d-flex gap-3 mt-4">
                      <button
                        onClick={(e) => addToCart(e, product)}
                        className="btn btn-primary"
                      >
                        Add to Cart
                      </button>
                      {/* <button className="btn buyproduct__btn">
                        Buy Now
                      </button> */}
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="pt-5 pb-5">
            <Container>
              <div className="product__tabs">
                <ul className="nav nav-pills">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === 'desc' ? 'active' : ''
                      }`}
                      onClick={() => setActiveTab('desc')}
                    >
                      Description
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === 'reviews' ? 'active' : ''
                      }`}
                      onClick={() => setActiveTab('reviews')}
                    >
                      Reviews
                    </button>
                  </li>
                </ul>
                <div className="tab-content mt-4">
                  {activeTab === 'desc' && (
                    <div className="tab-pane fade show active">
                      <h2>Description</h2>
                      <p>{product.Description}</p>
                    </div>
                  )}
                  {activeTab === 'reviews' && (
                    <div className="tab-pane fade show active">
                      <h2>Reviews</h2>
                      <div className="product__reviews">
                        <div className="product__reviews-list">
                          <div className="product__review">
                            <div className="product__review-top d-flex align-items-center justify-content-between">
                              <div className="product__review-user">
                                <strong>John Doe</strong>
                                <span>4/5</span>
                              </div>
                              <div className="product__review-time">
                                <span>2 days ago</span>
                              </div>
                            </div>
                            <div className="product__review-bottom">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                              </p>
                            </div>
                          </div>
                          <div className="product__review">
                            <div className="product__review-top d-flex align-items-center justify-content-between">
                              <div className="product__review-user">
                                <strong>Jane Smith</strong>
                                <span>5/5</span>
                              </div>
                              <div className="product__review-time">
                                <span>5 days ago</span>
                              </div>
                            </div>
                            <div className="product__review-bottom">
                              <p>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="product__review-form">
                          <h4>Write a Review</h4>
                          <form onSubmit={handleReviewSubmit}>
                            <div className="form__group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Your Name"
                                ref={reviewUserRef}
                                required
                              />
                            </div>
                            <div className="form__group">
                              <textarea
                                className="form-control"
                                placeholder="Your Review"
                                ref={reviewMsgRef}
                                required
                              ></textarea>
                            </div>
                            <div className="form__group">
                              <div className="product__rating d-flex flex-align-center">
                                <span
                                  onClick={() => setRating(5)}
                                  className={`rating-item ${
                                    rating === 5 ? 'active' : ''
                                  }`}
                                >
                                  <VscStarFull className="text-primary" />
                                </span>
                                <span
                                  onClick={() => setRating(4)}
                                  className={`rating-item ${
                                    rating === 4 ? 'active' : ''
                                  }`}
                                >
                                  <VscStarFull className="text-primary" />
                                </span>
                                <span
                                  onClick={() => setRating(3)}
                                  className={`rating-item ${
                                    rating === 3 ? 'active' : ''
                                  }`}
                                >
                                  <VscStarFull className="text-primary" />
                                </span>
                                <span
                                  onClick={() => setRating(2)}
                                  className={`rating-item ${
                                    rating === 2 ? 'active' : ''
                                  }`}
                                >
                                  <VscStarFull className="text-primary" />
                                </span>
                                <span
                                  onClick={() => setRating(1)}
                                  className={`rating-item ${
                                    rating === 1 ? 'active' : ''
                                  }`}
                                >
                                  <VscStarHalf className="text-primary" />
                                </span>
                              </div>
                            </div>
                            <button
                              type="submit"
                              className="btn btn-primary"
                            >
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </section>

          {/* <CommonSection title="Related Products" /> */}

          <section className="pt-0 text_relatedproducts">
            <h2>Related Products</h2>
            <Container>
              <Row>
                {productsData.filter((item) => item.productportfolio === product.productportfolio && item.id !== id)
                .map((item) => (
                  <ProductCart key={item.id} item={item} />
                ))}
              </Row>
            </Container>
          </section>
        </Helmet>
      )}
    </section>
  );
};

export default ProductDetails;
