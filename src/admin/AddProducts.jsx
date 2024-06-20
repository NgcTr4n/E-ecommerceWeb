import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';
import { db, storage } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';
import products from '../assets/data/products';

import '../admin_styles/add_products.css';

const AddProducts = () => {
 

  // const [enterId, setEnterId] = useState('');
  const [enterTitle, setEnterTitle] = useState('');
  const [enterMaxQuantity,setEnterMaxQuantity] = useState('')
  const [enterShortDesc, setEnterShortDesc] = useState('');
  const [enterDescription, setEnterDescription] = useState('');
  const [enterCategory, setEnterCategory] = useState('');
  const [enterProductportfolio, setEnterProductportfolio] = useState('');
  const [enterPrice, setEnterPrice] = useState('');
  const [enterProductImg, setEnterProductImg] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};


  useEffect(() => {

    
    if (id) {
      // Fetch the product data using the id
      // Set the product data to the respective state variables
      // Example code: Fetch the data from Firestore
      const fetchProductData = async () => {
        try {
          const productRef = doc(db, 'products', id);
          const productSnapshot = await getDoc(productRef);
          if (productSnapshot.exists()) {
            const productData = productSnapshot.data();
            setEnterTitle(productData.title);
            setEnterMaxQuantity(productData.maxQuantity)
            setEnterShortDesc(productData.ShortDesc);
            setEnterDescription(productData.Description);
            setEnterCategory(productData.category);
            setEnterProductportfolio(productData.productportfolio);
            setEnterPrice(productData.price);
          } else {
            toast.error('Product not found');
          }
        } catch (error) {
          console.error('Error fetching product data: ', error);
        }
      };

      fetchProductData();
    }
  }, [id]);

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const docRef = collection(db, 'products');
      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);
      uploadTask.on(
        'state_changed',
        null,
        () => {
          toast.error('Image Not Uploaded!');
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, {
              // id: enterId,
              title: enterTitle,
              maxQuantity:enterMaxQuantity,
              ShortDesc: enterShortDesc,
              Description: enterDescription,
              productportfolio: enterProductportfolio,
              category: enterCategory,
              price: enterPrice,
              imgUrl: downloadURL,
            });
                      // Save the updated products array to the database or external storage
                      const updatedProducts = [...products, {
                        // id: enterId,
                        title: enterTitle,
                        maxQuantity: enterMaxQuantity,
                        ShortDesc: enterShortDesc,
                        Description: enterDescription,
                        productportfolio: enterProductportfolio,
                        category: enterCategory,
                        price: enterPrice,
                        imgUrl: downloadURL,
                      }];
                      // products = updatedProducts;
            // Save the updated products array to the database or external storage
          });
          toast('Product Successfully Added!');
          navigate('/dashboard/all-products');
        }
        
      );
      
    } catch (error) {
      toast.error('Product Not Added!');
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'products', id);
      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);
      uploadTask.on(
        'state_changed',
        null,
        () => {
          toast.error('Image Not Uploaded!');
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(docRef, {
              // id: enterId,
              title: enterTitle,
              maxQuantity: enterMaxQuantity,
              ShortDesc: enterShortDesc,
              Description: enterDescription,
              productportfolio: enterProductportfolio,
              category: enterCategory,
              price: enterPrice,
              imgUrl: downloadURL,
            });
           
          });
          toast('Product Successfully Updated!');
          navigate('/dashboard/all-products');
        }
      );
    } catch (error) {
      toast.error('Product Not Updated!');
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="mb-3 fs-4">Add Products</h4>
            <Form onSubmit={id ? updateProduct : addProduct}>
            {/* <FormGroup className="form_group_add">
                <span>Product ID</span>
                <input
                  type="number"
                  placeholder="10"
                  value={enterId}
                  onChange={(e) => setEnterId(e.target.value)}
                  required
                />
              </FormGroup> */}
              <FormGroup className="form_group_add">
                <span>Product title</span>
                <input
                  type="text"
                  placeholder="Iphone 14 Pro Max"
                  value={enterTitle}
                  onChange={(e) => setEnterTitle(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="form_group_add">
                <span>Quantity</span>
                <input
                  type="number"
                  placeholder="3 items"
                  value={enterMaxQuantity}
                  onChange={(e) => setEnterMaxQuantity(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="form_group_add">
                <span>Short Description</span>
                <input
                  type="text"
                  placeholder="lorem....."
                  value={enterShortDesc}
                  onChange={(e) => setEnterShortDesc(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="form_group_add">
                <span>Description</span>
                <input
                  type="text"
                  placeholder="Description"
                  value={enterDescription}
                  onChange={(e) => setEnterDescription(e.target.value)}
                  required
                />
              </FormGroup>
              <div className="d-flex align-item-center justify-content-between gap-5">
                <FormGroup className="form_group_add w-50">
                  <span>Price</span>
                  <input
                    type="number"
                    placeholder="100 USD"
                    value={enterPrice}
                    onChange={(e) => setEnterPrice(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form_group_add w-50">
                  <span>Category</span>
                  <select
                    className="w-100 p-2"
                    value={enterCategory}
                    onChange={(e) => setEnterCategory(e.target.value)}
                    required
                  >
                    <option>Choose...</option>
                    <option value="iphone">Iphone</option>
                    <option value="macbook">Macbook</option>
                  </select>
                </FormGroup>
              </div>
              {enterCategory && (
                <FormGroup className="form_group_add">
                  <span>Products Portfolio</span>
                  <select
                    type="text"
                    placeholder="Iphone14"
                    value={enterProductportfolio}
                    onChange={(e) => setEnterProductportfolio(e.target.value)}
                    required
                  >
                    {enterCategory === 'iphone' ? (
                      <>
                        <option value="iphone11">Iphone 11</option>
                        <option value="iphone12">Iphone 12</option>
                        <option value="iphone13">Iphone 13</option>
                        <option value="iphone14">Iphone 14</option>
                      </>
                    ) : enterCategory === 'macbook' ? (
                      <>
                        <option value="macbookair">Macbook Air</option>
                        <option value="macbookpro">Macbook Pro</option>
                      </>
                    ) : null}
                  </select>
                </FormGroup>
              )}
              <div>
                <FormGroup className="form_group_add">
                  <span>Product Image</span>
                  <input type="file" onChange={(e) => setEnterProductImg(e.target.files[0])} required />
                </FormGroup>
              </div>
              <button className="add_btn" type="submit">
                {id ? 'Update Product' : 'Add Product'}
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
