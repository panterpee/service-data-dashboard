"use client"; 

import React, { createContext, useContext, useState } from 'react';

// Create the User Context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [officerName, setOfficerName] = useState(null); 
  const [userRole, setUserRole] = useState(null)

  return (
    <UserContext.Provider value={{ officerName, setOfficerName, userRole, setUserRole  }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};
