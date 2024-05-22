// AuthContext.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  // Function to set the user ID when the user logs in
  const loginUser = (id) => {
    setUserId(id);
  };

  // Function to clear the user ID when the user logs out
  const logoutUser = () => {
    setUserId(null);
  };
  console.log('sending userId=', userId);
  return (
    <AuthContext.Provider value={{ userId, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
