import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import Helmet from '../../Components/Helmet/Helmet';
import CommonSection from '../../Components/UI/CommonSection';
import useGetData from '../../custom-hook/useGetData';
import useAuth from '../../custom-hook/useAuth';
import '../Payment/Checkorder.css';
import { GiConfirmed } from 'react-icons/gi';
import { TbTruckDelivery } from 'react-icons/tb';
import { FiUserCheck } from 'react-icons/fi';
import { BsBox2Heart } from 'react-icons/bs';

const OrderCheck = () => {
  const { currentUser } = useAuth();
  const { data: ordersData } = useGetData('orders');

  const orders = ordersData.filter((item) => item.uid === currentUser.uid); // Filter orders belonging to the current user

  orders.forEach((order) => {
    console.log(order.id);
  });
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleShowForm = (productId) => {
    setSelectedProduct(productId);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setSelectedProduct(null);
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const renderActiveSteps = (status) => {
    const steps = [
      { icon: <GiConfirmed />, text: 'Order confirmed' },
      { icon: <FiUserCheck />, text: 'Picked by courier' },
      { icon: <TbTruckDelivery />, text: 'On the way' },
      { icon: <BsBox2Heart />, text: 'Ready for pickup' },
    ];

    let activeSteps = [];

    if (status) {
      switch (status.toLowerCase()) {
        case 'confirmed':
          activeSteps = steps.slice(0, 1);
          break;
        case 'preparing':
          activeSteps = steps.slice(0, 2);
          break;
        case 'shipping':
          activeSteps = steps.slice(0, 3);
          break;
        case 'completed':
          activeSteps = steps;
          break;
        default:
          activeSteps = [];
          break;
      }
    }

    return activeSteps;
  };

  return (
    <Helmet title="Order Check">
      <CommonSection title="Order Check" />
      <Container>
        <Row>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Order Number</th>
                  <th>Time</th>
                  <th>Order ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.checkOutTime}</td>
                    <td>
                      <a href="#" onClick={() => handleShowForm(order.id)}>
                        {order.id}
                      </a>
                    </td>
                    <td>
                      <span className={`status ${order.status?.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showForm && orders.length > 0 && (
              <>
                {orders.map((order) => {
                  if (order.id === selectedProduct) {
                    return (
                      <div className="container-fluid my-5 d-sm-flex justify-content-center" key={order.id}>
                        <div className="card px-2">
                          <div className="card-header bg-white">
                            <div className="row justify-content-between">
                              <div className="col">
                                <p className="text-muted">
                                  Order ID <span className="font-weight-bold text-dark">{order.id}</span>
                                </p>
                                <p className="text-muted">
                                  Place On{' '}
                                  <span className="font-weight-bold text-dark">
                                    {(() => {
                                      const dateTime = new Date(order.checkOutTime);
                                      const year = dateTime.getFullYear();
                                      const month = dateTime.getMonth() + 1;
                                      const day = dateTime.getDate();
                                      const hours = dateTime.getHours();
                                      const minutes = dateTime.getMinutes();
                                      const seconds = dateTime.getSeconds();
                                      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
                                    })()}
                                  </span>
                                </p>
                              </div>
                              <div className="track">
                                {renderActiveSteps(order.status?.toLowerCase()).map((step, index) => (
                                  <div className="step active" key={index}>
                                    <span className="icon">{step.icon}</span>
                                    <span className="text">{step.text}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="link__order flex-col my-auto">
                                <h6 className="ml-auto mr-3">
                                  <div className="shipping__informations">
                                    <p>
                                      <strong>Name:</strong> {order.name}
                                    </p>
                                    <p>
                                      <strong>Email:</strong> {order.email}
                                    </p>
                                    <p>
                                      <strong>Phone:</strong> {order.phone}
                                    </p>
                                    <p>
                                      <strong>Address:</strong> {order.address}, {order.country}, {order.city}
                                    </p>
                                  </div>
                                </h6>
                              </div>
                            </div>
                          </div>
                          {order.items.map((item) => (
                            <div className="card-body" key={item.id}>
                              <div className="media d-flex align-items-center justify-content-between">
                                <div className="media-body d-flex align-items-center gap-5">
                                  <h5 className="bold">{item.title}</h5>
                                  <div>
                                    <p className="text-muted">Qty: {item.quantity} Items</p>
                                    <p className="text-muted">
                                      Tracking Status on:{' '}
                                      <span className="Today">
                                        {(() => {
                                          const dateTime = new Date(order.updatedAt);
                                          const year = dateTime.getFullYear();
                                          const month = dateTime.getMonth() + 1;
                                          const day = dateTime.getDate();
                                          const hours = dateTime.getHours();
                                          const minutes = dateTime.getMinutes();
                                          const seconds = dateTime.getSeconds();
                                          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
                                        })()}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                                <h5 className="">
                                  ${item.totalPrice} <span className="small text-muted">via (COD)</span>
                                </h5>
                                <img
                                  className="align-self-center img-fluid"
                                  src={item.imgUrl}
                                  width="100"
                                  height="100"
                                  alt="product"
                                />
                              </div>
                            </div>
                          ))}
                          <div className="card-footer bg-white px-sm-3 pt-sm-4 px-0">
                            <div className="row text-center">
                              <div className="col my-auto border-line">
                                <h5>Received</h5>
                              </div>
                              <div className="col my-auto border-line">
                                <h5>Cancel</h5>
                              </div>
                              <div className="col my-auto mx-0 px-0">
                                <img
                                  className="img-fluid cursor-pointer"
                                  src="https://img.icons8.com/ios/50/000000/menu-2.png"
                                  width="30"
                                  height="30"
                                  alt="menu"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
};

export default OrderCheck;
