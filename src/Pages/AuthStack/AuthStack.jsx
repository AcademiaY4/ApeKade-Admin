import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Authenticate from '../../Store/Authenticate'
import { useAuth } from '../../Context/AuthContext';
import LocalStore from '../../Store/LocalStore';

export default function AuthStack() {
  const { isAuthenticated } = useAuth();
  const role = LocalStore.getRole()

  // If the user is authenticated, redirect them to the home or dashboard page
  if (isAuthenticated()) {
    // Check if Role is defined
    if (role) {
      return <Navigate to={`/app/${role.toLowerCase()}/dashboard`} />;
    } else {
      return <Navigate to="/app" />;
    }
  }

  return (
    <>
      <Outlet />
    </>
  )
}
