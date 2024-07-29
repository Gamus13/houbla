


// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [users, setUsers] = useState([]);

//   const addUser = (userInfo) => {
//     setUsers((prevUsers) => [...prevUsers, userInfo]);
//     setIsAuthenticated(true);
//   };

//   const getUsers = () => {
//     return users;
//   };

//   useEffect(() => {
//     // Vérifier l'état d'authentification au montage
//     // Peut-être vérifier le stockage local ou d'autres méthodes pour maintenir l'authentification
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, addUser, getUsers }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


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
    console.log('User added:', userInfo); // Log pour vérifier que l'utilisateur est ajouté
    console.log('Current users:', users); // Log pour vérifier les utilisateurs actuels
    console.log('User authenticated:', isAuthenticated); // Log pour vérifier l'état d'authentification
  };

  const getUsers = () => {
    return users;
  };

  useEffect(() => {
    // Vérifier l'état d'authentification au montage
    console.log('AuthProvider mounted. Initial isAuthenticated:', isAuthenticated);
    console.log('Initial users:', users);
    // Peut-être vérifier le stockage local ou d'autres méthodes pour maintenir l'authentification
  }, []);

  useEffect(() => {
    console.log('isAuthenticated state changed:', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, addUser, getUsers }}>
      {children}
    </AuthContext.Provider>
  );
};
