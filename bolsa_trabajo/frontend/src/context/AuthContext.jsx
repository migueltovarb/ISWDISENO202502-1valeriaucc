import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, contrasena) => {
    try {
      const response = await authService.login(email, contrasena);
      const { token, ...userData } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (error) {
      let errorMessage = 'Error al iniciar sesión';
      if (error.response?.data?.mensaje) {
        errorMessage = error.response.data.mensaje;
      } else if (error.message?.includes('timeout') || error.code === 'ECONNABORTED') {
        errorMessage = 'Tiempo de espera agotado. Verifica tu conexión a internet y que el servidor esté disponible.';
      } else if (error.message?.includes('Network Error')) {
        errorMessage = 'Error de conexión. Verifica que el servidor esté ejecutándose.';
      }
      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const extractErrorMessage = (error, fallback) => {
    let errorMessage = fallback;
    const data = error?.response?.data;
    if (data) {
      if (data.mensaje) {
        errorMessage = data.mensaje;
      } else if (data.message) {
        errorMessage = data.message;
      } else if (Array.isArray(data.errors) && data.errors.length > 0) {
        errorMessage = data.errors
          .map((e) => e?.defaultMessage || e?.message || (typeof e === 'string' ? e : ''))
          .filter(Boolean)
          .join(', ');
      } else if (typeof data === 'string') {
        errorMessage = data;
      }
    } else if (error?.message?.includes('timeout') || error?.code === 'ECONNABORTED') {
      errorMessage = 'Tiempo de espera agotado. Verifica tu conexión a internet.';
    } else if (error?.message?.includes('Network Error')) {
      errorMessage = 'Error de conexión. Verifica que el servidor esté ejecutándose.';
    }
    return errorMessage || fallback;
  };

  const registerPostulante = async (data) => {
    try {
      await authService.registroPostulante(data);
      return { success: true };
    } catch (error) {
      const errorMessage = extractErrorMessage(error, 'Error al registrar');
      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const registerEmpresa = async (data) => {
    try {
      await authService.registroEmpresa(data);
      return { success: true };
    } catch (error) {
      const errorMessage = extractErrorMessage(error, 'Error al registrar');
      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const registerAdministrador = async (data) => {
    try {
      await authService.registroAdministrador(data);
      return { success: true };
    } catch (error) {
      const errorMessage = extractErrorMessage(error, 'Error al registrar');
      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        registerPostulante,
        registerEmpresa,
        registerAdministrador,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

