import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import useGetData from '../custom-hook/useGetData';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

import '../admin_styles/orders.css';

const Orders = () => {
  const { data: ordersData, setData: setOrdersData } = useGetData('orders');

  const deleteOrder = async (id) => {
    try {
      await deleteDoc(doc(db, 'orders', id));
      toast.success('Deleted');
      const updatedData = ordersData.filter((item) => item.id !== id);
      setOrdersData(updatedData);
    } catch (error) {
      toast.error('Failed to delete the product');
    }
  };

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState('Pending');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const handleShowForm = (productId) => {
    setSelectedProduct(productId);
  };

  const handleCloseForm = () => {
    setSelectedProduct(null);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const updateOrderStatus = async () => {
    try {
      setUpdatingStatus(true);
      const updatedOrder = {
        status: selectedOrderStatus,
        updatedAt: new Date().toISOString() // Thời gian hiện tại của máy tính
      };
      await updateDoc(doc(db, 'orders', selectedProduct), updatedOrder);
      toast.success('Updated');
      const updatedData = ordersData.map((item) => {
        if (item.id === selectedProduct) {
          return { ...item, ...updatedOrder };
        }
        return item;
      });
      setOrdersData(updatedData);
      toggleModal();
    } catch (error) {
      console.error(error);
      // toast.error('Failed to update the order');
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Orders</h4>
          </Col>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Country</th>
                  <th>Products</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {ordersData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{item.city}</td>
                    <td>{item.country}</td>
                    <td>
                      <button onClick={() => handleShowForm(item.id)}>Items</button>
                    </td>
                    <td>${item.totalAmount}</td>
                    <td>
                    <span className={`status ${item.status && item.status.toLowerCase()}`}>{item.status}</span>
                    </td>
                    <td>{item.updatedAt ? new Date(item.updatedAt).toISOString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
      {selectedProduct && (
        <div className="product-form">
          <h4>Selected Product: {selectedProduct}</h4>
          <h5>Cart Items:</h5>
          {ordersData.map((item) => {
            if (item.id === selectedProduct) {
              return item.items.map((product) => (
                <div className="inf_item" key={product.id}>
                  <img src={product.imgUrl} alt="" />
                  <span>{product.title}</span>
                  <span>-</span>
                  <span>${product.price}</span>
                  <span>-</span>
                  <span>{product.quantity}px</span>
                  <p>
                    Total Price: <span>{product.totalPrice}</span>
                  </p>
                </div>
              ));
            }
            return null;
          })}
          <button className="btn_update" onClick={toggleModal}>
            Update Status
          </button>
          <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Update Order Status</ModalHeader>
            <ModalBody>
              <div>
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  value={selectedOrderStatus}
                  onChange={(e) => setSelectedOrderStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Shipping">Shipping</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleModal}>
                Cancel
              </Button>
              <Button color="primary" onClick={updateOrderStatus}>
                {updatingStatus ? 'Updating...' : 'Update'}
              </Button>
            </ModalFooter>
          </Modal>
          <button className="btn_close" onClick={handleCloseForm}>
            Close
          </button>
        </div>
      )}
    </section>
  );
};

export default Orders;
