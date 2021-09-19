import React, { useState, useEffect, createContext } from 'react';
import { api } from '../services/api';

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextProps {
  user: User;
  signIn: (credentials: Credentials) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

interface User {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);

  async function signIn(credentials: Credentials) {
    try {
      console.log(credentials);

      const { data } = await api.post<AuthState>('/sessions', credentials);

      setData(data);
      console.log(data);

      api.defaults.headers.authorization = `Baerer ${data.token}`;
    } catch (error) {
      console.log(error.message);
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>{children}</AuthContext.Provider>
  );
}
