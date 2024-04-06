import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  return (
    <AppContext.Provider value={{ darkModeEnabled, setDarkModeEnabled, notificationEnabled, setNotificationEnabled }}>
      {children}
    </AppContext.Provider>
  );
};
