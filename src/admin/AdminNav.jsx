import React, { useRef } from 'react';
import { Container, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config';
import useAuth from "../custom-hook/useAuth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useGetData from '../custom-hook/useGetData';

import "../admin_styles/admin_nav.css";

const AdminNav = () => {
  const { data: adminData } = useGetData('admin');
  

const { currentUser } = useAuth();
const profileActionRef = useRef(null);
const navigate = useNavigate();

const totalProfileActions = () => {
profileActionRef.current.classList.toggle('show_profileActions');
};

const logout = () => {
signOut(auth)
.then(() => {
toast.success('Logged out');
navigate('/dashboard/loginad');
})
.catch(err => {
toast.error(err.message);
});
};

const admin_nav = [
{
display: 'Dashboard',
path: '/dashboard'
},
{
display: 'All-Products',
path: '/dashboard/all-products'
},
{
display: 'Orders',
path: '/dashboard/orders'
},
{
display: 'Users',
path: '/dashboard/users'
}
];

return (
<>
<header className="admin-header">
<div className="admin_nav-top">
<Container>
<div>
  <div  className="admin_nav-wrapper-top">
<div className="logo">
<h2>Admin</h2>
</div>
<button className='ava_admin' onClick={totalProfileActions}>
<img src={currentUser && currentUser.photoURL} alt="" />
</button>
</div>
<div
             className="profile__actions"
             ref={profileActionRef}
             onClick={totalProfileActions}
           >
{currentUser ? (
<div className='d-flex align-items-center justify-content-center flex-column profile_user'>
<img src={currentUser.photoURL} alt="" />
<h2>{currentUser.displayName}</h2>
<p>{currentUser.email}</p>
<p>{adminData.position}</p>
<button onClick={logout}>Logout</button>
</div>
) : null}
</div>
</div>
</Container>
</div>
</header>
<section className="admin_menu">
<Container>
<Row>
<div className="admin_navigation">
<ul className="admin_menu-list">
{admin_nav.map((item, index) => (
<li className="admin_menu-item" key={index}>
<NavLink
                   to={item.path}
                   activeClassName='active_adminp-menu'
                 >
{item.display}
</NavLink>
</li>
))}
</ul>
</div>
</Row>
</Container>
</section>
</>
);
};

export default AdminNav;