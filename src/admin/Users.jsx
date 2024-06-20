import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import useGetData from '../custom-hook/useGetData';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const Users = () => {
  const { data: usersData, loading } = useGetData('users');

  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      toast.success('User deleted!');
    } catch (error) {
      toast.error('Failed to delete the user');
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Users</h4>
          </Col>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Action</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4">
                      <h5 className="pt-5 fw-bold">Loading....</h5>
                    </td>
                  </tr>
                ) : (
                  usersData?.map((user) => (
                    <tr key={user.uid}>
                      <td>
                        <img src={user.photoURL} alt="" />
                      </td>
                      <td>{user.displayName}</td>
                      <td>{user.email}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => deleteUser(user.uid)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Users;
