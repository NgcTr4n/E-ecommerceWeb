import React from 'react'
import Helmet from '../../Components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import home_img from '../../img/Main/Main1.png'
import '../Home/Home.css'
// import getProductsFromFirebase from '../../assets/data/products'
// import useGetData from '../../custom-hook/useGetData'
// import { db } from '../../firebase.config'
// import { doc, getDoc } from 'firebase/firestore'
// import products from '../../assets/data/products'
import useGetData from '../../custom-hook/useGetData'
import ProductCart from '../../Components/UI/ProductCart'

const Home = () => {
  const { data: productsData } = useGetData('products');
  
  const year = new Date().getFullYear();

  return  <Helmet title = {"Home"}>
              <section className='home_section'>
          <Container>
            <Row>
             <Col lg='6' md='6'>
                <div className='Main'>
                <div className="home_content">
                  <h4 className="home_subtitle">Trending in {year}</h4>
                  <h2>The carrier deals you love</h2>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus fuga debitis corrupti totam iusto eligendi nemo, soluta nisi officiis, veniam, culpa dolorem rerum rem. Quibusdam natus nihil eius doloremque fugit! </p>
                    <a href="shop" className="buy_btn">Shop now</a>
                    </div>
                </div>
                </Col>
                <Col lg='6' md='6'>
                <div className="home_img">
                  <img src={home_img} alt="" />
                </div>
                </Col>

                <div className="text_home">
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt hic ipsam voluptatem ipsa quos quam aliquam nostrum esse quae consequatur? Soluta sequi cupiditate eligendi autem dolore officia fuga animi minus!
                </p>
                </div>

                <div className="best_product_home">
                  <h3>Products we love</h3>
                </div>
                 
                {productsData.filter((item) => item.productportfolio === 'iphone14')
                .map((item) => (
                  <ProductCart key={item.id} item={item} />
                ))} 
                
             
            </Row>
          </Container>
    </section>

  </Helmet>

}

export default Home