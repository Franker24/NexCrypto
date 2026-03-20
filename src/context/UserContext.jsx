import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('auth');
    const savedUser = localStorage.getItem('user');
    return saved === 'true' && savedUser !== null;
  });

  // Persistir en localStorage solo para la sesión actual
  useEffect(() => {
    localStorage.setItem('auth', isAuthenticated);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [isAuthenticated, user]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Store token
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        setError(data.message);
        return { success: false, message: data.message };
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      return { success: false, message: 'Error de conexión' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Store token
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        setError(data.message);
        return { success: false, message: data.message };
      }
    } catch (err) {
      setError('Error al registrar usuario');
      return { success: false, message: 'Error de red' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
  };

  const updateProfile = async (updatedData) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, login, logout, register, updateProfile, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
