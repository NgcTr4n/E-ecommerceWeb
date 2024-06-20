import React from 'react'
import {Navigate} from "react-router-dom";
import { Outlet } from "react-router-dom";

import useAuth from "../custom-hook/useAuth";

const ProtectedRoute = () => {
    const { currentUser} = useAuth ();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute