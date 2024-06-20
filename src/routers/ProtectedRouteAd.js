import React from 'react'
import {Navigate} from "react-router-dom";
import { Outlet } from "react-router-dom";

import useAuth from "../custom-hook/useAuth";

const ProtectedRouteAd = () => {
    const { currentUser} = useAuth ();
  return currentUser ? <Outlet /> : <Navigate to="/dashboard/loginad" />;
}

export default ProtectedRouteAd