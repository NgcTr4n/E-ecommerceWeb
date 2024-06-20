
import React from 'react'
import { Container , Row , Col } from "reactstrap";
import "../admin_styles/dashboard.css"
import useGetData from "../custom-hook/useGetData";

const Dashboard = () => {
    const {data : products} = useGetData('products')
    const {data : users} = useGetData('users')
    const {data : orders} = useGetData('orders')
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

  return   <>
  <section>
   <Container>
    <Row>
    <Col className="lg-3">
       <div className="revenue_box">
        <h5>Total orders</h5>
        <span>{orders.length}</span>
       </div>
       </Col>
       
       <Col className="lg-3"><div className="order_box">
        <h5>Total Sale</h5>
        <span>${totalRevenue}</span>
       </div></Col>
       <Col className="lg-3"><div className="products_box">
        <h5>Totals product</h5>
        <span>{products.length} </span>
       </div></Col>
       <Col className="lg-3"><div className="users_box">
        <h5>Totals user</h5>
        <span>{users.length}</span>
       </div></Col>
    </Row>
   </Container>
  </section>
  </>
}

export default Dashboard