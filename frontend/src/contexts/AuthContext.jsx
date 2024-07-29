


import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);

  const addUser = (userInfo) => {
    setUsers((prevUsers) => [...prevUsers, userInfo]);
    setIsAuthenticated(true);
  };

  const getUsers = () => {
    return users;
  };

  useEffect(() => {
    // Vérifier l'état d'authentification au montage
    // Peut-être vérifier le stockage local ou d'autres méthodes pour maintenir l'authentification
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, addUser, getUsers }}>
      {children}
    </AuthContext.Provider>
  );
};
