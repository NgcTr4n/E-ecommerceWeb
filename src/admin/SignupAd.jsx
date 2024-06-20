import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { storage, db } from '../firebase.config';
import { toast } from 'react-toastify';
import Helmet from '../Components/Helmet/Helmet';
import '../Pages/Login/Login.css'
const SignupAd = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      const storageRef = ref(storage, `imagesadmin/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          toast.error(error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateProfile(user, {
            displayName: username,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, 'admin', user.uid), {
            uid: user.uid,
            displayName: username,
            position,
            email,
            photoURL: downloadURL,
          });
        }
      );

      toast('Account created successfully');
      navigate('/dashboard')
      console.log(user);
    } catch (error) {
      toast.error('Invalid Account');
    }
  };

  return (
    <Helmet title="Login">
      <Container>
        <Row>
          <Col lg="6" className="m-auto text-center">
            <h3 className="fw-bold fs-2">Create Admin Account</h3>
            <Form className="auth__form" onSubmit={signup}>
              <FormGroup className="form__group__login">
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </FormGroup>

              <FormGroup className="form__group__login">
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormGroup>

              <FormGroup className="form__group__login">
                  <select
                    // className="w-100 p-2"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                  >
                    <option>Choose...</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                  </select>
              </FormGroup>

              <FormGroup className="form__group__login">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>

              <FormGroup className="form__group__login">
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              </FormGroup>

              <button type="submit" className="login__btn auth__btn">
                Create
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
};

export default SignupAd;
