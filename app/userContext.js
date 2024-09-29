// app/userContext.js
"use client"; // This line makes the component a Client Component

import React, { createContext, useContext, useState } from 'react';

// Create the User Context
const UserContext = createContext();

// Create a custom provider component
export const UserProvider = ({ children }) => {
  const [officerName, setOfficerName] = useState(""); 

  return (
    <UserContext.Provider value={{ officerName, setOfficerName }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};
