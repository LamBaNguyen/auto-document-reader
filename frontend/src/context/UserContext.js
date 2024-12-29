import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Trạng thái lưu thông tin người dùng
  const [loading, setLoading] = useState(true); // Trạng thái loading khi lấy thông tin người dùng

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the user data!", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const setUserInfo = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserInfo, loading }}>
      {children}
    </UserContext.Provider>
  );
};
