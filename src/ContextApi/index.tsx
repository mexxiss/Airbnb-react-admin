import React, { createContext, useState, ReactNode } from "react";

// Define types for the context
export interface DashboardContextType {
  isActiveMobileMenu: boolean;
  setIsActiveMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with default values
export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

interface DashboardProviderProps {
  children: ReactNode;
}

// Create the context provider component
export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
}) => {
  const [isActiveMobileMenu, setIsActiveMobileMenu] = useState<boolean>(false);

  return (
    <DashboardContext.Provider
      value={{ setIsActiveMobileMenu, isActiveMobileMenu }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
