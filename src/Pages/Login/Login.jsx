import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import Helmet from '../../Components/Helmet/Helmet';
import '../Login/Login.css';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setUserId } from '../../redux/slices/authSlidce';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signIn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch(setUserId(user.id));

      console.log(user);
      toast('Logged in successfully');
      navigate('/payment');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Helmet title="Login">
      <Container>
        <Row>
          <Col lg="6" className="m-auto text-center">
            <h3 className="fw-bold fs-2">Login</h3>
            <Form className="auth__form" onSubmit={signIn}>
              <FormGroup className="form__group__login">
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormGroup>

              <FormGroup className="form__group__login">
                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormGroup>

              <button type="submit" className="login__btn auth__btn">
                Sign In
              </button>
              <p>
                Don't have an account? <a href="signup">Create an account</a>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
};

export default Login;
