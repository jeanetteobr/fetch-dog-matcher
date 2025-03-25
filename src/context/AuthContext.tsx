import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 🔁 Restore auth from localStorage
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAuthenticated(isLoggedIn);
    setIsLoading(false);
  }, []);

  const login = async (name: string, email: string) => {
    await axios.post(
      'https://frontend-take-home-service.fetch.com/auth/login',
      { name, email },
      { withCredentials: true }
    );
    localStorage.setItem('isLoggedIn', 'true');
    setIsAuthenticated(true);
    console.log('[Auth] Login successful');
  };

  const logout = async () => {
    await axios.post(
      'https://frontend-take-home-service.fetch.com/auth/logout',
      {},
      { withCredentials: true }
    );
    localStorage.removeItem('isLoggedIn');
    setIsAuthenticated(false);
    console.log('[Auth] Logout successful');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
