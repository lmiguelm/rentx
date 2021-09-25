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
  signOut: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
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
      const [user] = await database.get<ModelUser>('users').query().fetch();

      if (user) {
        setData(user);
        setToken(user.token);
      }
    }
    loadUseData();
  }, []);

  function setToken(token: string | null) {
    api.defaults.headers.authorization = `Baerer ${token}`;
  }

  async function signIn(credentials: Credentials) {
    try {
      const { data } = await api.post('/sessions', credentials);

      const { user, token } = data;

      await database.write(async () => {
        const userCreated = await database.get<ModelUser>('users').create((newUser) => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.avatar = user.avatar;
          newUser.driver_license = user.driver_license;
          newUser.token = token;
        });

        setData({
          id: userCreated.id,
          user_id: userCreated.user_id,
          avatar: userCreated.avatar,
          name: userCreated.name,
          token: userCreated.token,
          driver_license: userCreated.driver_license,
          email: userCreated.email,
        });

        setToken(token);
      });
    } catch (error: any) {
      console.log(error.message);
      throw new Error(error);
    }
  }

  async function signOut() {
    try {
      await database.write(async () => {
        const user = await database.get<ModelUser>('users').find(data.id);
        await user.destroyPermanently();
      });

      setData({} as User);
      setToken(null);
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }

  async function updateUser(user: User) {
    try {
      await database.write(async () => {
        const userSelected = await database.get<ModelUser>('users').find(user.id);

        await userSelected.update((userData) => {
          (userData.name = user.name),
            (userData.driver_license = user.driver_license),
            (userData.avatar = user.avatar);
        });
      });

      setData(user);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user: data, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
