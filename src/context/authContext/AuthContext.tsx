import React, { createContext, useState, ReactNode } from 'react';

export interface User {
  _id: string;
  full_name: string;
  age: number;
  phone: string;
  email: string;
  gender: string;
  address: string;
  password: string;
  profile_pic: string;
  ratings: number;

  is_verified: boolean;

  type_of_firm: string;
  certificate_of_incorporation: string;
  PAN: string;
  GST: string;
  bank_account: string;
  bank_account_type: string;
  IFSC_code: string;

  service_category: any;
  licenses_for_establishment: string;
  licenses_for_activity_undertaken: string;
  certifications: string[];
  insurance_for_outdoor_activities: string;
  health_safety_compliance: string;
  health_safety_documents: string[];
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to login and store user data
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Function to logout and clear user data
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
