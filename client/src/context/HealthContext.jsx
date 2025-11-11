import React, { createContext, useState, useContext } from "react";

const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [facilities, setFacilities] = useState([]);

  return (
    <HealthContext.Provider value={{ reports, setReports, facilities, setFacilities }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => useContext(HealthContext);
