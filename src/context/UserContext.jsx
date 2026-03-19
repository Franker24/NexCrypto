import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Intentar cargar la sesión guardada para persistencia de login
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('auth');
    return saved === 'true';
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {
      name: 'John Doe',
      username: '@johndoe_crypto',
      phone: '+1 (555) 000-0000',
      type: 'Pro Trader',
      avatar: null
    };
  });

  // Guardar en localStorage cuando el estado del usuario cambie
  useEffect(() => {
    localStorage.setItem('auth', isAuthenticated);
    localStorage.setItem('user', JSON.stringify(user));
  }, [isAuthenticated, user]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
