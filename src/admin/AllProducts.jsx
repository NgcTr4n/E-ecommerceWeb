import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import useGetData from '../custom-hook/useGetData';
import { db } from '../firebase.config';
import { doc, deleteDoc, getDoc, collection, query, orderBy } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../admin_styles/all_products.css';

const AllProducts = () => {
  const { data: productsData } = useGetData('products', query(collection(db, 'products'), orderBy('id')));
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [productsNearEmpty, setProductsNearEmpty] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);



  useEffect(() => {
    // Lọc ra tất cả các sản phẩm có maxQuantity === 1
    const nearEmptyProducts = productsData.filter(item => item.maxQuantity === 1);
    if (nearEmptyProducts.length > 0) {
      setProductsNearEmpty(nearEmptyProducts);
      setShowAlert(true);
    }
    setPageLoaded(true);
  }, [productsData]);


  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      toast.success('Deleted');
    } catch (error) {
      toast.error('Failed to delete the product');
    }
  };

  const updateProduct = async (id) => {
    try {
      const productRef = doc(db, 'products', id);
      const productSnapshot = await getDoc(productRef);
      if (productSnapshot.exists()) {
        navigate(`/dashboard/add-products`, { state: { id } });
      } else {
        toast.error('Product not found');
      }
    } catch (error) {
      console.error('Error updating product: ', error);
    }
  };


  const renderInventoryStatus = (maxQuantity) => {
    if (maxQuantity > 0) {
      return <span className="text-success">In Stock</span>;
    }
  else {
      return <span className="text-danger">Out of Stock</span>;
    }
  }


  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">All Products</h4>
          </Col>
          <Col lg="12">
          {pageLoaded && showAlert && (
        <div className="alert alert-warning" role="alert">
          {productsNearEmpty.map(product => (
            <div className='product_alert' key={product.id}>
              Product <span>{product.title}</span> is almost sold out. Please order more products
            </div>
          ))}
        </div>
      )}
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Inventory</th>
                  <th>Order</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {productsData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.imgUrl} alt="" />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>${item.price}</td>
                    <td>{item.maxQuantity}</td>
                    <td>{renderInventoryStatus(item.maxQuantity)}</td>     
                    <td>
                          <button type="submit" className="btn btn-primary">
                            Order
                          </button>
    
                    </td>
                    <td>
                      <button className="btn btn-success" onClick={() => updateProduct(item.id)}>
                        <Link to={{ pathname: '/dashboard/add-products', state: { id: item.id } }}>Update</Link>
                      </button>
                    </td>
                    <td>
                      <button onClick={() => deleteProduct(item.id)} className="btn btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
          <Col lg="12">
            <div className="btn_addproduct">
              <Link to="/dashboard/add-products">Add Product</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
