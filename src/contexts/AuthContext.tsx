import React, { useState, useEffect, createContext } from 'react';

import { api } from '../services/api';

import { database } from '../database';
import { User as ModelUser } from '../database/models/User';

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
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);

  useEffect(() => {
    async function loadUseData() {
      const userCollection = database.get<ModelUser>('users');
      const users = await userCollection.query().fetch();

      const [user] = users;

      setData(user);
      setToken(user.token);
    }
    loadUseData();
  }, []);

  function setToken(token: string) {
    api.defaults.headers.authorization = `Baerer ${token}`;
  }

  async function signIn(credentials: Credentials) {
    try {
      const { data } = await api.post<User>('/sessions', credentials);

      database.write(async () => {
        await database.get<ModelUser>('users').create((newUser) => {
          newUser.user_id = data.id;
          newUser.name = data.name;
          newUser.email = data.email;
          newUser.avatar = data.avatar;
          newUser.driver_license = data.driver_license;
          newUser.token = data.token;
        });
      });

      setData(data);
      setToken(data.token);
    } catch (error: any) {
      console.log(error.message);
      throw new Error(error);
    }
  }

  return <AuthContext.Provider value={{ user: data, signIn }}>{children}</AuthContext.Provider>;
}
