import React, { useState } from 'react';
import HistoryContext from './HistoryContext';

const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  const addRecordToHistory = (record) => {
    setHistory([...history, record]);
  };

  return (
    <HistoryContext.Provider value={{ history, addRecordToHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryProvider;
