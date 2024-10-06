import { createContext, useContext, useState } from 'react';
import LocalStore from '../Store/LocalStore';
import Toaster from '../Utils/Toaster/Toaster';

// Create a context
const AuthContext = createContext();

// AuthProvider component to wrap around the app
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => LocalStore.getAuth());
  const [user, setUser] = useState(() => LocalStore.getAuth()?.user);
  const [role, setRole] = useState(() => LocalStore.getAuth()?.role);

  // Method to check if auth is authenticated
  const isAuthenticated = () => !!auth;

  // Method to check if auth has the required role
  const hasRole = (role) => auth?.role?.includes(role);

  // Login method (takes authData passed from the SignIn component)
  const login = (authData) => {
    setAuth(authData);
    LocalStore.storeAuth(authData);
  };

  // Method to update user information (ex user profile)
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    const updatedAuth = { ...auth, user: updatedUser };
    setAuth(updatedAuth);
    LocalStore.storeAuth(updatedAuth);
  };

  // Logout method
  const logout = () => {
    Toaster.loadingToast("Logging You out ....");
    setTimeout(() => {
      Toaster.dismissLoadingToast()
      setAuth(null);
      LocalStore.removeAuth();
      Toaster.justToast('info', 'Logout success', () => {
      });
    }, 2000);
  };

  return (
    <AuthContext.Provider value={{ auth, user, role, isAuthenticated, hasRole, login, logout,updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
